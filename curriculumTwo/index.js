// Setup basic express server
var express = require("express");
var app = express();

var server = require("http").createServer(app);

// This is how we tell our web server where to find the files to serve
app.use(express.static("public"));

var io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("message", function(msg) {
    console.log("Received Message: ", msg);

    function isQuestion(msg) {
      return msg.match(/\?/);
    }

    function askingTime(msg) {
      return msg.match(/time/i);
    }

    function askingWeather(msg) {
      return msg.match(/weather/i);
    }

    function getWeather(callback) {
      var request = require("request");

      request.get("https://www.metaweather.com/api/location/4118/", function(
        error,
        response
      ) {
        if (!error && response.statusCode === 200) {
          console.log(response);
          var data = JSON.parse(response.body);

          callback(data.consolidated_weather[0].weather_state_name);
        }
      });
    }

    if (!isQuestion(msg)) {
      io.emit("message", msg);
    } else if (askingTime(msg)) {
      io.emit("message", new Date());
    } else if (askingWeather(msg)) {
      getWeather(function(weather) {
        io.emit("message", weather);
      });
    }
  });
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Server listening at port %d", port);
});
