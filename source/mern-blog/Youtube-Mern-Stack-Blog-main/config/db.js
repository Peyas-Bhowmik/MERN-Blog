const mongoose = require('mongoose');
require('dotenv').config();
module.exports = connect = async () => {
	try {
		const response = await mongoose.connect('mongodb+srv://blogapp:blogapp123@cluster1.igmwu.mongodb.net/blog?retryWrites=true&w=majority', {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});
		console.log('connection created');
	} catch (error) {
		console.log(error);
	}
};
