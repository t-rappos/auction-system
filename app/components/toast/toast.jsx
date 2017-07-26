import React from 'react';
import PropTypes from 'prop-types';

const toastIntroStyle = {
  transition : 'opacity 0.5s',
  color : 'white',
  opacity: '1'
};

const toastOutroStyle = {
  transition : 'opacity 0.5s',
  opacity: 0,
  color : 'white'
};

//type ToastProps = {
//  data : ToastData
//};

class Toast extends React.Component{
  //timeout : number;
  //props : ToastProps;
  //state : {
  //  style : {}
  //};

  constructor(props /*: ToastProps*/){
    super(props);
    this.state = {style : toastIntroStyle};
  }

  switchStyle(){
    this.setState({style : toastOutroStyle});
  }

  componentDidMount(){
    this.timeout = setTimeout(this.switchStyle.bind(this), this.props.data.time-500);
  }
  
  componentWillUnmount(){
    clearTimeout(this.timeout);
  }

  getStyle(type){

    const updateStyle= '#00A3CC';
    const warningStyle ='#E89800';
    const errorStyle =  'red';
    const successStyle = '#01BD2E';

    let color = null;
    switch(type){
      case 'update':  color = updateStyle; break;
      case 'warning': color = warningStyle; break;
      case 'error': color = errorStyle; break;
      case 'success': color = successStyle; break;
      default : color = null; break;
    }

    return {
      transition: 'all .2s ease',
      position: 'relative',
      display: 'table',
      width: '300px',
      margin: '5px auto 0',
      padding: '20px',
      backgroundColor : color
    };
  }

  render(){
      let style = this.getStyle(this.props.data.type);
      return (<div style = {this.state.style}><div style = {style}>{this.props.data.msg}</div></div>);
  }
}

Toast.propTypes = {
  data : PropTypes.object
};

module.exports = Toast;