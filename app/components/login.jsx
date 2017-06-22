var React = require('react');
var ServerApi = require('../api/server.jsx');

const containerStyle = {
    maxWidth : 250,
    margin : 30
};

const tabContainerStyle = {
    display : 'flex',
    borderStyle: 'solid',
    borderWidth: 1
};

const contentStyle = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightGrey',
    padding: '6px',
    paddingTop: '16px'
};

const buttonStyle = {
    backgroundColor: '#e6e6e6',
    margin : 0,
    color: 'black'
};

const activeButtonStyle = {
    margin : 0
};

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {registerPageEnabled: false};
     }

    render() {
        return (
        <div style = {containerStyle}>
            <div style = {tabContainerStyle}>
                    <button className = "button" 
                        style = {(!this.state.registerPageEnabled)?activeButtonStyle:buttonStyle} 
                        onClick = {()=>{this.setState({registerPageEnabled:false});}}
                        type="">
                        Login
                    </button>
                    <button className = "button" 
                        style = {(!this.state.registerPageEnabled)?buttonStyle:activeButtonStyle} 
                        onClick = {()=>{this.setState({registerPageEnabled:true});}}
                        type="">
                        Register
                    </button>
            </div>
            <div style = {contentStyle}>
                {!this.state.registerPageEnabled && <LoginPage/>}
                {this.state.registerPageEnabled && <RegisterPage/>}
            </div>
        </div>
        );
    }
}

const buttonNoMarginStyle = {
    margin : 0,
    width : '100%'
};

var RegisterPage = React.createClass({
  onSubmit : function(e){
    e.preventDefault();
    console.log('create page pressed');
    if(this.username.value == null || this.username.value == '') {return;}
    if(this.password.value == null || this.password.value == '') {return;}
    if(this.email.value == null || this.email.value == '') {return;}
    if(this.password.value != this.password2.value){alert('passwords do not match');return;}
    ServerApi.sendAccountCreationRequest(this.username.value, this.email.value, this.password.value)
    .then((res)=>{
        //TODO: update this to use a modal
        if(res === true){alert('Success');} else {alert(res);}
    })
    .catch((e)=>{
        console.log(e);
    });
  },
  render: function(){
    return (
      <div ref={node => this.node = node}>
        <div className='expanded row' >
            <form onSubmit = {this.onSubmit}>
                <input ref={(input) => this.username = input} placeholder="username" type='text'/>
                <input ref={(input) => this.email = input} placeholder="email" type='text'/>
                <input ref={(input) => this.password = input} placeholder="password" type='password'/>
                <input ref={(input) => this.password2 = input} placeholder="re-enter password" type='password'/>
                <button className = "button success" style = {buttonNoMarginStyle} type="submit">Register</button>
            </form>
        </div>
    </div>
    );
  }
});

var LoginPage = React.createClass({

  onSubmit : function(e){
    e.preventDefault();
    if(this.username.value == null || this.username.value == '') {return;}
    if(this.password.value == null || this.password.value == '') {return;}
    ServerApi.sendUserLoginRequest(this.username.value, this.password.value)
    .then((res)=>{
        //TODO: update this to use a modal
        if(res){alert('Success');} else {alert('Incorrect username or password, please try again');}
    });
  },
  render: function(){
    return (
      <div ref={node => this.node = node}>
        <div className='expanded row' >
            <form onSubmit = {this.onSubmit}>
                <input placeholder="username" type='text'
                    ref={(input) => this.username = input}/>
                <input placeholder="password" type='password'
                    ref={(input) => this.password = input}/>
                <button className = "button success" style = {buttonNoMarginStyle} type="submit">Login</button>
            </form>
        </div>
    </div>
    );
  }
});

module.exports = Login;
