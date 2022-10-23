const mongoose = require('mongoose');
// index: index+1,
// vote,
// thought: text
const thoughtSchema = new mongoose.Schema({
    index: {
        type: String,
        required: [true, 'Please insert the index']
    },
    vote: {
        type: String,
        required: [true, 'Please insert the vote']
    },
    thought: {
        type: String,
        required: [true, 'Please insert the thought']
    }
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;