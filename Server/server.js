const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const thoughtRouter = require('./Router/thoughtRouter');

dotenv.config({
    path: `${__dirname}/../config.env`
});

const app = express();
app.use(morgan('dev'));

(async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
    }
})();


// (async()=>{
//     // console.log(path.resolve(`${__dirname}/../ShowerThoughtsData.json`));
//     try {
//         const data = await fs.readFile(path.resolve(`${__dirname}/../ShowerThoughtsData.json`), (err, data)=>{
//             if(!err){
//                 return data;
//             }
//         });

//         const jsonData = JSON.parse(data);


//         jsonData.forEach(async (el)=>{
//             await Thought.create({
//                 index: el.index,
//                 vote: el.vote,
//                 thought: el.thought
//             });
//         });
//         console.log('Data successfully added!');

        
//     } catch (error) {
//         console.log(error);
//     }
// })();


// (async()=>{
//     try {
//         await Thought.deleteMany();
//         console.log('Data has been deleted!');
//     } catch (error) {
//         console.log(error);
//     }
// })();

app.get('/', (req,res)=>{
    res.status(200).json({
        data: 'No data for this route'
    })
});

app.use('/api', thoughtRouter);



const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})




process.on('unhandledRejection', (err)=>{
    console.log(err);
    process.exit();
})
