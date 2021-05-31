import React from 'react';
import PropTypes from 'prop-types';

class InputBuy extends React.Component {
  render() {
    const { name, type = 'text', place, tamanho } = this.props;
    return (
      <input
        type={ type }
        id={ name }
        data-testid={ `checkout-${name}` }
        placeholder={ place }
        required
      />

    );
  }
}

InputBuy.propTypes = {
  name: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  type: PropTypes.string,
};

InputBuy.defaultProps = {
  type: undefined,
};

export default InputBuy;
