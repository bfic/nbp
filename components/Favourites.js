import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { connect } from "react-redux";
import { reducer } from '../store.js';
import { loadState } from '../helpers/localStorage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SkyLight from 'react-skylight';

export class Favourites extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      errorMessage: ''
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
  }

  addFavourite() {
    let code = this.state.inputValue.toUpperCase();

    // Validation
    if (code === 'PLN') {
      this.setState({
        errorMessage: 'It is NBP courses so PLN to PLN ? Makes no sense...',
        inputValue: ''
      })
      this.refs.input.value = '';
      this.simpleDialog.show()
      return
    }

    if (this.props.favouriteCurrencies.includes(code)) {
      this.setState({
        errorMessage: 'Code is already added to favourites',
        inputValue: ''
      })
      this.refs.input.value = '';
      this.simpleDialog.show()
      return
    }

    if (!this.props.availableCodes.includes(code)) {
      this.setState({
        errorMessage: 'This code is invalid currency code',
        inputValue: ''
      })
      this.refs.input.value = '';
      this.simpleDialog.show()
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
          {typeof window !== 'undefined' && // if there is no such conditional - document is not defined 
            <SkyLight
              hideOnOverlayClicked
              ref={ref => this.simpleDialog = ref}
              title="Validation error"
            >
              <div className={'content'}>
                { this.state.errorMessage }
              </div>
              <div className={'button-wrapper'}>
                <a
                  className="close"
                  onClick={() => this.simpleDialog.hide() }
                >
                  Ok
                </a>
              </div>
            </SkyLight>
          }
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
        <style jsx global>{`
          .skylight-dialog {
            display: block;
            min-height: 100px !important;
            width: 50% !important;
            margin: 0 !important;
            left: 25% !important;
            min-width: 280px;
            top: 40vh !important;
          }

          @media only screen and (max-width: 800px) {
            .skylight-dialog {
              width: 70% !important;
              left: 15% !important;
            }
          }

          .skylight-dialog .skylight-close-button {
            top: 10px !important;
          }

          .skylight-dialog h2 {
            margin-top: 0;
            text-align: center;
            font-size: 30px;
          }

          @media only screen and (max-width: 800px) {
            .skylight-dialog h2 {
              font-size: 22px;
            }
          }

          .skylight-dialog div.content {
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 20px;
          }

          @media only screen and (max-width: 800px) {
            .skylight-dialog div.content {
              font-size: 16px;
            }
          }

          .skylight-dialog .button-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .skylight-dialog .button-wrapper a {
            height: 40px;
            line-height: 40px;
            background: #ddd;
            display: block;
            width: 200px;
            text-align: center;
            border-radius: 10px;
            color: #000;
            font-size: 20px;
            cursor: pointer;
          }
        `}</style>
      </>
    )
  }
}

export default connect(state => state)(Favourites);
