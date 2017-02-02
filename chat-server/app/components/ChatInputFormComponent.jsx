var React = require('react');

const ChatInputFormComponentStyle =
{
};

const ChatInputFormComponentFormStyle =
{
};

class ChatInputFormComponent  extends React.Component {
  constructor(props){
    if (!props.sendMessageToServer || typeof(props.sendMessageToServer)!='function'){
      throw new Error('ChatInputFormComponent : Required function as prop');
    }
    super(props);
  }

  onSubmit(e){
    if(this.props.user){
      if (this.input.value !== ''
      && this.input.value !== undefined){
        this.props.sendMessageToServer(this.props.user, this.input.value);
        this.input.value = '';
      }
    } else {
      alert('Please select a username before you comment');
    }
    e.preventDefault();
  }

  render(){
    return (
      <div ref={node => this.node = node} style = {ChatInputFormComponentStyle}>
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

ChatInputFormComponent.propTypes = {
  user : React.PropTypes.string.isRequired,
  sendMessageToServer : React.PropTypes.func.isRequired
};

module.exports = ChatInputFormComponent;
