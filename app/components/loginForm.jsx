var React = require('react');
var ServerApi = require('../api/server.jsx');
import { browserHistory } from 'react-router';
let ToastStore = require('./toast/toastStore.jsx');
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
 paddingTop: '10px',
 textAlign: 'center'
};

const inputStyles = {
    maxWidth: '180px',    
    marginLeft: 'auto',
    marginRight: 'auto'
};

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {lastResultMessage: ''};
        this.onSubmit = this.onSubmit.bind(this);
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
        <div ref={node => this.node = node} id = 'loginForm' style={loginFormStyle}>
          <div className='expanded row' >
              <form onSubmit = {this.onSubmit}>
                <div style = {textStyleTop}>
                    Login to Auction System
                </div>
                <div style = {inputStyles}>
                  <input id='username' type='text' placeholder = 'Username'
                      ref={(input) => this.username = input}/>


                  <input id='password' type='password' placeholder = "Password"
                      ref={(input) => this.password = input}/>
                </div>
                  <button className = "button success" style = {buttonNoMarginStyle} type="submit">Login</button>
              </form>
              <div style = {textStyle}>
                  
              Don't have an account? <Link to="/register"><span>Sign Up</span></Link>
              </div>
          </div>
      </div>
      );
    }
}

module.exports = LoginForm;
