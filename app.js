const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const fs = require("fs");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(cors());

//--------------Convert Readme.md to hmtl and host it
const showdown = require("showdown");
const converter = new showdown.Converter();
converter.setOption("tables", true);
app.get("/", function (req, res) {
	fs.readFile(__dirname + "/README.md", "utf-8", function (err, data) {
		if (err) throw err;
		res.send(converter.makeHtml(data));
	});
});
//setup socket  End Points
io.on("connection", (socket) => {
	console.log("Client Connected");

	//Listener for joining room
	socket.on("join", (projectId, entityId) => {
		const room = projectId.toLowerCase().concat(entityId.toLowerCase());
		socket.join(room);
		console.log("Client is connected to Room", room);
	});

	//Listener to update Location of Entity
	//TODO ADD Autentication....
	socket.on("update-location", (projectId, entityId, location) => {
		//emits entity-new-location event to room (projectId-entityId);
		const room = projectId.toLowerCase().concat(entityId.toLowerCase());
		console.log("updating location of ");
		console.log(entityId);
		socket.broadcast.to(room).emit("entity-new-location", entityId, location);
	});

	//Listener for Leaving room
	socket.on("leave", (projectId, entityId) => {
		const room = projectId.toLowerCase().concat(entityId.toLowerCase());
		socket.leave(room);
		console.log("Client left room", room);
	});

	socket.on("disconnect", () => {
		console.log("Client Disconnected");
	});
});

//start server
server.listen(port, () => {
	console.log("Listening on port " + port);
});
