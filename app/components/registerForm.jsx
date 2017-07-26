var React = require('react');
var ServerApi = require('../api/server.jsx');
import PropTypes from 'prop-types';
let ToastStore = require('./toast/toastStore.jsx');

const buttonNoMarginStyle = {
    margin : 0,
    width : '100%'
};

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {lastResultMessage: ''};
    }

    onSubmit(e){
        e.preventDefault();
        if(this.username.value == null || this.username.value == '') {return;}
        if(this.password.value == null || this.password.value == '') {return;}
        if(this.email.value == null || this.email.value == '') {return;}
        if(this.password.value != this.password2.value){ToastStore.push('passwords do not match', 5000, 'error');return;}
        this.setState({lastResultMessage:'valid'});
        ServerApi.sendAccountCreationRequest(this.username.value, this.email.value, this.password.value)
        .then((res)=>{
            //TODO: update this to use a modal
            if(res === true){
                this.setState({lastResultMessage:'success'});
                ToastStore.push('Registration successful', 5000, 'success');
                this.props.switchTab(0);
            } else {
                this.setState({lastResultMessage:String(res)});
                ToastStore.push(res, 5000, 'error');
            }
            //TODO: trigger login functionality here
        })
        .catch((e)=>{
            this.setState({lastResultMessage:'fail'});
            ToastStore.push('sendAccountCreationRequest error', 5000, 'error');
        });
    }

    render(){
        return (
          <div ref={node => this.node = node} id = 'registerForm'>
            <div className='expanded row' >
                <form onSubmit = {this.onSubmit.bind(this)}>
                    <label>Username<input id='username' ref={(input) => this.username = input}  type='text'/></label>
                    <label>Email<input id='email' ref={(input) => this.email = input}  type='text'/></label>
                    <label>Password<input id='password1' ref={(input) => this.password = input}  type='password'/></label>
                    <label>Re-enter Password<input id='password2' ref={(input) => this.password2 = input}  type='password'/></label>
                    <button className = "button success" style = {buttonNoMarginStyle} type="submit">Register</button>
                </form>
            </div>
        </div>
        );
    }
}

RegisterForm.propTypes = {
    switchTab : PropTypes.func
};

module.exports = RegisterForm;