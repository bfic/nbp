import * as React from 'react';
import { connect } from "react-redux";
import { reducer } from '../store.js'
import Favourites from '../components/Favourites'
import Courses from '../components/Courses'

export class Index extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }



  componentDidMount(){}

  render() {
    return(
        <div className={'container'}>
          <Favourites />
          <Courses />
          <style jsx>{`
            .container {
              width: 100%;
              float: left;
              border: 1px solid #666;
              padding: 20px;
            }
          `}</style>
      </div>
    )
  }
}

// ten page nie jest wpiety do reduxa connectem ,bo nie ma takiej potrzeby
export default Index;
