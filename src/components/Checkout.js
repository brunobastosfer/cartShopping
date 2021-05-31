import React from 'react';
import ShoppingCartFinal from './ShoppingCartFinal';
import { Link } from 'react-router-dom'

class Checkout extends React.Component {
  render() {
    return (
    <div className='details-link'>
      <button className='btn btn-primary home-details'>
        <Link to="/" id='link-cart-details'>Home</Link>
      </button>
      <ShoppingCartFinal state={this.props.state} />
    </div>
    )
  }
}

export default Checkout;
