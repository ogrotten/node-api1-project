// implement your API here
const express = require("express")
const db = require("./data/db");

const server = express();
const port = 4000;

server.use(express.json());

const URL = "/api/users"

// GETs
// #region GETS
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
				.json({ msg: "GET 'all users' error" });
		})
})

server.get("/api/users/:id", (req, res) => {
	const id = req.params.id
	db.findById(id)
		.then(incoming => {
			res.status(200).json(incoming);
		})
		.catch(err => {
			console.log(`GET 'user by id ${id}' error`, err);
			res.status(500)
				.json({ msg: `GET 'user by id ${id}' error` });
		})
})

// #endregion GETS


server.post(URL, (req, res) => {
	const data = req.body;
	db.insert(data)
		.then(data => {
			res.status(201).json(data)
		})
		.catch(err => {
			console.log("POST 'new user' error", err);
			res.status(500)
				.json({ msg: "POST 'new user' error" });
		})
})

server.delete(URL + "/:id", (req, res) => {
	const id = req.params.id;
	db.remove(id)
		.then(remv => {
			(remv > 0)
				? res.status(200).json({ message: `OK removed ${remv}` })
				: res.status(404).json({ message: `ID NOT FOUND removed ${remv}` })
		})
		.catch(err => {
			console.log("DELETE 'user' error", err);
			res.status(500)
				.json({ msg: "DELETE 'user' error" });
		})
})

server.listen(port, () => {
	console.log(`Active :${port}`)
})