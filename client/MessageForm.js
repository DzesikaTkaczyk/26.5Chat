import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './MessageForm.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      from : this.props.name,
      text : this.state.text
    };//robie wiadomosc:tekst + nadawca pobrany z probsów
    this.props.onMessageSubmit(message);//przekazuje tekst do tablicy na wiadomosci
    this.setState({ text: '' });//czyści okienko inputa
  }//wysłanie nowej wiadomosci

  changeHandler(e) {
    this.setState({ text : e.target.value });
  }//aktualizuje watrosc inputa

  render() {
    return(
      <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.MessageInput}
          onChange={e => this.changeHandler(e)}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

MessageForm.propTypes = {
  onMessageSubmit: PropTypes.func.isRequired
};

export default MessageForm;