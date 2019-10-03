import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { connect } from "react-redux";
import { reducer } from '../store.js'

export class Favourites extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      availableCodes: []
    }
  }

  componentDidMount() {
    let URL1 = "http://api.nbp.pl/api/exchangerates/tables/A/?format=json"
    let URL2 = "http://api.nbp.pl/api/exchangerates/tables/B/?format=json"

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);

    let availableCodes = [];
    Promise.all([promise1, promise2]).then((values) => {
      values.map((o, i) => {
        o.data[0].rates.map(rate => {
          availableCodes.push(rate.code)
        })
      });
    });

    this.setState({
      availableCodes: availableCodes
    })
  }

  addFavourite() {
    let code = this.state.inputValue.toUpperCase();

    if (code === 'PLN') {
      alert('It is NBP courses so PLN to PLN ? Makes no sense...')
      return
    }

    if (this.props.favouriteCurrencies.includes(code)) {
      alert('Code is already added to favourites')
      return
    }

    if (!this.state.availableCodes.includes(code)) {
      alert('This code is invalid currency code')
      return
    }

    this.props.dispatch({ type: 'ADD_FAVOURITE', code: code})

    // tutaj trzeba to tez bedzie zapisac do localStorage (i z niego usuwac)

    // Cleanup inputa
    this.setState(state => {
      return { 
        inputValue: '',
      }
    })

    this.refs.input.value = '';
  }

  removeFavourite(code) {
    this.props.dispatch({ type: 'DELETE_FAVOURITE', code: code})
  }

  removeAllFavourites(code) {
    this.props.dispatch({ type: 'DELETE_ALL_FAVOURITES'})
  }

  onInputChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return(
      <>
        <h1>Favourite currencies:</h1>
        <div className={'favourites'}>
          {this.props.favouriteCurrencies.map((code, index) => (
            <div key={index}>
              { code }
              <a
                className={'delete'}
                onClick={ () => this.removeFavourite(code) }
              >
                Delete
              </a>    
            </div>
          ))}
          <div className={'input-wrapper'}>
            <input
              ref="input"
              className="add-favourite"
              type="text"
              placeholder="New code..."
              onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.addFavourite()
                  }
                }}
              onChange={ this.onInputChange.bind(this) }
            />
          </div>
          <div className={'action-wrapper'}>
            <a
              className={'remove-all'}
              onClick={ () => this.removeAllFavourites() }
            >
              Delete all Favourites
            </a>
          </div>
    	  </div>
        <style jsx>{`
          .favourites {
            width: 100%;
            font-family: Arial;
          }

          .action-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
          }

          .action-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .remove-all {
            width: 100%;
            text-align: center;
            color: red;
            heght: 40px;
          }

          h1 {
            width: 100%;
            float: left;
          }

        	.element {
        		width: 100%;
        		height: 30px;
        		float: left;
        	}

        	.delete {
        		float: right;
        		color: red;
        	}
        `}</style>
      </>
    )
  }
}

export default connect(state => state)(Favourites);