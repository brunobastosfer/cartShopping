import React from 'react';

class PaymentMethod extends React.Component {
  render() {
    return (
      <div className='payment-method'>
        <fieldset>
          <legend>Método de Pagamento</legend>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label className="form-check-label" htmlFor="boleto">
              Boleto
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="creditCard">
              Cartão de Cŕedito
            <div>
            <input className="form-check-input" type="radio" name="payment" id="flexRadioDefault1"/>
              Visa
            <input className="form-check-input" type="radio" name="payment" id="flexRadioDefault1"/>
              MasterCard
            <input className="form-check-input" type="radio" name="payment" id="flexRadioDefault1"/>
            Elo
            </div>
            </label>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default PaymentMethod;
