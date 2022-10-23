const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    try {
        await page.goto('https://www.reddit.com/r/Showerthoughts/');
        await autoScroll(page);
        await page.waitForSelector('._1poyrkZ7g36PawDueRza-J');


        const thoughts = await page.evaluate(()=>{
            const parent = [...document.querySelectorAll('._1poyrkZ7g36PawDueRza-J')];
            const words = [];

            // can make how many upvote, created time
            parent.forEach((el, index)=>{
                // filter the ads from word
                if(!(el.children[0].children[0].children[0].children[2].children[0])){
                    const text = el.querySelector('h3').textContent;

                    words.push({
                        index: index+1,
                        thought: text
                    });
                }
            })
            
            

            return words;
        });

        console.log(thoughts);

        const json = JSON.stringify(thoughts);
        await fs.writeFile(`${__dirname}/ShowerThoughtsData.json`, json, 'utf8');


        browser.close();

    } catch (error) {
        console.log(error);
        browser.close();
    }
})();



async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}