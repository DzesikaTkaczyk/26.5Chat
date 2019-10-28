const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersService = require('./UsersService')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const usersService = new UsersService();//czemu new?

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => { //socket reprezentuje osobe ktora wlasnie weszła
	// klient nasłuchuje na wiadomość wejścia do czatu
	socket.on('join', (name) => {//nasłuchiwanie join
		// użytkownika, który pojawił się w aplikacji, zapisujemy do serwisu trzymającego listę osób w czacie
		usersService.addUser({
			id: socket.id,
			name
		});
		// aplikacja emituje zdarzenie update, które aktualizuje informację na temat listy użytkowników każdemu nasłuchującemu na wydarzenie 'update'
		io.emit('update', {
			users: usersService.getAllUsers()
		});
	});

	socket.on('message', (message) => {
		const {name} = usersService.getUserById(socket.id);
		socket.broadcast.emit('message', {//broadcast.emit wiadomosc wysyla sie pozostalych userów, ale nie do autora
			text: message.text,
			from: name
		});
	});

	socket.on('disconnect', () => {
		usersService.removeUser(socket.id);
		socket.broadcast.emit('update', { //wysyla ostatnia wiadomosc- info o wyjsciu z czata i aktualizacja listy userów
			users: usersService.getAllUsers()
		});
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});