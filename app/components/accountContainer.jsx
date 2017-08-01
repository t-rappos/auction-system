var React = require('react');
var ServerApi = require('../api/server.jsx');
let AccountView = require('./accountView.jsx');
//let AccountModify = require('./accountModify.jsx');
let ToastStore = require('./toast/toastStore.jsx');

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
        this.postSendAccountModifyRequest = this.postSendAccountModifyRequest.bind(this);
        this.postLoadData = this.postLoadData.bind(this);
        this.sendAccountModifyRequest = this.sendAccountModifyRequest.bind(this);
     }

     postSendAccountModifyRequest(res){
        if(res.error == null){
            ToastStore.push("Acount successfully modified", 5000, 'success');
            this.loadData();
        }
     }

    sendAccountModifyRequest(email, details){
        ServerApi.sendAccountModifyRequest(email, details, this.postSendAccountModifyRequest);
    }

    postLoadData(res){
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
            ToastStore.push('Account not found', 5000, 'error');
        }
    }

    loadData(){
        ServerApi.sendAccountViewRequest(this.postLoadData);
    }

    componentDidMount() {
       this.loadData();
    }

    render(){
        return (
            <div>
                <AccountView 
                    username = {this.state.username}
                    email = {this.state.email}
                    money = {this.state.money}
                    detailNames = {this.state.detailNames}
                    detailValues = {this.state.detailValues}
                    sendAccountModifyRequest = {this.sendAccountModifyRequest}
                />
            </div>
        );
    }
}

module.exports = AccountContainer;