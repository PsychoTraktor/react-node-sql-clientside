import React, { Component } from 'react';
import './App.css';


class App extends Component {

  state = {
    products: [],
    product: {
      name: '',
      price: 20,
    }
  }

  //lifecycle method
  componentDidMount() {
    this.getProducts();
  }

  //make request with fetch
  getProducts = _ => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err))
  }

  addProduct = _ => {
    const {product} = this.state;
    fetch(`http://localhost:3001/products/add?product=${product.name}&ar=${product.price}`)
    .then(this.getProducts)
    .catch(err => console.error(err))
  }

  //rendering the data
  renderProduct = ({ id, product, ar }) => <div key={id}>{product}{' '}{ar}</div>

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}
        <div>
          <input value={product.name}
          onChange={e => this.setState({product:{...product, name: e.target.value}})} />
          <input value={product.price}
          onChange={e => this.setState({product:{...product, price: e.target.value}})} />
          <button onClick={this.addProduct}>Add Product</button>
        </div>
      </div>
    )
  }
};

export default App;
