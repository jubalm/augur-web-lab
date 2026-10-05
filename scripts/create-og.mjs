import {chromium} from '@playwright/test';
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1200,height:630},reducedMotion:'reduce'});
await page.goto(process.env.AUGUR_TEST_URL??'http://127.0.0.1:4321/');await page.evaluate(()=>document.fonts.ready);
await page.addStyleTag({content:'.announcement,.site-header,.site-footer,main>section:not(.home-hero){display:none!important}.home-hero{height:630px!important;min-height:630px!important;padding:56px 0!important}.hero-inner{width:1080px!important;grid-template-columns:560px 480px!important;gap:40px!important}.display{font-size:64px!important;line-height:70px!important}.hero-actions{display:none!important}.hero-lead{font-size:22px!important;line-height:33px!important}.hero-body{font-size:18px!important;line-height:28px!important}.hero-support{margin-top:28px!important}'});
await page.locator('.home-hero').screenshot({path:'public/og.png'});await browser.close();console.log('Created public/og.png (1200 × 630) from the static hero.');
