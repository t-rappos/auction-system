var React = require('react');
let ItemInspector = require('../itemInspector/itemInspector.jsx');
let ItemList = require('./itemList.jsx');
var ServerApi = require('../../api/server.jsx');
let TabContainer = require('../tabContainer.jsx').TabContainer;
let Tab = require('../tabContainer.jsx').Tab;
let ItemFormContainer = require('../forms/itemFormContainer.jsx');

class ItemContainer extends React.Component{
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
    }

    render(){
        return <div className='row'>
                                <div className='small-6 columns'>
                                    <TabContainer>
                                        <Tab name= 'View'>
                                            <ItemInspector 
                                                item={this.state.selectedItem} 
                                                url={this.state.selectedItemImageUrl} 
                                                tagNames = {this.state.selectedItemTagNames} 
                                                tagValues = {this.state.selectedItemTagValues}/>
                                        </Tab>
                                        <Tab name = 'Create'>
                                            <ItemFormContainer update={this.loadData.bind(this)}/>
                                        </Tab>
                                    </TabContainer>
                                </div>
                                <div className='small-6 columns'>
                                    <ItemList
                                        selectItem = {this.selectItem.bind(this)}
                                        items = {this.state.items}
                                        tagValues = {this.state.tagValues}
                                        tags = {this.state.tags}/> 
                                </div>
                            </div>;
    }
}

module.exports = ItemContainer;
