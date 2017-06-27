
var React = require('react');
var ServerApi = require('../api/server.jsx');
let InventoryView = require('./inventoryView.jsx');


//gets account details from db
class InventoryContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {items : []};
     }

    loadData(){
        ServerApi.sendInventoryViewRequest(function(res){
                if(res.error == null){
                    this.setState({ items : res.items, 
                                    tagValues : res.tagValues,
                                    tags : res.tags});
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
               <InventoryView 
                items = {this.state.items}
                tagValues = {this.state.tagValues}
                tags = {this.state.tags}
               />
            </div>
        );
    }
}

module.exports = InventoryContainer;