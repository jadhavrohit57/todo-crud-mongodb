require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection, todoModel } = require('./db/mongo');
const app = express();

app.use(cors()); // accept all cors
app.use(express.json()); // accept request body

//for health check
app.get('/', (req, res) => {
	res.send('success');
});

// create todo
app.post('/todo', async (req, res) => {
	try {
		const body = req.body;
		// mongo create function

		const todoRes = await todoModel.create(body);
		res.send({ message: 'success', data: todoRes });
	} catch (error) {
		console.log('error ', error);
		res.status(400).send({ message: error.message });
	}
});

// get all todos.. with filters
app.post('/todo/getAll', async (req, res) => {
	try {
		const filter = req.body.filter || {}; // if not filter return all
		const project = req.body.project || {}; // if not project return all
		const page = req.body.page || 1; // pagination default page 1
		const limit = req.body.limit || 20; // default page items limit 20

		const skip = (page - 1) * limit;

		//get all tasks.. with filter
		const todos = await todoModel.find(filter, project, { limit, skip });

		res.send({ message: 'successd', data: todos });
	} catch (error) {
		console.log('error ', error);
		res.status(400).send({ message: error.message });
	}
});

// get todo by its mongoId
app.get('/todo/:id', async (req, res) => {
	try {
		const id = req.params.id; //mongo ObjectId
		const todo = await todoModel.findById(id);

		res.send({ message: 'success', data: todo });
	} catch (error) {
		console.log('error ', error);
		res.status(400).send({ message: error.message });
	}
});

// can be used to change status of todo. eg. from "In process" to completed
app.patch('/todo/:id', async (req, res) => {
	try {
		const id = req.params.id; //mongo ObjectId

		const body = req.body;
		const todo = await todoModel.findByIdAndUpdate(id, { $set: body }, { new: true }); // update doc. and return updated doc

		res.send({ message: 'success', data: todo });
	} catch (error) {
		console.log('error ', error);
		res.status(400).send({ message: error.message });
	}
});

// to delete todo from db using its mongoId
app.delete('/todo/:id', async (req, res) => {
	try {
		const id = req.params.id; //mongo ObjectId

		const deletedTodo = await todoModel.findByIdAndDelete(id); // delete doc. and return deleted doc

		res.send({ message: 'success', data: deletedTodo });
	} catch (error) {
		console.log('error ', error);
		res.status(400).send({ message: error.message });
	}
});

(async () => {
	const PORT = process.env.PORT || 4000;
	// server should wait for db connection .. if connection fails.. app server will not start
	await dbConnection();

	app.listen(PORT, () => {
		console.log('server listening on port ', PORT);
	});
})();
