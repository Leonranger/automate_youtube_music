const puppeteer = require('puppeteer');
//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteer.use(StealthPlugin());
function main(){
    automateSearch();
    //automateExploreMenu();
}

async function automateSearch(){
    //const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch({
        headless:false,
        /*args: [
          '--disable-web-security',
          '--autoplay-policy=no-user-gesture-required',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--remote-debugging-port=9222',
          '--allow-insecure-localhost',
        ],
        executablePath:
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',*/
      });
    const page = await browser.newPage();
    // Catch all failed requests like 4xx..5xx status codes
    page.on('requestfailed', request => {
        console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
    });
    // Catch console log errors
    page.on("pageerror", err => {
        console.log(`Page error: ${err.toString()}`);
    });
    // Catch all console messages
    page.on('console', msg => {
        console.log('Logger:', msg.type());
        console.log('Logger:', msg.text());
        console.log('Logger:', msg.location());

    });
    await page.setViewport({width:1288, height: 800});
    //await page.setUserAgent( 'UA-TEST' );
    await page.goto('https://music.youtube.com');
    await page.click('.search-icon.style-scope.ytmusic-search-box');
    await page.type('.style-scope.ytmusic-search-box', 'separuh aku');
    await page.keyboard.press('Enter');
    await page.click('.icon.style-scope.ytmusic-play-button-renderer');
    await page.goto('https://music.youtube.com/watch?v=b0ZBBjViV8Y');
    await page.click('.style-scope.tp-yt-paper-icon-button');
    await page.waitForTimeout(5000);
    //await page.click('.sign-in-link.style-scope.ytmusic-nav-bar');
    //await page.goto('https://music.youtube.com/explore');
    //browser.close();
    //await page.waitForNavigation();
    //Go to explore menu
    //await page.click('.tab-icon.style-scope.ytmusic-pivot-bar-item-renderer');
    //await page.goto('https://music.youtube.com/explore');
    //await page.click('.circle style-scope.tp-yt-paper-icon-button');
    //previus button
    //await page.click('.previous-button.style-scope ytmusic-player-bar');
    //await page.click('.yt-simple-endpoint.style-scope.ytmusic-menu-navigation-item-renderer');
}

async function automateExploreMenu()
{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width:1288, height: 800});
    await page.goto('https://music.youtube.com/explore');
}

main()