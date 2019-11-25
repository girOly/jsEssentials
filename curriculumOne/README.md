<!-- All Credit goes to Lighthouse Labs, Full Glitch Repo can be found here: https://glitch.com/edit/#!/concise-chemistry?path=README.md:297:132 -->



[![Logo](https://s3.amazonaws.com/thinkific/site_themes/logo_000/034/661/1486428574.medium.png?1486428574)](http://lighthouselabs.ca)
# Javascript Essentials Workshop

## Introduction

Hello and thank you for joining us for this JavaScript Essentials Workshop.

## The goal

Today's goal is to get acquainted with JavaScript-based Web programming by creating a simple chat application. We'll use modern tools \(Node.js, Web Sockets, etc.\) and touch upon many different technologies.

The objective is not to fully understand every line of code, but to understand server-client architecture and to be inspired by how much can be created with so little code.

## The product

The finished app that we'll be building in just a couple of hours today will look and feel much like this.

![Example](https://github.com/lighthouse-labs/gitbook-node-chat-tutorial/raw/master/assets/example-cropped.png)

## HTML/CSS

Let's start by exploring the HTML/CSS of this application. We'll to understanding it well in order to figure out how to convert it into a fully functional chat application.

Go ahead, explore the files _public_/index.html and _public_/style.css using the left navigation menu.  

# JavaScript

Having spent sometime studying the look and feel of our web application, it is time we make it do something.  This is where we dive into Javascript to code the behaviour.   

## JavaScript in the Browser

Let's add some behaviour to your webpage so it actually does something useful. That's where JavaScript comes in.

Much like with the CSS, we need to link our new **.js** code with our web page, our **.html** file.

Add the following tags to the *bottom* of the HTML file.

```html
<script src="app.js"></script>
```

Now whenever you refresh/load the web page, it will reference two separate JS files for the browser to download (at the end), one of which is external (3rd party) to our application. This 3rd party library called jQuery is there to make life easier. We don't **need** it, but with it we can write less code. This is why most websites use jQuery or other libraries like it.

## Simple alert

The second file **app.js** needs to exist in our workspace, so let's create it just like you created **style.css** earlier.

It will be empty at first, but let's add the following code into it.

```javascript
alert('hello from the JS file');
```

Save the file and refresh the HTML file in your browser. When the page loads you should see an alert pop up that says your message.

`alert` is a built in function that all browsers support, even though they may look slightly different on each browser. I'm guessing it's not your first time seeing one, so now you know how they happen.

Any time you call a function in JS you have to use parentheses `()` after it, and within the brackets you put in data that you want to give the function. Programming functions are much like math functions. They take in values and can do some crunching and give you back a computed value, or in this case, give you back some behaviour like popup that message you passed into it.

Every single predefined JavaScript function has documentation, so we can look up details about how they work. [Case in point](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert).

Very soon, we'll create our own function while using other functions. It's going to get a bit more real, so hold on to your suspenders!

## Custom alert

**Remove the `alert` code** and let's get down to business. We want to make it so when our `<form>` is submitted (via enter key or by clicking the send button) we read the text content of the input field (with `id="message"` in the HTML file) and do something with it. For now let's just `alert` it.

```javascript
$('form').on('click',function () {
  var text = $("#message").val();
  alert(text);
  return false;
});
```

Remember, type that out yourself. Don't copy paste it. Assuming you started and closed all the brackets, quotes, and semicolons correctly, it should add some interesting behaviour to the page.

Save the file, and refresh the HTML page. Put some text into the input field and hit Enter or click Send. You should see it echoed back to you in an alert message. If not, review or otherwise seek help.

### Explanation

The code above isn't doing too much, but it does need to be reviewed before we move on.

First, we use **jQuery** using the `$` function, telling it that we want to target all `form` elements on the page. There is only one form element on the page and it is the one at the bottom which contains both input fields and the button.

Note how we don't use the `<`angle`>` brackets when targeting elements here, just like with CSS. Angle brackets are solely used to *define* tags in the HTML page.

We then call/invoke another function called `on` on that returned form element, saying that we want to be notified anytime that a very specific *event* takes place.  In this case the event we care about is `submit`.

Asking to be notified when a given event takes place and waiting for it to happen is a very popular programming paradigm called **event-driven programming**  Once the event takes place, we will be notified via our own custom function. That's right, `on` is a function that accepts another function as a parameter. Read that again. Look at the code. Remember that we pass in data into functions within the parentheses `()`. They're not on the same line, but they are there.

Inside our function, the rest of the code is indented so that we know that it is within that function, just like we nest HTML tags with indentation. Make sure your code is indented correctly because improper indentation is a big source of confusion.

This inside code is capturing the text value of the HTML element with the ID `message` and then passing it to `alert` so that we can see it.

Lastly, the `return false` is there to tell the browser to cancel the original form submission logic (which is to attempt sending the form to the server, with loading spinner and everything.) This is common practice when adding custom behaviour to forms like we are doing here.

# Node (JavaScript on the server)!

So far we've been building a website with some static content and a bit of client-side interactivity.

It's time to take it up a notch and graduate to "Web application" status. Server-side app logic is what separates a site from an app.

Believe or not, each of you is running your own server.  However, thanks to the magic of cloud-computing, such server is running within **Glitch**.  This saves you a lot of headaches associated with operating a server.

## Basic web server

If you inspect the contents of the **index.js** file, you'll see there is some code there already.  This is the minimum amount of coding necessary in order for your cloud-server to run normally.  

You can add the following line of code at the very beginning just to confirm that you are still in control of what your server does:

```javascript
console.log('hello from our node script!');
```

Notice that Glitch provides an option on the left navigation to open your **Logs**.  This is where all `console.log` messages will appear when the application is running.

The output should look like this.

```
hello from our node script!
```

And there's our message, nice!

# Express for our web server

In our case, we're building a web server, more specifically a _chat 'server'_. So we need to listen for incoming HTTP requests and then send down the HTML, CSS and JavaScript that we wrote earlier for our chat client.

While Node comes with basic HTTP handling support, a very (probably the most) popular 3rd party library (called "modules" in the Node community) named **Express** is used by most developers writing Web servers in Node. This is what we are using here.


```javascript
var express = require('express');
var app = express();

var server = require('http').createServer(app);

app.use(express.static('public'));

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
```

### Explanation

So a bunch of new code and syntax was just give to you there. Let's attempt to break it down.

The first few lines are just loading external modules. We then tell the Express app to server all static content from the **public** folder.

When all the setup work is done, we then tell the server to listen in on a certain port (in this case 3000.)

So for now it's a simple web server serving only static (HTML, CSS and JavaScript) files to any HTTP/Web traffic coming its way.

Let's try it out by running it using the **Show Live** option at the top. It will bring up the chat app page just like before, with no new functionality. The send button should be working as before, too!

# Socket.IO for Real-time messaging

Now it's time to add the last missing, yet crucial piece to our app: _chat functionality_!

To do this, we will leverage yet another 3rd party Node module. It's called Socket.io.

Check it out here: <http://socket.io/>.

Socket.io will leverage a more core technology that browsers give us called Web Sockets.

What's nice about Socket.io is that it will let us write similar JS code on both the client (browser) side and at the server (Node) side.

## Step 1

To make sure the correct package is added to our project check your dependencies in the file **package.json**:

```json
"dependencies": {
  "express": "^4.12.4",
  "socket.io": "*"
},

```

## Step 2

Now let's add some code in **index.js** that will use this library. This code block should be placed before/above `server.listen`.

```javascript
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  // when the client emits 'new message', this listens and executes
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
});
```

## Step 3

Next, we need to add similar logic to the client app.

Open the **public/index.html** file and modify the `script` tags below so that we also reference and make use of Socket.IO. We can do this by adding one more script tag before our `app.js` script tag, so that it looks like this down there.

```html
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="/socket.io/socket.io.js"></script>
<script src="app.js"></script>
```

## Step 4

Open **public/app.js**, our client-side JS code file and let's add some code to send and receive messages from the browser.

Add the following code to the very top of the file.

```javascript
var socket = io();
```

This is saying that `socket` is now a reference to the SocketIO library.

## Step 5

In that same file, replace the `alert` line from before with the following code:

```javascript
  socket.emit('message', text);
  $('#message').val('');
```

The code above says to emit the textual message to the server instead of performing our temporary `alert` behavior. The second line in the code simply clears the input so that another message can be typed by the same user.

We're not done yet, we need to listen for messages that are received from the server and append them into the message list. Add the following code at the bottom of the file:

```javascript
socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});
```

This part tells the browser that any time a message is received from the real time web socket connection with the server, create a new `<li>` (list item) HTML element and append it to the messages `<ol>` (container).

## Final code for app.js

The `app.js` file should look like this.

```javascript
var socket = io();

$("button").on('click', function() {
  var text = $("#message").val();
  socket.emit('message', text);
  $('#message').val('');
  return false;
});

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});

```

## Final code for index.js

The `index.js` file should look like this:

```javascript
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('public'));

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
});

var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
```

## Whoa, it works!

Make sure all your files are saved, and the Node server is still running, and give it a shot.

That's right, it works! That's all it took. The basic chat functionality works. Have your peer go to the same URL that you're on and you guys should be able to communicate!

Note: newcomers to the chat room can't see any previous messages (message history). We would have to implement that functionality fo
