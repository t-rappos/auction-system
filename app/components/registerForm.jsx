var React = require('react');
var ServerApi = require('../api/server.jsx');

const buttonNoMarginStyle = {
    margin : 0,
    width : '100%'
};

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
    }

    onSubmit(e){
        e.preventDefault();
        if(this.username.value == null || this.username.value == '') {return;}
        if(this.password.value == null || this.password.value == '') {return;}
        if(this.email.value == null || this.email.value == '') {return;}
        if(this.password.value != this.password2.value){alert('passwords do not match');return;}
        ServerApi.sendAccountCreationRequest(this.username.value, this.email.value, this.password.value)
        .then((res)=>{
            //TODO: update this to use a modal
            if(res === true){alert('Success');} else {alert(res);}
            //TODO: trigger login functionality here
        })
        .catch((e)=>{
            alert('sendAccountCreationRequest error');
        });
    }

    render(){
        return (
          <div ref={node => this.node = node} id = 'registerForm'>
            <div className='expanded row' >
                <form onSubmit = {this.onSubmit.bind(this)}>
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
}

module.exports = RegisterForm;