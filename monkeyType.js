const puppeteer = require('puppeteer');


(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://monkeytype.com/');
    await page.waitForSelector('.word.active');

    
    
    try {
        const word = await page.$$eval('.word', (el)=>{
            let wordLetter = [];

            el.forEach(ele=>{
                const letterNode = Array.from(ele.childNodes);

                letterNode.forEach(letNod=>{
                    wordLetter.push(letNod.innerText);
                });

                wordLetter.push(' ');
            });
    
            return wordLetter.join('').split(' ');
        });

        console.log(word);

        for(const i of word){
            await page.type('.word.active', `${i} `);
        }

        // browser.close();

    } catch (error) {
        console.log(error);
        browser.close();
    }



})();