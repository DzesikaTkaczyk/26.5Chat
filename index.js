const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersService = require('./UsersService')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const usersService = new UsersService();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => { //socket represents new user in the chat
	// client is listening for a new user message
	socket.on('join', (name) => {//listening for a join
		// add new user to users list
		usersService.addUser({
			id: socket.id,
			name
		});
		// emit user list update to other users
		io.emit('update', {
			users: usersService.getAllUsers()
		});
	});

	socket.on('message', (message) => {
		const {name} = usersService.getUserById(socket.id);
		socket.broadcast.emit('message', {//broadcast.emit - message is send to everyone but the sender
			text: message.text,
			from: name
		});
	});

	socket.on('disconnect', () => {
		usersService.removeUser(socket.id);
		socket.broadcast.emit('update', { //emit leave chat and update user list 
			users: usersService.getAllUsers()
		});
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});