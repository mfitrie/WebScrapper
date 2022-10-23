const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const Thought = require('../DB/model');

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


const getDataThoughtByID = async ()=>{
    try {
        const data = await Thought.findById('635556fc4f61ea494afa3d2b');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
// getDataThoughtByID();


const getDataThoughtByIndex = async (index)=>{
    try {
        const data = await Thought.findOne({index}, {
            __v: 0,
        });
        return data
    } catch (error) {
        console.log(error);
    }
}
// getDataThoughtByID();


const getAllDataThought = async ()=>{
    try {
        const data = await Thought.find({}, {_id: 0});
        return data;
    } catch (error) {
        console.log(error);
    }
}
// getAllDataThought();


const countThoughtData = async()=>{
    try {
        const countData = await Thought.countDocuments().exec();
        return countData;
    } catch (error) {
        console.log(error);
    }
}




app.get('/', async(req,res)=>{
    console.log(req.query);
    const data = await getDataThoughtByIndex(req.query.index) ?? 'No Data';
    res.status(200).json({
        data
    });
});

app.get('/count', async(req,res)=>{
    const dataCount = await countThoughtData();
    res.status(200).json({
        count: dataCount
    });
});



const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})




process.on('unhandledRejection', (err)=>{
    console.log(err);
    process.exit();
})
