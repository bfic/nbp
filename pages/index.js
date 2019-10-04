import * as React from 'react';
import { connect } from "react-redux";
import { reducer } from '../store.js';
import AvailableCodes from '../components/AvailableCodes';
import Favourites from '../components/Favourites';
import Courses from '../components/Courses';
import axios from 'axios';

export class Index extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  static async getInitialProps({store, isServer, pathname, query}) {
    // This codes are fetched during SSR (before initial render)
    // and passed as props to Favourits component
    let URL1 = "http://api.nbp.pl/api/exchangerates/tables/A/?format=json"
    // let URL2 = "http://api.nbp.pl/api/exchangerates/tables/B/?format=json"

    const promise1 = axios.get(URL1);
    // const promise2 = axios.get(URL2);

    // Here we are fetching currency codes data using nbp api
    // then we are storing it in availableCodes
    const availableCodes = [];
    return Promise.all([promise1]).then((values) => {
      
      values.map((o, i) => {
        o.data[0].rates.map(rate => {
          availableCodes.push(rate.code)
        })
      });

      return {
        ...this.props,
        availableCodes: availableCodes
      }; 
    });
  }

  render() {
    return(
        <div className={'container'}>
          <h1>NBP Favourite Courses App</h1>
          <AvailableCodes availableCodes={this.props.availableCodes} />
          <Favourites />
          <Courses />
          <style jsx>{`
            .container {
              width: 100%;
              float: left;
              padding: 20px;
            }
          `}</style>
      </div>
    )
  }
}

// ten page nie jest wpiety do reduxa connectem ,bo nie ma takiej potrzeby
export default Index;
