import {chromium} from '@playwright/test';
import {mkdirSync,writeFileSync} from 'node:fs';
mkdirSync('artifacts/qa/motion',{recursive:true});
const browser=await chromium.launch();
let page=await browser.newPage({viewport:{width:1440,height:900}});
await page.addInitScript(()=>{new PerformanceObserver(list=>{window.__longTasks??=[];window.__longTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})));}).observe({type:'longtask',buffered:true});});
await page.clock.install();await page.goto('http://127.0.0.1:4322/');await page.evaluate(()=>document.fonts.ready);
const results=[];
for(const time of [0,100,400,750,1100,1320,1750,2100,2300]){
 const state=await page.evaluate(time=>{const hero=document.querySelector('[data-home-hero]');for(const a of hero.getAnimations({subtree:true})){if(a.effect.getTiming().iterations===Infinity)continue;a.pause();a.currentTime=time;}return {time,lines:[...hero.querySelectorAll('[data-hero-line]')].map(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})),centre:getComputedStyle(hero.querySelector('.empty-centre')).opacity,orbit:getComputedStyle(hero.querySelector('.orbit')).opacity};},time);
 results.push(state);await page.screenshot({path:`artifacts/qa/motion/hero-${String(time).padStart(4,'0')}.png`});
}
await page.locator('#hero-title').dispatchEvent('pointerdown');results.push({settlesOnInteraction:await page.locator('[data-home-hero]').getAttribute('data-hero-arrival')});
await page.emulateMedia({reducedMotion:'reduce'});results.push({reducedAnimationCount:await page.locator('[data-home-hero]').evaluate(e=>e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)});
await page.close();page=await browser.newPage({viewport:{width:1440,height:900}});await page.addInitScript(()=>{new PerformanceObserver(list=>{window.__longTasks??=[];window.__longTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})));}).observe({type:'longtask',buffered:true});});await page.goto('http://127.0.0.1:4322/');await page.waitForTimeout(3500);
const session=await page.context().newCDPSession(page);await session.send('Performance.enable');
const metrics=async()=>Object.fromEntries((await session.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
const start=await metrics();await page.waitForTimeout(5000);const end=await metrics();
results.push({idle5Seconds:{taskMs:(end.TaskDuration-start.TaskDuration)*1000,scriptMs:(end.ScriptDuration-start.ScriptDuration)*1000,layoutMs:(end.LayoutDuration-start.LayoutDuration)*1000,styleMs:(end.RecalcStyleDuration-start.RecalcStyleDuration)*1000,twinkleMarks:await page.locator('.twinkle').count()},longTasks:await page.evaluate(()=>window.__longTasks)});
await page.evaluate(()=>window.scrollTo(0,1800));await page.waitForTimeout(100);results.push({offscreenTwinkle:await page.locator('[data-heritage]').getAttribute('data-active')});
writeFileSync('artifacts/qa/motion/hero-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));await browser.close();
