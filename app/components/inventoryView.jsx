
var React = require('react');
import PropTypes from 'prop-types';
let InventoryTable = require('./inventoryTable.jsx');

//gets account details from db
class InventoryView extends React.Component{

    getHeaders(){
        let columns = [{Header : 'name', accessor : 'name', id : 'name'}];
        if(this.props.tags != null && this.props.tags != undefined){
            this.props.tags.map((tag, i)=>{
                columns.push({Header : tag.name, accessor: tag.name});
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
                this.props.tagValues
                    .filter((tv)=>{return tv.itemId === item.id;})
                    .map((tv)=>{
                        row[this.props.tags[tv.tagId-1].name] = tv.value;
                    });
                data.push(row);
            });
        }
        return data;
    }

    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div>
                {this.props.items && this.props.tagValues && this.props.tags && 
                   <InventoryTable values = {this.getValues()} headers = {this.getHeaders()}/>}
            </div>
        );
    }
}

InventoryView.propTypes = {
    items : PropTypes.arrayOf(PropTypes.object),
    tags : PropTypes.arrayOf(PropTypes.object),
    tagValues : PropTypes.arrayOf(PropTypes.object)
};

module.exports = InventoryView;