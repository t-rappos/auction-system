var React = require('react');
import PropTypes from 'prop-types';

const inputNoMarginStyle = {
    margin : 0,
    padding : 4
};

const tableDataStyle = {
    padding : 0
};

class AccountModify extends React.Component{
    constructor(props) {
        super(props);
    
        let detailNames =  [];
        let detailValues = []; 
        this.props.detailNames.map((n)=>{detailNames.push(n);});
        this.props.detailValues.map((n)=>{detailValues.push(n);});
        detailNames.push('');
        detailValues.push('');

        this.state = {detailNames : detailNames, detailValues : detailValues};
        this.detailInputs = [];
        this.detailNameInputs = [];

        this.onSubmit = this.onSubmit.bind(this);
     }

    onSubmit(e){
        e.preventDefault();
        let details = {};
        if(this.detailInputs.length > 0){
            this.state.detailNames.map((name, i)=>{
                if(this.detailNameInputs[i].value != null 
                && this.detailNameInputs[i].value != ''){
                    details[this.detailNameInputs[i].value] = this.detailInputs[i].value;
                }
            });
        }
        let email = this.email.value;
        this.props.sendAccountModifyRequest(email, details);
        setTimeout(()=>{this.props.toggleModify();}, 100);
    }

    render(){
        return (
            <div>
                <form onSubmit = {this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{this.props.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td style = {tableDataStyle}><input id='email' style = {inputNoMarginStyle}
                                ref={(input) => this.email = input} 
                                defaultValue={this.props.email} 
                                type='text'/></td>
                            </tr>
                            <tr>
                                <td>Money</td>
                                <td>{this.props.money}</td>
                            </tr>
                            {   this.state.detailNames.map((name, i)=>{
                                    return (
                                        <tr key = {i}>
                                            <td style = {tableDataStyle}>
                                                <input style = {inputNoMarginStyle}
                                                    id={'detailNameId' + i}
                                                    ref = {(input)=>{this.detailNameInputs[i] = input;}}
                                                    defaultValue = {this.state.detailNames[i]}
                                                    key = {i}
                                                    type = 'text'
                                                />
                                            </td>
                                            <td style = {tableDataStyle}>
                                                <input style = {inputNoMarginStyle}
                                                    id={'detailValueId'+i} 
                                                    ref = {(input)=>this.detailInputs[i] = input} 
                                                    defaultValue = {this.state.detailValues[i]} 
                                                    key = {i}
                                                    type = 'text'
                                                /> 
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <button className = 'button success' type="submit"> 
                            submit
                    </button>  
                </form>
            </div>
        );
    }
}

AccountModify.propTypes = {
    username : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    money : PropTypes.string.isRequired,
    detailNames : PropTypes.arrayOf(PropTypes.string),
    detailValues : PropTypes.arrayOf(PropTypes.string),
    sendAccountModifyRequest : PropTypes.func.isRequired,
    toggleModify : PropTypes.func.isRequired
};


const textStyleTop = {
 padding:'10px',
 paddingBottom: '20px',
 float: 'left'//textAlign: 'center'
};

const tdStyle = {
    backgroundColor : 'white'
};

const modidfyButtonStyle = {
    marginLeft: '100px',
    position: 'relative',
    top: '10px'
};

class AccountView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {modify : false};
        this.toggleModify = this.toggleModify.bind(this);
     }
    
     toggleModify(){
         this.setState({modify: !this.state.modify});
     }

    render(){
        return (
            <div style = {{padding : '10px'}}>
                <div style = {textStyleTop}>
                    Account Details
                </div>
                <span style = {modidfyButtonStyle}>
                    <button onClick = {()=>{this.toggleModify();}} className="fa fa-pencil-square-o" aria-hidden="true">
                    </button>
                </span>
                {this.state.modify
                ?
                    <AccountModify username = {this.props.username}
                        email = {this.props.email}
                        money = {this.props.money}
                        detailNames = {this.props.detailNames}
                        detailValues = {this.props.detailValues}
                        sendAccountModifyRequest = {this.props.sendAccountModifyRequest}
                        toggleModify = {this.toggleModify}/>
                :
                <table style = {{
                    boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
                    borderRadius: '4px'}}>
                    <tbody>
                        <tr>
                            <td style = {tdStyle}>Username</td>
                            <td style = {tdStyle}>{this.props.username}</td>
                        </tr>
                        <tr>
                            <td style = {tdStyle}>Email</td>
                            <td style = {tdStyle}>{this.props.email}</td>
                        </tr>
                        <tr>
                            <td style = {tdStyle}>Money</td>
                            <td style = {tdStyle}>{this.props.money}</td>
                        </tr>
                        {
                            this.props.detailNames.map((name, i)=>{
                                return (
                                    <tr key = {i}>
                                        <td style = {tdStyle}>{name}</td>
                                        <td style = {tdStyle}>{this.props.detailValues[i]}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>}
            </div>
        );
    }
}

AccountView.propTypes = {
    username : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    money : PropTypes.string.isRequired,
    detailNames : PropTypes.arrayOf(PropTypes.string),
    detailValues : PropTypes.arrayOf(PropTypes.string),
    sendAccountModifyRequest : PropTypes.func.isRequired
};

module.exports = AccountView;
