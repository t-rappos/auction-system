var React = require('react');
let ItemInspector = require('../itemInspector/itemInspector.jsx');
let ItemList = require('./itemList.jsx');
var ServerApi = require('../../api/server.jsx');
let store = require('../../redux/wrapper.jsx').store;
let Flex = require('../../flexStyles.js');
let TabContainer = require('../tabContainer.jsx').TabContainer;
let Tab = require('../tabContainer.jsx').Tab;
let ItemFormContainer = require('../forms/itemFormContainer.jsx');

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
        this.postLoadData = this.postLoadData.bind(this);
        this.selectItem = this.selectItem.bind(this);
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

    postLoadData(res){
        if(res.error == null){
            this.setState({ items : res.items, 
                            tagValues : res.tagValues,
                            tags : res.tags,
                            images : res.images});
        } else {
            alert('Account not found');
        }
    }

    loadData(){
        ServerApi.sendInventoryViewRequest(this.postLoadData);
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
        //this is a workaround for an error about tabContainer supplying unknown props to a div
        const ReactDiv = ({ children = undefined }) => <div style={Flex.flexContainerStyle}>{children}</div>;

        return (    
                    <TabContainer>
                        <Tab name = 'View Items'>
                            <ReactDiv>
                                <div>
                                    <ItemInspector 
                                        item={this.state.selectedItem} 
                                        url={this.state.selectedItemImageUrl} 
                                        tagNames = {this.state.selectedItemTagNames} 
                                        tagValues = {this.state.selectedItemTagValues}/>
                                </div>
                                <div style={Flex.flexChildStyle}>
                                    <ItemList
                                        selectItem = {this.selectItem}
                                        items = {this.state.items}
                                        tagValues = {this.state.tagValues}
                                        tags = {this.state.tags}/> 
                                </div>
                            </ReactDiv>
                        </Tab>
                        <Tab name = 'Create Item'>
                            <ItemFormContainer/>
                        </Tab>
                    </TabContainer>
        );
    }
}

module.exports = ItemContainer;
