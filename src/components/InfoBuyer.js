import React from 'react';
import InputBuy from './InputBuy';

class infoBuyer extends React.Component {
  render() {
    return (
      <fieldset>
        <legend>Informações do Comprador</legend>
        <InputBuy name="fullname" place="Nome completo" />
        <InputBuy name="number" type="number" place="CPF" />
        <InputBuy name="email" place="Email" />
        <InputBuy name="phone" type='number' place="Telefone" />
        <InputBuy name="cep" type='number' place="CEP" />
        <InputBuy name="address" place="Endereço" />
      </fieldset>
    );
  }
}

export default infoBuyer;
