import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:process.env.AUGUR_CHROME_PATH,args:['--no-sandbox']});
const base=process.env.AUGUR_TEST_URL ?? 'http://127.0.0.1:4321';
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const routes=['/about/','/products/','/learn/','/learn/how-augur-answers-a-question/','/rep/','/blog/','/blog/why-disagreement-makes-an-oracle-stronger/','/faq/','/contact/','/brand/'];
const out='artifacts/qa/site-pages';await fs.mkdir(out,{recursive:true});
const results=[];
for(const route of routes){
 const errors=[];page.removeAllListeners('pageerror');page.removeAllListeners('console');page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const response=await page.goto(base+route);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);
 const slug=route.split('/').filter(Boolean).join('-');await page.screenshot({path:`${out}/${slug}-1440.png`,fullPage:true});
 const desktop=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1:document.querySelector('h1')?.getBoundingClientRect().toJSON(),sectionH2:[...document.querySelectorAll('main h2')].map(h=>({text:h.textContent,y:Math.round(h.getBoundingClientRect().y)}))}));
 const widths=[];
 for(const width of [1280,1024,768,390,360]){await page.setViewportSize({width,height:900});await page.waitForTimeout(30);widths.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overlaps:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&getComputedStyle(e).position!=='absolute').slice(0,5).map(e=>e.tagName+'.'+e.className)})));if(width===390)await page.screenshot({path:`${out}/${slug}-390.png`,fullPage:true});}
 results.push({route,status:response.status(),errors,desktop,widths});await page.setViewportSize({width:1440,height:900});
}
await fs.writeFile(`${out}/geometry.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(r=>({route:r.route,status:r.status,errors:r.errors,overflow:r.widths.filter(w=>w.scrollWidth>w.width),height:r.desktop.height})),null,2));await browser.close();

if(results.some(r=>r.status!==200||r.errors.length||r.widths.some(w=>w.scrollWidth>w.width))) process.exitCode=1;
