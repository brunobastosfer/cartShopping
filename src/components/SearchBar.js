import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    const { getResult, getApiFromQuery } = this.props;
    return (
      <div id="searchBar">
        <input onChange={ getResult } type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        <button
          data-testid="query-button"
          type="button"
          onClick={ getApiFromQuery }
          class="btn btn-light"
        >
          Pesquisar
        </button>
        <p className='paragraph-searchBar' data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

SearchBar.propTypes = {
  getResult: PropTypes.func.isRequired,
  getApiFromQuery: PropTypes.func.isRequired,
};

export default SearchBar;
