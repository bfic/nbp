import React from "react";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import Layout from '../components/MyLayout';
import axios from 'axios'
import { makeStore } from '../store.js'

class MyApp extends App {

  render() {
    const {Component, pageProps, store} = this.props;
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }

}

export default withRedux(makeStore)(MyApp); 