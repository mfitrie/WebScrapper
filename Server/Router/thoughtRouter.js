const express = require('express');
const router = express.Router();

const Thought = require('../../DB/model');


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
            _id: 0,
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
        const data = await Thought.find({}, {
            _id: 0,
            __v: 0
        });
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



router.get('/', async (req,res)=>{
    const count = await countThoughtData(); 
    res.status(200).json({
        count
    });
});

router.get('/getall', async (req, res)=>{
    const data = await getAllDataThought();
    res.status(200).json({
        data
    });
});

router.get('/getbyindex/:index', async(req, res)=>{
    const index = req.params.index;
    const data = await getDataThoughtByIndex(index) ?? 'No Data';

    res.status(200).json({
        data
    });
});



module.exports = router;
