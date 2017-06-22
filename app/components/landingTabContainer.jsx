
var React = require('react');

let LoginForm = require('./loginForm.jsx');
let RegisterForm = require('./registerForm.jsx');

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

class LandingTabContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {registerPageEnabled: false};
     }

    render() {
        return (
        <div style = {containerStyle} ref={node => this.node = node} >
            <div style = {tabContainerStyle}>
                    <button className = "button" 
                        id = 'loginTab'
                        style = {(!this.state.registerPageEnabled)?activeButtonStyle:buttonStyle} 
                        onClick = {()=>{this.setState({registerPageEnabled:false});}}
                        type="">
                        Login
                    </button>
                    <button className = "button" 
                        id = 'registerTab'
                        style = {(!this.state.registerPageEnabled)?buttonStyle:activeButtonStyle} 
                        onClick = {()=>{this.setState({registerPageEnabled:true});}}
                        type="">
                        Register
                    </button>
            </div>
            <div style = {contentStyle}>
                {!this.state.registerPageEnabled && <LoginForm/>}
                {this.state.registerPageEnabled && <RegisterForm/>}
            </div>
        </div>
        );
    }
}

module.exports = LandingTabContainer;