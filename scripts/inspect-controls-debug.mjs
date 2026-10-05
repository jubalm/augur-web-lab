import { chromium } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { mkdirSync, writeFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
const output='artifacts/qa/controls-debug';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.AUGUR_CHROME_PATH??'/usr/bin/chromium'});
const results={controls:[],debug:[],errors:[]};
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',error=>results.errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')results.errors.push(message.text());});
 const production=process.env.AUGUR_TEST_URL??'http://127.0.0.1:4322';
 const development=process.env.AUGUR_DEV_URL??'http://127.0.0.1:4321';
 await page.goto(`${production}/contact/`);
 const live=page.getByRole('button',{name:'Send message',exact:true});
 await live.hover();await page.waitForTimeout(220);
 const colour=locator=>locator.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {background:s.backgroundColor,color:s.color,border:s.borderBottomColor,outline:s.outlineColor,width:r.width,height:r.height,opacity:s.opacity};});
 const hover=await colour(live);assert.equal(hover.background,'rgb(39, 209, 155)');
 await page.mouse.down();await page.waitForTimeout(220);const pressed=await colour(live);assert.equal(pressed.background,'rgb(36, 188, 141)');await page.mouse.up();
 results.controls.push({control:'actual contact submit',hover,pressed});
 const variants=['default','outline','ghost','destructive'];
 const states=['default','hover','pressed','focus','disabled','loading'];
 const html=variants.map(variant=>`<section><h2>${variant}</h2><div class="qa-row">${states.map(state=>`<div><p>${state}</p>${renderToStaticMarkup(createElement(Button,{id:`qa-${variant}-${state}`,variant,size:'lg',disabled:state==='disabled',loading:state==='loading'},'See how it works'))}</div>`).join('')}</div></section>`).join('');
 const fields=['default','hover','focus','filled','error','disabled','readonly'].map(state=>`<div class="field"><label for="qa-field-${state}">${state}</label>${renderToStaticMarkup(createElement(Input,{id:`qa-field-${state}`,disabled:state==='disabled',readOnly:state==='readonly',invalid:state==='error',defaultValue:['filled','readonly'].includes(state)?'Example value':undefined,placeholder:'Example placeholder'}))}${state==='error'?'<p class="field-error">Check this value.</p>':''}</div>`).join('');
 const multiline=['default','hover','focus','filled','error','disabled','readonly'].map(state=>`<div class="field"><label for="qa-textarea-${state}">${state}</label>${renderToStaticMarkup(createElement('textarea',{id:`qa-textarea-${state}`,disabled:state==='disabled',readOnly:state==='readonly','aria-invalid':state==='error'?'true':undefined,defaultValue:['filled','readonly'].includes(state)?'Example value':undefined,placeholder:'Example placeholder',rows:4}))}${state==='error'?'<p class="field-error">Check this value.</p>':''}</div>`).join('');
 await page.evaluate(({html,fields})=>{document.querySelector('main').innerHTML=`<div id="qa-fixture">${html}<h2>Fields</h2><div class="qa-fields">${fields}</div></div>`;const fixture=document.querySelector('#qa-fixture');fixture.style.cssText='padding:40px;';for(const row of fixture.querySelectorAll('.qa-row'))row.style.cssText='display:grid;grid-template-columns:repeat(6,1fr);gap:20px;margin:16px 0 32px';fixture.querySelector('.qa-fields').style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:24px';}, {html,fields:fields+multiline});
 const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');const {root}=await cdp.send('DOM.getDocument');
 async function force(selector,pseudoClasses){const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector});await cdp.send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:pseudoClasses});}
 for(const variant of variants){await force(`#qa-${variant}-hover`,['hover']);await force(`#qa-${variant}-pressed`,['hover','active']);await force(`#qa-${variant}-focus`,['focus','focus-visible']);}
 await page.mouse.move(0,0);
 await force('#qa-field-hover',['hover']);await force('#qa-field-focus',['focus','focus-visible']);await force('#qa-textarea-hover',['hover']);await force('#qa-textarea-focus',['focus','focus-visible']);await page.waitForTimeout(220);
 for(const variant of variants){const row=[];for(const state of states){row.push({state,...await colour(page.locator(`#qa-${variant}-${state}`))});}results.controls.push({variant,states:row});}
 for(const prefix of ['field','textarea']){const fieldStates=[];for(const state of ['default','hover','focus','filled','error','disabled','readonly'])fieldStates.push({state,...await colour(page.locator(`#qa-${prefix}-${state}`))});results.controls.push({kind:prefix,states:fieldStates});}
 assert.equal(results.controls.find(item=>item.variant==='destructive').states.find(item=>item.state==='pressed').background,'rgb(168, 36, 69)');
 const spinner=page.locator('#qa-default-loading .aug-button-spinner-icon');assert.equal(await spinner.evaluate(el=>getComputedStyle(el).animationName),'loading-spin');
 await page.screenshot({path:`${output}/controls-matrix.png`,fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await spinner.evaluate(el=>getComputedStyle(el).animationName),'none');results.controls.push({loadingReducedMotion:'static'});await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(`${development}/?motion=replay`);
 await page.locator('[data-tenets]').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('[data-tenets]').getAnimations({subtree:true}).length>0);
 await page.locator('[data-tenets]').evaluate(el=>{window.__firstCycle=el.getAnimations({subtree:true});window.__firstCycle.forEach(a=>a.finish());});
 await page.waitForFunction(()=>document.querySelector('[data-tenets]').getAnimations({subtree:true}).some(a=>!window.__firstCycle.includes(a)));
 results.debug.push({visibleReplay:true});
 await page.locator('[data-tenets]').dispatchEvent('pointerdown');await page.waitForTimeout(300);assert.equal(await page.locator('[data-tenets]').evaluate(el=>el.getAnimations({subtree:true}).length),0);results.debug.push({replayStopsOnInteraction:true});
 await page.goto(`${development}/?motion=slow`);
 await page.locator('[data-applications]').scrollIntoViewIfNeeded();
 await page.locator('#application-tab-insurance').click();
 const transition=await page.locator('.application-cards').evaluate(el=>getComputedStyle(el).transitionDuration);assert.equal(transition,'0s');
 const delays=await page.locator('[data-applications]').evaluate(el=>el.getAnimations({subtree:true}).map(a=>({duration:a.effect.getTiming().duration,delay:a.effect.getTiming().delay})));
 assert(delays.some(a=>a.duration===1600));assert(delays.some(a=>a.duration===800));assert(delays.some(a=>a.duration===4000));results.debug.push({gridCssTransition:transition,slowAnimationTimings:delays});
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(30);assert.equal(await page.locator('[data-applications]').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);results.debug.push({reducedDuringSlowSettles:true});
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(`${production}/?motion=replay`);await page.locator('[data-tenets]').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-tenets]').getAnimations({subtree:true}).length>0);await page.locator('[data-tenets]').evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>a.finish()));await page.waitForTimeout(400);assert.equal(await page.locator('[data-tenets]').evaluate(el=>el.getAnimations({subtree:true}).length),0);results.debug.push({productionIgnoresReplay:true});
 assert.deepEqual(results.errors,[]);
 console.log(JSON.stringify(results,null,2));
} finally { writeFileSync(`${output}/report.json`,JSON.stringify(results,null,2));await browser.close(); }
