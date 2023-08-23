const { Schema, connect, model } = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
	await connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	});
	console.log('connected to mongoDB successfuly');
};

// schema for todo collection
const todo = new Schema(
	{
		title: { type: String, requied: true },
		description: String,
		status: {
			type: String,
			default: 'draft',
			enum: [ 'draft', 'In process', 'completed' ]
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = {
	dbConnection,
	todoModel: model('todo', todo)
};
