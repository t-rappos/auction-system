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


const OnlineUsersListComponentListStyle = {
  overflowY:'scroll',
  overflowX:'scroll',
  listStyleType: 'none',
  backgroundColor: '#DEB272',
  paddingLeft: '0pt',
  maxWidth: '200pt',
  minWidth: '100pt',
  height: '70vh',
};


const OnlineUsersListComponentStyle = {

}

const OnlineUsersListComponentListItemStype = {
  backgroundColor: '#AE92A2'
}

class OnlineUsersListComponent  extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style={OnlineUsersListComponentStyle}>
        <ul style={OnlineUsersListComponentListStyle}>
          <li style={OnlineUsersListComponentListItemStype}>Alimintor8</li>
          <li style={OnlineUsersListComponentListItemStype}>Jeb</li>
          <li style={OnlineUsersListComponentListItemStype}>Duck</li>
        </ul>
      </div>
    );
  }
}

module.exports = OnlineUsersListComponent;
