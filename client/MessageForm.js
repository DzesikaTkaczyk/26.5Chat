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
    };//create message: text + sender form props
    this.props.onMessageSubmit(message);//pass message to array
    this.setState({ text: '' });//clear input window
  }//send new message

  changeHandler(e) {
    this.setState({ text : e.target.value });
  }//update input

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