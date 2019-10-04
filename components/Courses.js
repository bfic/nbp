import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { connect } from "react-redux";
import { reducer } from '../store.js'

export class Courses extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      courses: []
    }
  }

  componentDidMount() {}

  onLoadCourses() {
    this.setState({
      loading: true,
    })
    
    let urls = []; // Array having urls to fetch
    this.props.favouriteCurrencies.map((code) => {
      urls.push('http://api.nbp.pl/api/exchangerates/rates/a/' + code + '?format=json');
    })

    /* Here we are fetching current courses of favouriteCurrencies
       and then we are storing it in courses variable, which will be populated to state */
    let courses = [];
    var promises = urls.map(url => axios.get(url));
    Promise.all(promises).then(results => {
      results.map((obj) => {
        let courseObj = {
          code: obj.data.code,
          course: obj.data.rates[0].mid
        }
        courses.push(courseObj)
      })

      this.setState({
        courses: courses,
        loading: false,
      })
    });
  }

  render() {
    let loading = undefined;
    if (this.state.loading == true || true) {
      loading = <div className={'loading'}>Loading...</div>;
    }

    return(
      <div className={'courses'}>
        <h2>NBP Courses for favourite currencies:</h2>
        <div className={'button-wrapper'}>
          <a
            className="load-courses"
            onClick={() => this.onLoadCourses() }
          >
            Load courses
          </a>
        </div>
        <div className={'courses-wrapper'}>
          {this.state.loading === true &&
            <div className={'loading'}>
              <div className={'spinner'}>
                <div className={'bounce1'}></div>
                <div className={'bounce2'}></div>
                <div className={'bounce3'}></div>
              </div>
            </div>
          }
          {this.state.loading === false && this.state.courses.length > 0 &&
            <div className={'courses-box'}>
              {this.state.courses.map((course, index) => (
                <div
                  className={'course-item'}
                  key={index}
                >
                  <div className={'code'}>{ course.code }</div>
                  <div className={'course'}>{ course.course }</div> 
                </div>
              ))}
            </div>
          }
        </div>
        <style jsx>{`
          .courses {
            width: 100%;
            font-family: Arial;
          }

          .button-wrapper {
            width: 100%;
            float: left;
            margin-bottom: 20px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }

          .load-courses {
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

          .courses-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-flow: row;
          }

          .loading {
            margin: 0 auto;
          }

          .courses-box {
            width: 300px;
            display: inline-block;
            padding: 20px;
            background: aliceblue;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .course-item {
            width: 100%;
            height: 40px;
            line-height: 40px;
            float: left;
          }

          .course-item .code {
            width: 50%;
            text-align: left;
            float: left;
            font-size: 24px;
          }

          .course-item .course {
            width: 50%;
            text-align: right;
            float: left;
            font-size: 24px;
          }

          .spinner {
            margin: 0px auto 0;
            width: 70px;
            text-align: center;
          }

          .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #333;

            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
          }

          .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }

          .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }

          @-webkit-keyframes sk-bouncedelay {
            0%, 80%, 100% { -webkit-transform: scale(0) }
            40% { -webkit-transform: scale(1.0) }
          }

          @keyframes sk-bouncedelay {
            0%, 80%, 100% { 
              -webkit-transform: scale(0);
              transform: scale(0);
            } 40% { 
              -webkit-transform: scale(1.0);
              transform: scale(1.0);
            }
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => state)(Courses);
