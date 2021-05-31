import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import DetailsCard from './components/DetailsCard';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      qtd: 0,
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  increment = () => {
    const { qtd } = this.state;
    this.setState({
      qtd: qtd + 1,
    });
  }

  getLocalStorage = () => {
    const value = JSON.parse(localStorage.getItem('cartItems'));
    const valueSize = !value ? 0 : value.length;
    this.setState({ qtd: valueSize });
  }

  decrement = () => {
    const { qtd } = this.state;
    this.setState({
      qtd: qtd - 1,
    });
  }

  clearCart = () => {
    this.setState({
      qtd: 0
    })
  }

  render() {
    const { qtd } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              qtd={ this.increment }
              state={ qtd }
              { ...props }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<ShoppingCart
              increment={ this.increment }
              decrement={ this.decrement }
              state={ qtd }
              { ...props }
            />) }
          />
          <Route
            path="/details/:title"
            render={ (props) => (<DetailsCard
              qtd={ this.increment }
              state={ qtd }
              { ...props }
            />) }
          />
          <Route
            path="/checkout"
            render={(props) => (<Checkout 
              state={ this.clearCart }
              { ...props }
            />)}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
