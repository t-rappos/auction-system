var React = require('react');
var ServerApi = require('../api/server.jsx');
let ToastStore = require('./toast/toastStore.jsx');
import { browserHistory } from 'react-router';
let Router = require('react-router');
let Link = Router.Link;

const buttonNoMarginStyle = {
    margin : 0,
    width: '50%',
    borderRadius: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '25px',
    display: 'block'
};

const loginFormStyle = {
    padding : '10px',
    borderRadius : '5px',
    background : 'white',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.1)',
    marginTop: '2vh'
};

const textStyleTop = {
 padding:'10px',
 paddingBottom: '20px',
 textAlign: 'center'
};

const textStyle = {
 fontSize:'0.8em',
 paddingTop: '10px'
};

const inputStyles = {
    maxWidth: '180px',    
    marginLeft: 'auto',
    marginRight: 'auto'
};


class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {lastResultMessage: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onSkip = this.onSkip.bind(this);
    }

    sendDetails(username, email, password, callback){
        ServerApi.sendAccountCreationRequest(username,email, password)
        .then((res)=>{
            //TODO: update this to use a modal
            if(res === true){
                this.setState({lastResultMessage:'success'});
                ToastStore.push('Registration successful', 5000, 'success');
                if(callback !== undefined){
                    callback();
                }else{
                    browserHistory.push('/');
                }
                
            } else {
                this.setState({lastResultMessage:String(res)});
                if(username === 'Guest'){
                    callback();
                }else{
                    ToastStore.push(res, 5000, 'error');
                }
                
            }
            //TODO: trigger login functionality here
        })
        .catch((e)=>{
            if(username === 'Guest'){
                callback();
            }else{
                this.setState({lastResultMessage:'fail'});
                ToastStore.push('sendAccountCreationRequest error', 5000, 'error');
            }
        });
    }

    onSkip(){
        let guestUsername = 'Guest';
        this.setState({lastResultMessage:'valid'});
        this.sendDetails(guestUsername, 'fixme@email.com', guestUsername, ()=>{
            ServerApi.sendUserLoginRequest(guestUsername, guestUsername)
            .then((res)=>{
                browserHistory.push('/account');
            })
            .catch((e)=>{
                ToastStore.push('onSkip error', 5000, 'error');
            });
        });
    }
    onSubmit(e){
        e.preventDefault();
        if(this.username.value == null || this.username.value == '') {return;}
        //if(this.password.value == null || this.password.value == '') {return;}
        //if(this.email.value == null || this.email.value == '') {return;}
        //if(this.password.value != this.password2.value){ToastStore.push('passwords do not match', 5000, 'error');return;}
        this.setState({lastResultMessage:'valid'});
        this.sendDetails(this.username.value, 'fixme@email.com', this.username.value);
    }

    render(){
        return (
          <div ref={node => this.node = node} id = 'registerForm' style={loginFormStyle}>
            <div className='expanded row' >
                <form onSubmit = {this.onSubmit}>
                    <div style = {textStyleTop}>
                        Select a username
                    </div>
                    <div style = {inputStyles}>
                        <input id='username' placeholder = 'Username' ref={(input) => this.username = input}  type='text'/>
                       
                    </div>
                    <div className = 'button-group'>
                        <button className = "button success" style = {buttonNoMarginStyle} type="submit">Register</button>
                    </div>
                </form>
                <div style = {textStyle}>
                    <Link to="/" style = {{clear: 'left'}}><span>Back</span></Link>
                    <Link to="/" onClick = {this.onSkip} style = {{float: 'right'}}><span>Skip</span></Link>
                </div>
            </div>
        </div>
        );
    }
}

module.exports = RegisterForm;

/* <input id='email'  placeholder = 'Email' ref={(input) => this.email = input}  type='text'/>
                        <input id='password1'  placeholder = 'Password' ref={(input) => this.password = input}  type='password'/>
                        <input id='password2'  placeholder = 'Please re-enter password' ref={(input) => this.password2 = input}  type='password'/> */