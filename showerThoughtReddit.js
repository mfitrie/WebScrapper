const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const DB = process.env.DATABASE_URL;

mongoose.connect(DB)
.then(con =>{
    console.log('DB connection successful!')
}).catch(err =>{
    console.log(err);
});








(async ()=>{

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);

    try {
        await page.goto('https://www.reddit.com/r/Showerthoughts/');


        await page.waitForSelector('._2FCtq-QzlfuN-SwVMUZMM3 ._eYtD2XCVieq6emjKBH3m');
        
        // // select the nsfw content
        await page.waitForSelector('._2FCtq-QzlfuN-SwVMUZMM3 ._1wzhGvvafQFOWAyA157okr');
    
        // const thought = await page.$$eval('._2FCtq-QzlfuN-SwVMUZMM3 ._eYtD2XCVieq6emjKBH3m', (el)=>{
        //     const elementWord = [];
        //     el.forEach(word =>{
        //         elementWord.push(word.innerText);
        //     });
    
        //     return elementWord;
        // });


        const thought = await page.evaluate(()=>{
            const parent = document.querySelectorAll('._2FCtq-QzlfuN-SwVMUZMM3');
            const elementWord = [];

            for(let i=0; i<parent.length; i++){
                for(let j=0; j<parent[i].childNodes.length; j++){
                    if(parent[i].childNodes[j].classList.contains('._1wzhGvvafQFOWAyA157okr')){
                        elementWord.push('false');
                    }else{
                        elementWord.push('true');
                    }
                }
            }

            
    
            return elementWord;
        });
    
        console.log(thought);
    
        browser.close();
        
    } catch (error) {
        console.log(error);
        browser.close();
    }

})();