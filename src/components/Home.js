import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getProductsFromCategoryAndQuery } from '../services/api';

import CategoryList from './CategoryList';
import ProductList from './ProductList';
import SearchBar from './SearchBar';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: [],
      search: '',
      filterCategory: false,
      nameItems: [],
    };
  }

  componentDidMount() {
    this.moutState();
  }

  componentDidUpdate() {
    const { nameItems } = this.state;
    if (nameItems.length !== 0) {
      localStorage.setItem('cartItems', JSON.stringify([...nameItems]));
    }
  }

  moutState = () => {
    const value = JSON.parse(localStorage.getItem('cartItems'));
    const result = !value ? [] : value;
    this.setState({ nameItems: result });
  }

  getApiFromCategory = (param) => async () => {
    this.setState({
      filterCategory: await getProductsFromCategoryAndQuery(param, ''),
      filtered: false,
    });
  }

  getApiFromQuery = async () => {
    const { search } = this.state;
    this.setState({
      filtered: await getProductsFromCategoryAndQuery('', search),
      filterCategory: false,
    });
  }

  getName = (product) => () => {
    const { qtd } = this.props;
    this.setState((old) => ({ nameItems: [...old.nameItems, product] }));
    qtd();
  }

  getResult = ({ target: { value } }) => {
    this.setState({ search: value });
  }

  render() {
    const { filtered: { available_filters: resultFilter },
      filtered } = this.state;
    const { filterCategory } = this.state;
    const { state } = this.props;
    return (
      <main>
        <SearchBar
          getResult={ this.getResult }
          getApiFromQuery={ this.getApiFromQuery }
        />
        <div className='link-car-container'>
          <Link data-testid="shopping-cart-button" id="cart" to="/cart">
            <img id='img-car' src= 'https://img.flaticon.com/icons/png/512/161/161611.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'/>
            <span id='cart-size' data-testid="shopping-cart-size">{state}</span>
          </Link>
        </div>
        <br />
        {
          state > 0 &&
          <div className='checkout-products'>
          <button type="button" class="btn btn-success">
            <Link data-testid="checkout-products" id='finish-buy-home' to="/checkout">Finalizar Compra</Link>
          </button>
          </div>
        }
        <CategoryList onClick={ this.getApiFromCategory } />

        {filtered.length !== 0 && (
          <div className="products-category">
            {!resultFilter || resultFilter.length === 0
              ? 'Nenhum produto a ser encontrado'
              : <ProductList getName={ this.getName } products={ filtered.results } /> }
          </div>) }

        {filterCategory && (
          <div className="products-category">
            <ProductList getName={ this.getName } products={ filterCategory.results } />
          </div>)}
      </main>
    );
  }
}

Home.propTypes = {
  qtd: PropTypes.func.isRequired,
  state: PropTypes.number.isRequired,
};

export default Home;
