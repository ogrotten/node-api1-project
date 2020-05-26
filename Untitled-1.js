server.put('/users/:id', (req, res) => {
	const userData = req.body;
	const id = req.params.id
	const name = req.params.name
	const bio = req.params.bio
	const account = db.findById((userId) => userId.id === id);
	db.update(id, userData)
		.then(user => {
			if (!account) {
				res.status(404).json({ message: "The user with the specified ID does not exist." })
			} else if (user.name || user.bio == "") {
				res.status(400).json({ message: "Please provide name and bio for the user." })
			} else {
				res.status(200).json(userData)
			}
		})
		.catch(error => {
			console.log("Error updating user", error);
			res.status(500).json({ message: "The user information could not be modified." })
		})
})


server.put("/users/:id", (req, res) => {
	const { name, bio } = req.body;
	// Check if name and bio are empty, and returns errorMessage if they are
	if (!name || !bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	} else {
		// Starts the update process, requests an ID and bio and name from the client
		db.update(req.params.id, req.body)
			.then(user => {
				// if the user is found with the ID, updates, else, returns a message saying the user is not found
				if (user) {
					res.status(200).json(req.body);
				} else {
					res
						.status(404)
						.json({ message: "The user with the specific ID does not exist." });
				}
			})
			.catch(error => {
				res
					.status(500)
					.json({ error: "The user information could not be modified." });
			});
	}
});