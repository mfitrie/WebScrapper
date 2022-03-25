const { text } = require('express');
const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://quotes.toscrape.com/');
    // const title = await page.title();
    await page.waitForSelector('.col-md-4 p');
    await page.click('.col-md-4 p a');

    await page.waitForSelector('#username');
    await page.type('#username','JoeSyndicate', {delay: 100});
    await page.waitForSelector('#password');
    await page.type('#password','12345678910', {delay: 100});

    await page.click('.btn-primary');

    await page.waitForSelector('.col-md-8 .quote .text');

    const quote1 = await quoteFunction(page);
    console.log(quote1);

    await page.waitForSelector('.next');
    await page.click('.next a');

    const quote2 = await quoteFunction(page);
    console.log(quote2);


    await browser.close();
})();


const quoteFunction = async (page)=>{
        return await page.evaluate(()=>{
        const textEl = [...document.querySelectorAll('.col-md-8 .quote .text')];
        return textEl.map(el => {
            return el.textContent;
        });
    });
}