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
    if (!props.sendMessageToServer || typeof(props.sendMessageToServer)!='function'){
      throw new Error('ChatInputFormComponent : Required function as prop');
    }
    super(props);
  }

  onSubmit(e){
    if(this.props.user){
      if (this.input.value !== ''
      && this.input.value !== undefined){
        console.log(typeof(this.props.user), this.props.user.length, this.props.user);
        console.log("Called onSubmit,user:"+this.props.user+"type:" + typeof(this.input.value)+ " value :"+this.input.value);
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

ChatInputFormComponent.propTypes = {
  user : React.PropTypes.string.isRequired,
  sendMessageToServer : React.PropTypes.func.isRequired
};

module.exports = ChatInputFormComponent;
