var React = require('react');

const textStyleTop = {
 paddingBottom: '20px'
};

class AccountView extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div style = {{padding : '10px', maxWidth: '500px'}}>
                <h5 style = {textStyleTop}>
                    <i className="fa fa-question-circle" aria-hidden="true" /> About this website
                </h5>
                <div>
                    The purpose of this project is to gain experience using and integrating different software technologies. 
                    An auction listing system would be an appropriate candidate as it requires development of user interfaces, server back-ends and database functionality.
                </div>
                <br/>
                <div>
                    Features include:
                    <ul>
                        <li>Users can list items (user created) on an online auction website for sale for other users to either buyout or bid on</li>
                        <li>Users can search for listed items</li>
                        <li>Once an item is successfully purchased, it is placed in the buyers personal inventory</li>
                        <li>The user can view their own inventory, listed items, and items they have bidded on</li>
                        <li>Items can be inspected</li>
                        <li>Users can send messages to other users</li>
                        <li>The website supports mobile devices and is responsive</li>
                        <li>Users are notified in real-time when events occur such as a successful bid or having an item sold</li>
                        <li>Check out the <a href ='https://github.com/t-rappos/auction-system/'>github page</a> for source code and further explanation </li>
                    </ul>
                </div>
            </div>
        );
    }
}


module.exports = AccountView;
