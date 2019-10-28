import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {users: [], messages: [], text: '', name: ''};
	}

	componentDidMount() {
		socket.on('message', message => this.messageReceive(message));
		socket.on('update', ({users}) => this.chatUpdate(users));
	}//nasłuchuje 

	messageReceive(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});
	}//odbiera wiadomośc i aktualizuje tablice z wiadomosciami

	chatUpdate(users) {
		this.setState({users});
	}//aktualizuje liste userów

	handleMessageSubmit(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});//aktualizacja stanu
		socket.emit('message', message);//aktualziacja wyswietlania
	}//wysyła wiadomosc do serwera

	handleUserSubmit(name) {
		this.setState({name});
		socket.emit('join', name);//emituje powadiomienie 
	}//tworzenie nowego usera


	render() {
		return this.state.name !== '' ? (
			this.renderLayout() 
			): this.renderUserForm();//pokazuje czata jak jest podane imie usera
	}

	renderLayout() {
		return (
			<div className={styles.App}>
				<div className={styles.AppHeader}>
					<div className={styles.AppTitle}>
						ChatApp
					</div>
					<div className={styles.AppRoom}>
						App room
					</div>
				</div>
				<div className={styles.AppBody}>
					<UsersList
						users={this.state.users}
					/>
					<div className={styles.MessageWrapper}>
						<MessageList
							messages={this.state.messages}
						/>
						<MessageForm
							onMessageSubmit={message => this.handleMessageSubmit(message)}
							name={this.state.name}
						/>
					</div>
				</div>
			</div>
		);
	}

	renderUserForm() {
		return <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />
	}
};

export default hot(module)(App);