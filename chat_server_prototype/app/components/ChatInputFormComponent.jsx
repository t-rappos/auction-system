var React = require('react');

const ChatInputFormComponentStyle =
{
    paddingLeft: '0pt',
    width: '80vw',
    maxWidth: '400pt',
};

const ChatInputFormComponentFormStyle =
{
  width: '80vw',
};

class ChatInputFormComponent  extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div style = {ChatInputFormComponentStyle}>
        <form style = {ChatInputFormComponentFormStyle}>
          <input size="90" type="text" placeholder="Enter messages here!"></input>
        </form>
      </div>
    );
  }
}

module.exports = ChatInputFormComponent;
