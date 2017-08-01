var React = require('react');
import PropTypes from 'prop-types';
let ToastStore = require('../toast/toastStore.jsx');

//TODO style the table
const labelStyle = {
};

const contentStyle = {
};

const messageViewTableStyle = {
};

const msgViewContentsStyle = {
    float : 'left'
};

class MessageForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {recipientId : null};
        this.recipientOnBlur = this.recipientOnBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
    }

    validateRecipient(username){
        this.props.getAccountId(username,(id)=>{
            this.setState({recipientId : id});
        });
    }

    sendMessage(){
        if(this.state.recipientId != null){
            this.props.sendMessage(this.state.recipientId, this.title.value, this.contents.value);
            this.props.forceCloseModal();
        } else {
            ToastStore.push("Username " + this.recipient.value + " doesn't exist!", 5000, 'error');
        }
        /*
        this.props.getAccountId(this.recipient.value,(id)=>{
            if(id != null){
                this.props.sendMessage(id, this.title.value, this.contents.value);
                this.props.forceCloseModal();
            } else {
                ToastStore.push("Username " + this.recipient.value + " doesn't exist!");
            }
        });
        */
    }

    recipientOnBlur(e){
        this.validateRecipient(this.recipient.value);
    }

    componentDidMount() {
       this.recipient.onblur = this.recipientOnBlur;
       if(this.recipient.value && this.recipient.value != ''){
            this.validateRecipient(this.recipient.value);
       }
    }

    render(){

        let recipientStatus = this.state.recipientId != null 
        ? <p>✔</p>
        : <p>x</p>;

        return(
            <div style = {msgViewContentsStyle}>
                <form onSubmit = {this.onSubmit}>
                <table style = {messageViewTableStyle}>
                    <tbody>
                    <tr>
                        <td style = {labelStyle}>Title: </td>
                        <td style = {contentStyle} >
                            <input defaultValue = {this.props.title} 
                                    type = 'text' 
                                    ref={(input) => this.title = input}/>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Recipient: </td>
                        <td style = {contentStyle} >
                            <span>
                            <input defaultValue = {this.props.sender}
                                    type = 'text' 
                                    ref={(input) => this.recipient = input}/>
                            {recipientStatus}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Contents: </td>
                        <td style = {contentStyle} >
                            <textarea  rows="4" cols="10" defaultValue = {this.props.contents?('----\n'+this.props.contents):''} 
                                    ref={(textarea) => this.contents = textarea}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </form>
                <div className = 'button-group'>
                    <button className = 'success button' 
                            onClick = {this.sendMessage}
                    >Send</button>
                    <button onClick = {()=>{this.props.forceCloseModal();}} className = 'alert button'>Discard</button>
                </div>
            </div>
        );
    }
}

MessageForm.propTypes = {
    title : PropTypes.string.isRequired,
    sender : PropTypes.string.isRequired,
    contents : PropTypes.string.isRequired,
    forceCloseModal : PropTypes.func.isRequired,
    sendMessage : PropTypes.func.isRequired,
    getAccountId : PropTypes.func.isRequired,
};

module.exports = MessageForm;