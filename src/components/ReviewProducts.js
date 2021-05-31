import React from 'react';
import PropTypes from 'prop-types';

class ReviewProducts extends React.Component {
  somePrices = (itensCart) => {
    const allValues = itensCart && itensCart.map((item) => item.price * item.quanty);
    return allValues.reduce((acc, curr) => acc + curr, 0);
  }

  render() {
    const { itensCart } = this.props;
    const msg = 'Seu carrinho está vazio';
    return (
      <div className='checkout-content'>
        {itensCart.map(({ item, quanty }) => (
          <div key={ item }>
              <div className='each-item-finish' data-testid="shopping-cart-product-name">
                <ul>
                  <li>{ `${quanty}  ${item}` }</li>
                </ul>
              </div>
            </div>))}
        <div className='total-price-finish'>
          <h3>
          Total:
          { ` R$ ${this.somePrices(itensCart)}` }
          </h3>
        </div>
      </div>
    );
  }
}

ReviewProducts.propTypes = {
  itensCart: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default ReviewProducts;
