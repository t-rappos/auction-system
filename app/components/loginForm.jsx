var React = require('react');
var ServerApi = require('../api/server.jsx');
import { browserHistory } from 'react-router';
let ToastStore = require('./toast/toastStore.jsx');

const buttonNoMarginStyle = {
    margin : 0,
    width : '100%'
};

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {lastResultMessage: ''};
    }
    
    componentDidMount(){
        let callback = (res)=>{
            if(res){
                if(res.error == null){
                    this.setState({lastResultMessage:'logged in'});
                    browserHistory.push('/account');
                }
            }
        };
        ServerApi.sendUserCheckLoggedInRequest(callback);   
    }

    onSubmit(e){
        e.preventDefault();
        if(this.username.value == null || this.username.value == '') {
            this.setState({lastResultMessage:'invalid'});
            return;
        }
        if(this.password.value == null || this.password.value == '') {
            this.setState({lastResultMessage:'invalid'});
            return;
        }
        this.setState({lastResultMessage:'valid'});
        ServerApi.sendUserLoginRequest(this.username.value, this.password.value)
        .then((res)=>{
            //TODO: update this to use a modal
            //{passwordValid : passwordValid, alreadyLoggedIn : alreadyLoggedIn}
            if(res.passwordValid){
                this.setState({lastResultMessage:'logged in'});
                browserHistory.push('/account');
            } else {
                if(res.alreadyLoggedIn){
                    this.setState({lastResultMessage:'failed login'});
                    ToastStore.push('Already logged in, please log out!', 5000, 'error');
                } else {
                    this.setState({lastResultMessage:'failed login'});
                    ToastStore.push('Incorrect username or password, please try again', 5000, 'error');
                }
            }
        });
    }
    render(){
      return (
        <div ref={node => this.node = node} id = 'loginForm' >
          <div className='expanded row' >
              <form onSubmit = {this.onSubmit.bind(this)}>
                <label> Username
                  <input id='username' type='text'
                      ref={(input) => this.username = input}/>
                </label>
                <label> Password
                  <input id='password' type='password'
                      ref={(input) => this.password = input}/>
                </label>
                  <button className = "button success" style = {buttonNoMarginStyle} type="submit">Login</button>
              </form>
          </div>
      </div>
      );
    }
}

module.exports = LoginForm;
