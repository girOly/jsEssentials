// Event-driven programming, the below are "event handlers"
var socket = io();

// Events are handled one at a time

$("button").on("click", function() {
  var text = $("#message").val();
  socket.emit("message", text);
  $("#message").val("");
  return false;
});

$("h1").on("click", function() {
  alert("Welcome to my app!");
  return false;
});

socket.on("message", function(msg) {
  $("<li>")
    .text(msg)
    .appendTo("#history");
});
