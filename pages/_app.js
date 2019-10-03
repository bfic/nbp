// pages/_app.js

import React from "react";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import Layout from '../components/MyLayout';
import axios from 'axios'
import { makeStore } from '../store.js'

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {pageProps};
    }

    render() {
        // console.log(this.props.store.getState()) -> wyswiela aktualny stan store'a
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