var React = require('react');

import PropTypes from 'prop-types';

const textStyleTop = {
 padding:'10px',
 paddingBottom: '20px',
 textAlign: 'center'
};

const tdStyle = {
    backgroundColor : 'white'
};

class AccountView extends React.Component{
    constructor(props) {
        super(props);
     }
    render(){
        return (
            <div style = {{padding : '10px'}}>
                <div style = {textStyleTop}>
                    Account Details
                </div>
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
                </table>
            </div>
        );
    }
}

AccountView.propTypes = {
    username : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
    money : PropTypes.string.isRequired,
    detailNames : PropTypes.arrayOf(PropTypes.string),
    detailValues : PropTypes.arrayOf(PropTypes.string)
};

module.exports = AccountView;
