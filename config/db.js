const mongoose = require('mongoose')
require('dotenv').config()

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.CONNECTION_URL,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false,})
        console.log('success');
    } catch (error) {
        console.log(`no success ${error}`);
    }
}
