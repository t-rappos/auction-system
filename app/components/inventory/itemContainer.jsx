var React = require('react');
let ItemInspector = require('../itemInspector/itemInspector.jsx');
let ItemList = require('./itemList.jsx');
var ServerApi = require('../../api/server.jsx');
let store = require('../../redux/wrapper.jsx').store;
let Flex = require('../../flexStyles.js');
//import PropTypes from 'prop-types';

class ItemContainer extends React.Component{
    constructor(props) {
        super(props);
        this.events = [];
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
        let image = this.state.images.find((im)=>{
            return im.id === selectedItem.imageId;
        });
        let url = image?image.url:'';
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

    selectItem(data){
        if(data.itemId < 0){return;}
        let selectedItem = this.state.items.find((i)=>{return i.id == data.itemId;});
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
       this.unsubscribe = store.subscribe(()=>{
            let state = store.getState();
            let count = state.refreshItemReducer ? state.refreshItemReducer.length : 0;
            if(count > this.events.length){
                this.events = state.refreshItemReducer;
                this.loadData();
            }
       });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render(){
        return <div style={Flex.flexContainerStyle}>
                                <div>
                                            <ItemInspector 
                                                item={this.state.selectedItem} 
                                                url={this.state.selectedItemImageUrl} 
                                                tagNames = {this.state.selectedItemTagNames} 
                                                tagValues = {this.state.selectedItemTagValues}/>
                                </div>
                                <div style={Flex.flexChildStyle}>
                                    <ItemList
                                        selectItem = {this.selectItem.bind(this)}
                                        items = {this.state.items}
                                        tagValues = {this.state.tagValues}
                                        tags = {this.state.tags}/> 
                                </div>
                            </div>;
    }
}

//ItemContainer.propTypes = {
//    events : PropTypes.arrayOf(PropTypes.object),
//    dispatchNoOp : PropTypes.func.isRequired
//};
//
module.exports = ItemContainer;
