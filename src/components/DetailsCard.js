import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Rating from './Rating';

class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      details: {},
      nameItems: [],
      textArea: '',
      select: 5,
      loading: true,
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  componentDidUpdate() {
    const { nameItems } = this.state;
    if (nameItems.length !== 0) {
      const value = JSON.parse(localStorage.getItem('cartItems'));
      const result = !value ? [] : value;
      localStorage.setItem('cartItems', JSON.stringify([...result, nameItems]));
    }
  }

  handleChange(field, newValue) {
    this.setState({ [field]: newValue });
  }

  handleSubmit = (id) => () => {
    const { textArea, select } = this.state;
    const conteudo = `${textArea} Nota:${select}`;
    const value = JSON.parse(localStorage.getItem(id));
    const result = !value ? [] : value;
    localStorage.setItem(id, JSON.stringify([...result, conteudo]));
  }

  getName = (product) => () => {
    const { qtd } = this.props;
    this.setState({ nameItems: product });
    qtd();
  }

  getAPI = async () => {
    const { match: { params: { title } } } = this.props;
    const products = await getProductsFromCategoryAndQuery('', title);
    this.setState({
      details: products.results[0],
      loading: false,
    });
  }

  render() {
    const { details: { title, thumbnail, price, id }, details, loading } = this.state;
    const { value } = this.state;
    const { state } = this.props;
    return (
      <section className='details-container'>
        <div className='nav-link-container'>
          <div className='details-link'>
          <button className='btn btn-primary home-details'>
          <Link to="/" id='link-cart-details'>Home</Link>
          </button>
          </div>
          <div className='details-link'>
              <Link data-testid="shopping-cart-button" id="cart-item-details" to="/cart">
                <img id='img-car' src= 'https://img.flaticon.com/icons/png/512/161/161611.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'/>
              <span span data-testid="shopping-cart-size">{state}</span>
              </Link>
          </div>
        </div>
          <div className='item-details'>
          {
          loading && <p className='loading-details'>Carregando...</p>
          }
            <img id='details-img' src={ thumbnail } alt={ title } />
            <h4 data-testid=" product-detail-name">{ title }</h4>
            <h3>R$ { price }</h3>
            <div className='button-details-container'>
              <button
                data-testid="product-detail-add-to-cart"
                type="button"
                onClick={ this.getName(details) }
                className="btn btn-danger"
              >
                Adicionar ao Carrinho
              </button>
            </div>
        </div>
        <div className='container-form'>
          <form>
            <select
              className="form-select"
              onChange={ (event) => this.handleChange('select', event.target.value) }
            >
              <option selected>Avalie o produto</option>
              <option value={ 1 }>1</option>
              <option value={ 2 }>2</option>
              <option value={ 3 }>3</option>
              <option value={ 4 }>4</option>
              <option value={ 5 }>5</option>
            </select>
            <div class="mb-3">
              <label
              htmlFor='text-area'
              class="form-label"
              >Deixe um comentário</label>
              <textarea
              className="form-control"
              id='text-area'
              rows="3"
              name="textArea"
              data-testid="product-detail-evaluation"
              value={ value }
              onChange={ (event) => this.handleChange('textArea', event.target.value) }
              />
            </div>
            <input onClick={ this.handleSubmit(id) } type="submit" value="Enviar" />
          </form>
        </div>
        <Rating id={ id } />
      </section>
    );
  }
}

DetailsCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  qtd: PropTypes.func.isRequired,
  state: PropTypes.number.isRequired,
};

export default DetailsCard;
