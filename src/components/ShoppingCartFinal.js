import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReviewProducts from './ReviewProducts';
import InfoBuyer from './InfoBuyer';
import PaymentMethod from './PaymentMethod';

class ShoppingCartFinal extends Component {
  constructor() {
    super();
    this.state = {
      itensCart: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.fillItensCart();
  }

  fillItensCart = () => {
    const value = JSON.parse(localStorage.getItem('cartItems'));
    const itensCart = !value ? false : this.countItens(value);
    this.setState({ itensCart });
  }

  countItens = (value) => {
    const onlyItens = [...new Set([...value.map((p) => p.title)])];
    return onlyItens.map((item) => ({
      item,
      quanty: value.filter(({ title }) => title === item).length,
      price: value.find(({ title }) => title === item).price,
    }));
  }

  clearCart = () => {
    localStorage.clear('cartItems');
    this.setState({ redirect: true });
    const { state } = this.props
    state()
  }

  render() {
    const { itensCart, redirect } = this.state;
    const msg = 'Seu carrinho está vazio';
    return (
      <div>
        { redirect && <Redirect to="/" /> }
        <div className="reviewProducts">
          { itensCart
            ? <ReviewProducts itensCart={ itensCart } />
            : <div className="alert alert-warning" data-testid="shopping-cart-empty-message">{ msg }</div>}
        </div>
        <form className="infoBuyer" onSubmit={ (e) => { e.preventDefault(); } }>
          <InfoBuyer />
          <PaymentMethod />
          <button
            id="buy"
            type="submit"
            class="btn btn-success"
            onClick={ () => this.clearCart() }
          >
            Comprar
          </button>
        </form>
      </div>
    );
  }
}

export default ShoppingCartFinal;
