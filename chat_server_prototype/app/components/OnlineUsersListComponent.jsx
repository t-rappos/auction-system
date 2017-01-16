var React = require('react');

/*
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}

<div style="width: 100%; overflow: hidden;">
    <div style="width: 600px; float: left;"> Left </div>
    <div style="margin-left: 620px;"> Right </div>
</div>

*/

const OnlineUsersListComponentStyle = {

}


class OnlineUsersListComponent  extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={OnlineUsersListComponentStyle}><p>|user list|</p></div>
    );
  }
}

module.exports = OnlineUsersListComponent;
