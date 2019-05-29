import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    statement: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        of: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
},
    {
        timestamps: true,
    });

    const Question = mongoose.model('Question', questionSchema);

    export default Question;