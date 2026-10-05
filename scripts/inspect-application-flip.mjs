import {chromium} from '@playwright/test';
import {strict as assert} from 'node:assert';
import {mkdirSync,writeFileSync} from 'node:fs';
const output='artifacts/qa/application-flip';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.AUGUR_CHROME_PATH??'/usr/bin/chromium'});
const base=process.env.AUGUR_TEST_URL??'http://127.0.0.1:4322';
const report={frames:[],checks:[],errors:[]};
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 await page.goto(base);await page.locator('[data-applications]').scrollIntoViewIfNeeded();
 const original=await page.locator('.application-tab').evaluateAll(elements=>elements.map(el=>({x:el.getBoundingClientRect().x,width:el.getBoundingClientRect().width})));
 await page.evaluate(()=>document.querySelector('#application-tab-insurance').click());
 await page.locator('[data-applications]').evaluate(el=>{window.__flipAnimations=el.getAnimations({subtree:true});window.__flipAnimations.forEach(a=>{a.pause();a.currentTime=0;});});
 assert.equal(await page.locator('.application-cards').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
 for(const time of [0,80,160,320]){
  const data=await page.locator('[data-applications]').evaluate((el,time)=>{
   window.__flipAnimations.forEach(a=>{try{a.currentTime=time;}catch{}});
   return {time,cards:[...el.querySelectorAll('.application-tab')].map(card=>{const r=card.getBoundingClientRect();return{x:r.x,width:r.width,layoutWidth:card.offsetWidth,transform:getComputedStyle(card).transform};}),visible:[...el.querySelectorAll('[role=tabpanel]:not([hidden])')].map(panel=>panel.id),animatedProperties:window.__flipAnimations.flatMap(a=>Object.keys(a.effect.getKeyframes()[0]).filter(key=>!['offset','computedOffset','easing','composite','transformOrigin'].includes(key)))};
  },time);
  if(time===0)data.cards.forEach((card,index)=>{assert(Math.abs(card.x-original[index].x)<1);assert(Math.abs(card.width-original[index].width)<1);});
  assert(data.animatedProperties.every(property=>['transform','opacity'].includes(property)));
  report.frames.push(data);await page.locator('[data-applications]').screenshot({path:`${output}/flip-${time}.png`,animations:'allow'});
 }
 await page.evaluate(()=>window.__flipAnimations.forEach(a=>a.finish()));await page.waitForTimeout(500);
 assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').getAttribute('id'),'application-panel-insurance');
 report.checks.push('FLIP starts at original visual bounds; final layout is applied once; only transform/opacity effects.');
 for(const index of [2,0,1,2,0,2]){await page.locator('.application-tab').nth(index).dispatchEvent('click');await page.waitForTimeout(30);}
 await page.waitForTimeout(650);assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').getAttribute('id'),'application-panel-grants');assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').count(),1);
 assert.equal(await page.locator('.application-panel').evaluateAll(panels=>panels.filter(panel=>panel.style.width||panel.style.transform).length),0);report.checks.push('Rapid reselect converges to latest tab and restores all panel inline geometry.');
 await page.locator('#application-tab-insurance').dispatchEvent('click');await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('[data-applications]').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').getAttribute('id'),'application-panel-insurance');report.checks.push('Reduced motion during FLIP settles selected panel and cancels effects.');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#application-tab-grants').dispatchEvent('click');await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').getAttribute('id'),'application-panel-grants');assert.equal(await page.locator('[data-applications]').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);report.checks.push('Print during FLIP settles the selected panel.');
 await page.locator('#application-tab-insurance').dispatchEvent('click');await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').getAttribute('id'),'application-panel-insurance');assert.equal(await page.locator('.application-panel').evaluateAll(panels=>panels.filter(panel=>panel.style.width||panel.style.transform).length),0);report.checks.push('Persisted pagehide settles and clears temporary panel geometry.');
 for(const width of [1440,1280,1024,768,390,360]){await page.setViewportSize({width,height:900});await page.goto(base);await page.locator('[data-applications]').scrollIntoViewIfNeeded();for(const index of [2,0,1,2]){await page.locator('.application-tab').nth(index).dispatchEvent('click');for(const delay of [20,60,70]){await page.waitForTimeout(delay);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow during FLIP at ${width}px, tab ${index}`);}await page.waitForTimeout(360);}await page.waitForTimeout(550);assert.equal(await page.locator('[data-applications] [role=tabpanel]:not([hidden])').count(),1);report.checks.push(`All three selections between settled states have no overflow through the outgoing fade at ${width}px.`);}
 const fallback=await browser.newPage({viewport:{width:1440,height:900}});fallback.on('pageerror',e=>report.errors.push(e.message));await fallback.addInitScript(()=>{Element.prototype.animate=undefined;});await fallback.goto(base);await fallback.locator('#application-tab-grants').dispatchEvent('click');await fallback.waitForTimeout(50);assert.equal(await fallback.locator('[data-applications] [role=tabpanel]:not([hidden])').getAttribute('id'),'application-panel-grants');report.checks.push('Missing WAAPI uses an instant, functional tab selection.');await fallback.close();
 assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report,null,2));
}finally{writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2));await browser.close();}
