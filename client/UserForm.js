import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './UserForm.css';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onUserSubmit(this.state.name);
  }

  handleChange(e) {
    this.setState({ name : e.target.value });
  }//gets event as an input and changes text on that basis
  
  render() {
    return(
      <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.UserInput}
          placeholder='Write your nickname and press enter'
          onChange={e => this.handleChange(e)}
          value={this.state.name}
        />
      </form>
    );
  }
}

UserForm.propTypes = {
  onUserSubmit: PropTypes.func.isRequired
};


export default UserForm;