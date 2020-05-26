// implement your API here
const express = require("express")
const db = require("./data/db");

const server = express();
const port = 4000;

server.use(express.json());

const URL = "/api/users"

// passable GET function
const returnGet = (id, res) => {
	db.findById(id)
		.then(incoming => {
			(incoming)
				? res.status(200).json(incoming)
				: res.status(404).json({ message: `ID NOT FOUND updated none` })
		})
		.catch(err => {
			console.log(`GET 'user by id ${id}' error`, err);
			res.status(500)
				.json({ msg: `GET 'user by id ${id}' error` });
		})
}

server.put(URL + "/:id", (req, res) => {
	const id = req.params.id;
	const bod = req.body;
	const exists = db.findById(id);
	console.log(exists)

	db.update(id, bod)
		.then(upd => {
			(upd > 0)
				? res.status(200).json(req.body)
				: res.status(404).json({ message: `ID NOT FOUND updated none` })
		})
		.catch(err => {
			console.log("PUT 'update user' error", err);
			res.status(500)
				.json({ msg: "PUT 'update user' error" });
		})
});

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
	returnGet(id, res);
	// MOVED TO "returnGet" function defined at the top
	// db.findById(id)
	// 	.then(incoming => {
	// 		res.status(200).json(incoming);
	// 	})
	// 	.catch(err => {
	// 		console.log(`GET 'user by id ${id}' error`, err);
	// 		res.status(500)
	// 			.json({ msg: `GET 'user by id ${id}' error` });
	// 	})
})

// #endregion GETS

server.post(URL, (req, res) => {
	const data = req.body;
	if (!data.name || !data.bio) {
		res.status(400).json({ message: `Need both 'name' and 'bio'.` })
		res.end();
	}

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
});