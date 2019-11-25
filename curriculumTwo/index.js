// Setup basic express server
const express = require("express");
const app = express();

const server = require("http").createServer(app);

// This is how we tell our web server where to find the files to serve
app.use(express.static("public"));

console.log("My server is ready to serve...");

let io = require("socket.io")(server);

io.on("connection", function(socket) {
  // when the client emits 'new message', this listens and executes
  socket.on("message", function(msg) {
    console.log("Message received: ", msg);
    io.emit("message", msg);
  });
});

let port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Server listening at port %d", port);
});
