// implement your API here
const express = require("express")
const db = require("./data/db");

const server = express();
const port = 4000;

// server.use

server.get("/", (req, res) => {
	res.send({ api: "Running" });
})
server.get("/api/users", (req, res) => {
	db.find()
		.then(incoming => {
			res.status(200).json(incoming);
		})
		.catch(err => {
			console.log("GET 'all users' error", err);
			res.status(500)
				.json({msg: "GET 'all users' error"});
		})
})

server.get("/api/users/:id", (req, res) => {
	const id = req.params.id
	db.find(id)
		.then(incoming => {
			res.status(200).json(incoming);
		})
		.catch(err => {
			console.log(`GET 'user by id ${id}' error`, err);
			res.status(500)
				.json({msg: `GET 'user by id ${id}' error`});
		})
})


server.listen(port, () => {
	console.log(`Active :${port}`)
})