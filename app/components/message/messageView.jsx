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

class MessageView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open : false};
    }
    render(){
        return(
            <div style = {msgViewContentsStyle}>
                <table style = {messageViewTableStyle}>
                    <tbody>
                    <tr>
                        <td style = {labelStyle}>Title: </td>
                        <td style = {contentStyle} >
                            <h4>{this.props.title}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Sender: </td>
                        <td style = {contentStyle} >
                            <h5>{this.props.sender}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Contents: </td>
                        <td style = {contentStyle} >
                            <p>{this.props.contents}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className = 'button-group'>
                    <button className = 'success button' 
                        onClick = {()=>{
                            this.props.forceCloseModal();
                            this.props.replyCallback(this.props.messageId);
                        }}
                    >Reply</button>
                    <button onClick = {()=>{this.props.deleteMessage(this.props.messageId); this.props.forceCloseModal();}} className = 'alert button'>Delete</button>
                </div>
            </div>
        );
    }
}

MessageView.propTypes = {
    messageId : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    sender : PropTypes.number.isRequired,
    contents : PropTypes.string.isRequired,
    deleteMessage : PropTypes.func.isRequired,
    forceCloseModal : PropTypes.func.isRequired,
    replyCallback : PropTypes.func.isRequired
};

module.exports = MessageView;