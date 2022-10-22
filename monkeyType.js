const puppeteer = require('puppeteer');


(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://monkeytype.com/');
    await page.waitForSelector('.word.active');

    // await page.click('.acceptAll');
    
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







    // next character sequence 2

        // await page.waitForTimeout(100);
        // await page.waitForSelector('.word');

        const word2 = await page.$$eval('.word', (el)=>{
            let wordLetter2 = [];

            for(let i=0; i<el.length; i++){
                
                
                const letterNode = Array.from(el[i].childNodes);

                letterNode.forEach(letNod=>{
                    wordLetter2.push(letNod.innerText);
                });

                wordLetter2.push(' ');

            }
    
            return wordLetter2.join('').split(' ');
        });

        
        const totalWordDifference = word2.length - word.length;

        for(let i=0; i<totalWordDifference; i++){
            word2.shift();
        }

        for(const i of word2){
            await page.type('.word.active', `${i} `);
        }

        console.log('WORD 2');
        console.log(word2.length);
        console.log(word2);
        console.log(`${word2.length - word.length} difference`);






        // next char sequence 3
        const word3 = await page.$$eval('.word', (el)=>{
            let wordLetter2 = [];

            for(let i=0; i<el.length; i++){
                
                
                const letterNode = Array.from(el[i].childNodes);

                letterNode.forEach(letNod=>{
                    wordLetter2.push(letNod.innerText);
                });

                wordLetter2.push(' ');

            }
    
            return wordLetter2.join('').split(' ');
        });

        
        const totalWordDifference2 = word3.length - word2.length;

        for(let i=0; i<totalWordDifference2; i++){
            word3.shift();
        }

        for(const i of word3){
            await page.type('.word.active', `${i} `);
        }

        console.log('WORD 3');
        console.log(word3.length);
        console.log(word3);
        console.log(`${totalWordDifference2} difference`);

        



        // next char sequence 4
        const word4 = await page.$$eval('.word', (el)=>{
            let wordLetter2 = [];

            for(let i=0; i<el.length; i++){
                
                
                const letterNode = Array.from(el[i].childNodes);

                letterNode.forEach(letNod=>{
                    wordLetter2.push(letNod.innerText);
                });

                wordLetter2.push(' ');

            }
    
            return wordLetter2.join('').split(' ');
        });

        
        const totalWordDifference3 = word4.length - word3.length;

        for(let i=0; i<totalWordDifference3; i++){
            word4.shift();
        }

        for(const i of word4){
            await page.type('.word.active', `${i} `);
        }

        console.log('WORD 3');
        console.log(word4.length);
        console.log(word4);
        console.log(`${totalWordDifference3} difference`);


    } catch (error) {
        console.log(error);
        // browser.close();
    }



})();