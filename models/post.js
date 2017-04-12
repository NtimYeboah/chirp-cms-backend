/**
 * Created by ntimobedyeboah on 4/9/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    content: {
        type: 'String',
        required: true
    },
    slug: {
        type: 'String',
        required: true
    },
    cuid: {
        type: 'String',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }/*,
    user: {
        type: mongoose.Types.Schema.ObjectId
    }*/
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;