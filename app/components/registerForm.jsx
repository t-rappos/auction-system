var React = require('react');
var ServerApi = require('../api/server.jsx');

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
        if(this.password.value != this.password2.value){alert('passwords do not match');return;}
        this.setState({lastResultMessage:'valid'});
        ServerApi.sendAccountCreationRequest(this.username.value, this.email.value, this.password.value)
        .then((res)=>{
            //TODO: update this to use a modal
            if(res === true){
                this.setState({lastResultMessage:'success'});
                alert('Success');
            } else {
                this.setState({lastResultMessage:String(res)});
                alert(res);
            }
            //TODO: trigger login functionality here
        })
        .catch((e)=>{
            this.setState({lastResultMessage:'fail'});
            alert('sendAccountCreationRequest error');
        });
    }

    render(){
        return (
          <div ref={node => this.node = node} id = 'registerForm'>
            <div className='expanded row' >
                <form onSubmit = {this.onSubmit.bind(this)}>
                    <input id='username' ref={(input) => this.username = input} placeholder="username" type='text'/>
                    <input id='email' ref={(input) => this.email = input} placeholder="email" type='text'/>
                    <input id='password1' ref={(input) => this.password = input} placeholder="password" type='password'/>
                    <input id='password2' ref={(input) => this.password2 = input} placeholder="re-enter password" type='password'/>
                    <button className = "button success" style = {buttonNoMarginStyle} type="submit">Register</button>
                </form>
            </div>
        </div>
        );
    }
}

module.exports = RegisterForm;