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

nav ul{height:200px; width:18%;}
nav ul{overflow:hidden; overflow-y:scroll;}

*/

const ChatComponentStyle = {
  float: 'right'
};

const ChatComponentListStyle = {
  overflow:'hidden',
  overflowY:'scroll',
  overflowX:'scroll',
  listStyleType: 'none',
  backgroundColor: '#DEB272',
  paddingLeft: '0pt',
  width: '80vw',
  maxWidth: '400pt',
  height: '70vh',
};

class ChatComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

  //console.log(this.props);
  //this.props.onNewMessage({author:'tom', message:'msg'});
    return (

      <div style={ChatComponentStyle}>
        <ul style={ChatComponentListStyle}>
          <li>Message : this is a message</li>
          <li>Message : this is a message</li>
          <li>Message : this is a message</li>
        </ul>
      </div>
    );
  }
}

module.exports = ChatComponent;
