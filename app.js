const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 4000;
//For Showing if Server is Up
app.get("/", (req, res) => {
	res.send("<h1>Socket Server up and Running...</h1>");
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
	socket.on("update-location", (projectId,entityId,location) => {    
        //emits entity-new-location event to room (projectId-entityId);
        const room = projectId.toLowerCase().concat(entityId.toLowerCase());
        console.log("updating location of ");
        console.log(entityId)
		socket.broadcast.to(room).emit("entity-new-location", location);
	});

	//Listener for Leaving room
	socket.on("leave", (projectId, entityId) => {
		const room = projectId.toLowerCase().concat(entityId.toLowerCase());
		socket.leave(room);
		console.log("Client left room", room);
	});

	io.on("disconnect", () => {
		console.log("Client Disconnected");
	});
});

//----------------------------------------------------------
//Start Server
server.listen(port, () => {
	console.log("Server Up and running at Port :" + port);
});
