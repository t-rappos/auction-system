import React from 'react';
let Toast = require('./toast.jsx');
let ToastStore = require('./toastStore.jsx');

const ToastContainerStyle = {
  position : 'fixed',
  bottom : '2%',
  right : '2%',
  zIndex : '10'
};

class ToastContainer extends React.Component{
  
  constructor(props){
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount(){
    ToastStore.setUpdateCallback(this.updateState);
  }

  updateState()/* : any*/{
    this.forceUpdate();
  }

  render() {
    let data = ToastStore.getData();
    let toast = null;
    if(data.length > 0)
    {
      toast = data.slice(0).reverse().map((d)=>{
          return <Toast data={d} key = {d.id}/>;
        });
    }
      
        return (
            <div style  = {ToastContainerStyle}>
                {toast}
            </div>
        );
    }
}

module.exports = ToastContainer;