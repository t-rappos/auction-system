
var React = require('react');
var TabContainer = require('./tabContainer.jsx').TabContainer;
var Tab = require('./tabContainer.jsx').Tab;
var ServerApi = require('../api/server.jsx');
let AccountView = require('./accountView.jsx');
let AccountModify = require('./accountModify.jsx');
let InventoryContainer = require('./inventoryContainer.jsx');
let MessageContainer = require('./message/messageContainer.jsx');

//gets account details from db
class AccountContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            username : '', 
            email : '', 
            details : '', 
            money : '',
            detailNames : [],
            detailValues : []
        });
     }

    sendAccountModifyRequest(email, details){
        ServerApi.sendAccountModifyRequest(email, details ,function(res){
            if(res.error == null){
                alert("Success");
                this.loadData();
            }
        }.bind(this));
    }

    loadData(){
        ServerApi.sendAccountViewRequest(function(res){
                if(res.error == null){
                    let dn = [];
                    let dv = [];
                    if(res.details !== null){
                        Object.keys(res.details).map((key)=>{
                            dn.push(key);
                            dv.push(res.details[key]);
                        });
                    }
                    this.setState({
                        username : res.username,
                        email : res.email, 
                        details : res.details,
                        money : String(res.money),
                        detailNames : dn,
                        detailValues : dv
                    });
                } else {
                    alert('Account not found');
                }
            }.bind(this));
    }

    componentDidMount() {
       this.loadData();
    }

    render(){
        return (
            <div>
                <TabContainer>
                    <Tab name = 'View'>
                        <AccountView 
                            username = {this.state.username}
                            email = {this.state.email}
                            money = {this.state.money}
                            detailNames = {this.state.detailNames}
                            detailValues = {this.state.detailValues}
                        />
                    </Tab>
                    <Tab name = 'Modify'>
                        <AccountModify
                            username = {this.state.username}
                            email = {this.state.email}
                            money = {this.state.money}
                            detailNames = {this.state.detailNames}
                            detailValues = {this.state.detailValues}
                            sendAccountModifyRequest = {this.sendAccountModifyRequest.bind(this)}
                        />
                    </Tab>
                </TabContainer>
                <InventoryContainer/>
                <MessageContainer/>
            </div>
        );
    }
}

module.exports = AccountContainer;