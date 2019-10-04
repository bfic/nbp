import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { connect } from "react-redux";
import { reducer } from '../store.js';
import { loadState } from '../helpers/localStorage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Favourites extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
    }
  }

  componentDidMount() {
    // We are getting favouriteCurrencies from localStorage
    let isServer = typeof window === "undefined";
    if (!isServer) {
      let persistedState = loadState();
      if (persistedState && persistedState != {}) {
        this.props.dispatch({ type: 'SET_FAVOURITES', favouriteCurrencies: persistedState.favouriteCurrencies});
      }
    }
/* 
    // TODO - check if it can be fetched using SSR
    let URL1 = "http://api.nbp.pl/api/exchangerates/tables/A/?format=json"
    let URL2 = "http://api.nbp.pl/api/exchangerates/tables/B/?format=json"

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);

    // Here we are fetching currency codes data using nbp api
    // then we are storing it in availableCodes
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

    */
  }

  addFavourite() {
    let code = this.state.inputValue.toUpperCase();

    // Validation
    if (code === 'PLN') {
      alert('It is NBP courses so PLN to PLN ? Makes no sense...')
      return
    }

    if (this.props.favouriteCurrencies.includes(code)) {
      alert('Code is already added to favourites')
      return
    }

    if (!this.props.availableCodes.includes(code)) {
      alert('This code is invalid currency code')
      return
    }

    // If validaion is success
    this.props.dispatch({ type: 'ADD_FAVOURITE', code: code})

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
        <h2>Favourite currencies:</h2>
        <div className={'favourites-wrapper'}>
          <div className={'favourites'}>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {this.props.favouriteCurrencies.map((code, index) => (
                <div className={'element'} key={index}>
                  <span className={'code'}>{ code }</span>
                  <a
                    className={'delete'}
                    onClick={ () => this.removeFavourite(code) }
                  >
                    Delete
                  </a>    
                </div>
              ))}
            </ReactCSSTransitionGroup>
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
                className={'delete-all'}
                onClick={ () => this.removeAllFavourites() }
              >
                Delete all Favourites
              </a>
            </div>
      	  </div>
        </div>
        <style jsx>{`
          .favourites-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .favourites {
            width: 300px;
            display: inline-block;
            padding: 20px;
            background: aliceblue;
            border-radius: 10px;
          }

          .input-wrapper {
            width: 100%;
            float: left;
            display: flex;
            align-items: center;
            margin: 20px 0;
          }

          .input-wrapper input {
            height: 40px;
            line-height: 40px;
            border: 0px;
            width: 100%;
            padding: 0 10px;
            font-size: 20px;
          }

          .action-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .delete-all {
            width: 100%;
            text-align: center;
            color: red;
            heght: 40px;
            line-height: 40px;
            cursor: pointer;
          }

        	.element {
        		width: 100%;
        		height: 40px;
            line-height: 40px;
        		float: left;
        	}

          .element .code {
            font-size: 24px;
          }

        	.delete {
        		float: right;
        		color: red;
            cursor: pointer;
        	}

          .example-enter {
            opacity: 0.01;
          }

          .example-enter.example-enter-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }

          .example-leave {
            opacity: 1;
          }

          .example-leave.example-leave-active {
            opacity: 0.01;
            transition: opacity 300ms ease-in;
          }
        `}</style>
      </>
    )
  }
}

export default connect(state => state)(Favourites);
