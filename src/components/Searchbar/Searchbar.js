import { Component } from 'react';
import propTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query === '') {
      alert('Please enter search query.');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    const { handleQueryChange, handleFormSubmit } = this;

    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleFormSubmit}>
          <input
            className={s.input}
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleQueryChange}
          />
          <button className={s.button} type="submit">
            <span className={s.button_label}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
