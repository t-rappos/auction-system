var React = require('react');
import PropTypes from 'prop-types';

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
        console.log("Message Form Props: ", props);
        //if(!this.props.title){this.props.title = "";}
        //if(!this.props.sender){this.props.sender = "";}
        //if(!this.props.contents){this.props.contents = "";}
        this.state = {open : false};
    }

     onSubmit(e){
         e.preventDefault();
     }

    sendMessage(){
       this.props.sendMessage(this.recipient.value, this.title.value, this.contents.value);
       this.props.forceCloseModal();
    }

    render(){
        console.log('messageForm : render : props :', this.props);
        return(
            <div style = {msgViewContentsStyle}>
                <form onSubmit = {this.onSubmit.bind(this)}>
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
                        <td style = {labelStyle}>Sender: </td>
                        <td style = {contentStyle} >
                            <input defaultValue = {this.props.sender!=-1?this.props.sender:''}
                                    type = 'text' 
                                    ref={(input) => this.recipient = input}/>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Contents: </td>
                        <td style = {contentStyle} >
                            <textarea  rows="4" cols="50" defaultValue = {this.props.contents?('----\n'+this.props.contents):''} 
                                    ref={(textarea) => this.contents = textarea}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </form>
                <div className = 'button-group'>
                    <button className = 'success button' 
                            onClick = {this.sendMessage.bind(this)}
                    >Send</button>
                    <button onClick = {()=>{this.props.forceCloseModal();}} className = 'alert button'>Discard</button>
                </div>
            </div>
        );
    }
}

MessageForm.propTypes = {
    title : PropTypes.string.isRequired,
    sender : PropTypes.number.isRequired,
    contents : PropTypes.string.isRequired,
    forceCloseModal : PropTypes.func.isRequired,
    sendMessage : PropTypes.func.isRequired,
};

module.exports = MessageForm;