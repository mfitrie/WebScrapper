const puppeteer = require('puppeteer');


(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://monkeytype.com/');
    await page.waitForSelector('.word.active');

    await page.click('.acceptAll');
    
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

        console.log('WORD 1');
        console.log(word.length);
        console.log(word);

        for(const i of word){
            await page.type('.word.active', `${i} `);
        }







    // next character sequence
        await page.waitForSelector('.word');
        const word2 = await page.$$eval('.word', (el)=>{
            let wordLetter2 = [];

            for(let i=0; i<el.length; i++){
                
                
                const letterNode = Array.from(el[i].childNodes);

                letterNode.forEach(letNod=>{
                    wordLetter2.push(letNod.innerText);
                });

                wordLetter2.push(' ');

            }

            // el.forEach(ele=>{
            //     const letterNode = Array.from(ele.childNodes);

            //     letterNode.forEach(letNod=>{
            //         wordLetter2.push(letNod.innerText);
            //     });

            //     wordLetter2.push(' ');
            // });
    
            return wordLetter2.join('').split(' ');
        });

        console.log('WORD 2');
        console.log(word2.length);
        console.log(word2);

        // for(const i of word2){
        //     await page.type('.word.active', `${i} `, {delay: 500});
        // }


        


    } catch (error) {
        console.log(error);
        browser.close();
    }



})();