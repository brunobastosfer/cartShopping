import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { product: { title, thumbnail, price }, product, getName } = this.props;
    return (
      <div className='item-content' data-testid="product">
        <div class='item-each-content'>
          <img className='img-item-content' src={ thumbnail } alt={ title } />
          <h4>{ title }</h4>
          <h3>R$: { price }</h3>
          <div class='button-card-content'>
            <button
              onClick={ getName(product) }
              type="button"
              data-testid="product-add-to-cart"
              className="btn btn-danger"
            >
              Adicionar ao Carrinho
            </button>
            <button class="btn button-add-cart">
              <Link
                data-testid="product-detail-link"
                id='card-link-details'
                to={ `/details/${encodeURIComponent(title)}` }
              >
                <span class='product-details-text'>DETALHES DO PRODUTO</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  getName: PropTypes.func.isRequired,
};

export default Card;
