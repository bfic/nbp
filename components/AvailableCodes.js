import React from 'react';

export class AvailableCodes extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return(
      <div className={'available-codes'}>
        <h2>Available codes:</h2>
        <div className={'available-codes-wrapper'}>
          {this.props.availableCodes.length > 0 &&
            <div className={'available-codes-box'}>
              {this.props.availableCodes.map((code, index) => (
                <div
                  className={'available-code-item'}
                  key={index}
                >
                  <div className={'code'}>{ code }
                  {index != this.props.availableCodes.length-1 &&
                    <span>,</span>
                  }
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        <style jsx>{`
          .available-codes {
            width: 100%;
            font-family: Arial;
          }

          .available-codes-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-flow: row;
          }

          .available-codes-box {
            width: 100%;
            display: inline-block;
            padding: 20px;
            background: aliceblue;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .available-code-item {
            height: 30px;
            line-height: 30px;
            float: left;
            margin-left: 5px;
            margin-right: 5px;
            font-size: 22px;
          }
        `}</style>
      </div>
    )
  }
}

export default AvailableCodes;
