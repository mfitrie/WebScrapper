const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');


(async ()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto("https://www.reddit.com/r/goodanimemes/");
        
        try {
            
            await page.waitForSelector('._2_tDEnGMLxpM6uOa2kaDB3');
            const image = await page.$$eval('._2_tDEnGMLxpM6uOa2kaDB3', el=>{
            const url = [];
            el.forEach(element => {
                url.push(element.src);
            });
            return url;
        });
    
        console.log(image);

        if(!fs.existsSync(path.resolve(`${__dirname}/RedditPicture`))){
            fs.mkdir(`${__dirname}/RedditPicture`, (err)=>{
                if(!err){
                    console.log(`Folder: ${__dirname}/RedditPicture has been created!`);
                }else{
                    console.log(err);
                }
            });
        }

        image.forEach((url, index)=>{
            https.get(url, res =>{
                const locPath = path.resolve(`${__dirname}/RedditPicture/download-${index}-${Date.now()}.png`);
                const stream = fs.createWriteStream(locPath);
                res.pipe(stream);
                stream.on('finish', ()=>{
                    stream.close();
                })
            })
        })

    
        browser.close();
        
    } catch (error) {
        console.log(error);
        browser.close();
    }

})();