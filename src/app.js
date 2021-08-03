const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
	const { title, url, techs } = request.body;
	const repository = { id: uuid(), title, url, techs, likes: 0 };
	repositories.push(repository);
	return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
	const { title, url, techs } = request.body;
	const { id } = request.params;
	const findIndex = repositories.findIndex(repository => repository.id === id);
	if (findIndex < 0) return response.status(400).json({ error: "Not found" });
	const repository = { id, title, url, techs, likes: repositories[findIndex].likes };
	repositories[findIndex] = repository;
	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const findIndex = repositories.findIndex(repository => repository.id === id);
	if (findIndex < 0) return response.status(400).json({ error: "Not found" });
	repositories.splice(findIndex, 1);
	return response.status(204).json({});
});

app.post("/repositories/:id/like", (request, response) => {
		const { id } = request.params;
		const findIndex = repositories.findIndex(
			repository => repository.id === id
		);
	if (findIndex < 0) return response.status(400).json({ error: "Not found" });
	repositories[findIndex].likes += 1;
	return response.json(repositories[findIndex]);
});

module.exports = app;
