
var React = require('react');
var ServerApi = require('../api/server.jsx');
let InventoryView = require('./inventoryView.jsx');
let ItemView = require('./itemView.jsx');
let ItemFormContainer = require("./itemFormContainer.jsx");
let TabContainer = require('./tabContainer.jsx').TabContainer;
let Tab = require('./tabContainer.jsx').Tab;

//gets account details from db
class InventoryContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {items : [], 
            tags : [],
            tagValues : [],
            images : [],
            selectedItem : null,
            selectedItemTagNames : null,
            selectedItemTagValues : null,
            selectedItemImageUrl : null
        };
     }


    updateSelectedItemData(selectedItem){
        let url = this.state.images.find((im)=>{return im.id === selectedItem.imageId;}).url;
        let tagNames = [];
        let tagValues = [];
        this.state.tagValues
        .filter((tv)=>{
            return tv.itemId === selectedItem.id;
        })
        .map((tv)=>{
            tagNames.push(this.state.tags[tv.tagId-1].name);
            tagValues.push(tv.value);
        });
        this.setState({selectedItemImageUrl : url,
            selectedItemTagNames : tagNames,
            selectedItemTagValues : tagValues,
            selectedItem : selectedItem
        });
    }

    selectItem(itemId){
        let selectedItem = this.state.items.find((i)=>{return i.id == itemId;});
        this.updateSelectedItemData(selectedItem);
    }

    loadData(){
        ServerApi.sendInventoryViewRequest(function(res){
                if(res.error == null){
                    this.setState({ items : res.items, 
                                    tagValues : res.tagValues,
                                    tags : res.tags,
                                    images : res.images});
                } else {
                    alert('Account not found');
                }
            }.bind(this));
    }

    componentDidMount() {
       this.loadData();
    }

    render(){

        let itemView = null;
        if(this.state.selectedItem){
            itemView = <ItemView
                            description = {this.state.selectedItem.description}
                            name = {this.state.selectedItem.name}
                            imageUrl = {this.state.selectedItemImageUrl}
                            tagNames = {this.state.selectedItemTagNames}
                            tagValues = {this.state.selectedItemTagValues}
                        />;
        } else {
            itemView = <p>No item selected</p>;
        }

        return (
            <div className = 'row'>
                <div className = 'small-6 columns'>
                    <TabContainer>
                        <Tab name = 'Item Details'>{itemView}</Tab>
                        <Tab name = 'Create Item'><ItemFormContainer/></Tab>
                    </TabContainer>
                </div>
                <div className = 'small-6 columns'>
                    <InventoryView
                        selectItem = {this.selectItem.bind(this)}
                        items = {this.state.items}
                        tagValues = {this.state.tagValues}
                        tags = {this.state.tags}
                    />
               </div>
            </div>
        );
    }
}

module.exports = InventoryContainer;