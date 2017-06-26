var React = require('react');

import PropTypes from 'prop-types';

class AccountView extends React.Component{
    constructor(props) {
        super(props);
     }
    render(){
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{this.props.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.props.email}</td>
                        </tr>
                        <tr>
                            <td>Money</td>
                            <td>{this.props.money}</td>
                        </tr>
                        {
                            this.props.detailNames.map((name, i)=>{
                                return (
                                    <tr key = {i}>
                                        <td>{name}</td>
                                        <td>{this.props.detailValues[i]}</td>
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
