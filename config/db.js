const mongoose = require('mongoose')
require('dotenv').config()

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect("mongodb+srv://blogapp:blogapp1234@cluster1.igmwu.mongodb.net/blog?retryWrites=true&w=majority",{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false,})
        console.log('success');
    } catch (error) {
        console.log(`no success ${error}`);
    }
}