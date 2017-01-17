var React = require('react');
var ServerApi = require('ServerAPI');

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

  onSubmit(e){
    if(this.props.user !== '')
    {
      console.log('ChatInput: message entered: ', this.input.value);
      ServerApi.sendMessage(this.props.user, this.input.value);
      this.input.value = '';
    }
    else
    {
      alert('Please select a username before you comment');
    }
    e.preventDefault();
  }

  render(){
    return (
      <div style = {ChatInputFormComponentStyle}>
        <form style = {ChatInputFormComponentFormStyle}
              onSubmit= {this.onSubmit.bind(this)}>
          <input size="90"
            type="text"
            ref={(input) => this.input = input}
            placeholder="Enter messages here!"
            disabled = {this.props.user === ''}></input>
        </form>
      </div>
    );
  }
}

module.exports = ChatInputFormComponent;
