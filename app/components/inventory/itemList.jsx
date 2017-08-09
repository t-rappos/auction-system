
var React = require('react');
import PropTypes from 'prop-types';
let InventoryTable = require('../inventoryTable.jsx');
let HeaderChecker = require('./headerChecker.jsx');
//gets account details from db
class ItemList extends React.Component{
    constructor(props) {
        super(props);
     }

    getHeaders(){

        let nameCellRenderer = row=> (
            <div style = { {cursor: 'pointer'} } >
                {row.value}
            </div>
        );

        let columns = [{Header : 'name', accessor : 'name', id : 'name', Cell : nameCellRenderer },
                       {Header : 'itemId', accessor : 'itemId', id : 'itemId', show : false }];

        let tagIds = HeaderChecker.sanityCheckHeaders(this.props.tagValues);
        if(this.props.tags != null && this.props.tags != undefined){
            this.props.tags.map((tag, i)=>{
                if(HeaderChecker.checkTagNameIsUsed(tagIds,tag)){
                    columns.push({Header : tag.name, accessor: tag.name});
                }
            });
        }
        return columns;
    }

    getValues(){
        let data = [];
        if (this.props.items != null && this.props.items != undefined){   
            this.props.items.map((item)=>{
                let row = {};
                row['name'] = item.name;
                row['itemId'] = item.id;
                this.props.tagValues
                    .filter((tv)=>{return tv.itemId === item.id;})
                    .map((tv)=>{
                        let tagsIndex= tv.tagId-1;
                        let tag = this.props.tags[tagsIndex];
                        let tagName = tag.name;
                        row[tagName] = tv.value;
                    });
                data.push(row);
            },this);
        }
        return data;
    }

    render(){
        let values = this.getValues();
        let headers = this.getHeaders();
        return (
            <div>
                {this.props.items && this.props.tagValues && this.props.tags && 
                   <InventoryTable 
                   selectItem = {this.props.selectItem} 
                   selectIdNames = {['itemId']}
                   values = {values} 
                   headers = {headers}
                   />}
            </div>
        );
    }
}

ItemList.propTypes = {
    items : PropTypes.arrayOf(PropTypes.object),
    tags : PropTypes.arrayOf(PropTypes.object),
    tagValues : PropTypes.arrayOf(PropTypes.object),
    selectItem : PropTypes.func
};

module.exports = ItemList;