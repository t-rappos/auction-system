var React = require('react');
var ServerApi = require('../api/server.jsx');

const buttonNoMarginStyle = {
    margin : 0,
    width : '100%'
};

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();
        if(this.username.value == null || this.username.value == '') {return;}
        if(this.password.value == null || this.password.value == '') {return;}
        ServerApi.sendUserLoginRequest(this.username.value, this.password.value)
        .then((res)=>{
            //TODO: update this to use a modal
            if(res){alert('Success');} else {alert('Incorrect username or password, please try again');}
        });
    }
    render(){
      return (
        <div ref={node => this.node = node} id = 'loginForm' >
          <div className='expanded row' >
              <form onSubmit = {this.onSubmit.bind(this)}>
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
}

module.exports = LoginForm;
