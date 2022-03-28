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


    
    let quoteArr = [];

    await page.waitForSelector('.next');
    while(await page.click('.next a') !== null){
        
        try {
            await page.waitForSelector('.col-md-8 .quote .text');
            const quote = await quoteFunction(page);
            quoteArr.push(quote);
    
            // await page.waitForSelector('.next');
            await page.click('.next a');
            
        } catch (error) {
            break
        }
    }


    quoteArr.forEach(el=>{
        console.log(el);
    })


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