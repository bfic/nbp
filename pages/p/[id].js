import React from 'react';
import axios from 'axios';

export default class Post extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  static async getInitialProps({store, isServer, pathname, query}) {
    const { id } = query;
      // Pobieramy dane z api
      return axios.get(`https://api.tvmaze.com/shows/${id}`).then((payload) => {
          // Zapisujemy showy w storze
          store.dispatch({ type: 'SET_SELECTED_SHOW', selectedShow: payload.data} ); // component will be able to read from store's state when rendered

          return {
              ...this.props,
              selectedShow: payload.data
          }; 
      });
  }


  render() {
    return(
	  <>
	    <h1>{this.props.selectedShow.name}</h1>
	    <div dangerouslySetInnerHTML={{__html: this.props.selectedShow.summary.replace(/<[/]?p>/g, '')}} />
	    <img src={this.props.selectedShow.image.medium} />
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

    	  p,div {
          list-style: none;
          margin: 5px 0;
      	font-family: 'Arial';
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }

        img {
        	margin-top: 20px;
        }
      `}</style>
	  </>)
    }
}