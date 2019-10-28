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
  }//zapobiega domyslemu zachowaniu formualrza i przekazuje tkst z pola

  handleChange(e) {
    this.setState({ name : e.target.value });
  }//odbiera wartosc z inputa polaczonego z eventem i zmienia tekst

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