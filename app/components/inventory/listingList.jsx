var React = require('react');
import PropTypes from 'prop-types';
let InventoryTable = require('../inventoryTable.jsx');

class ListingList extends React.Component{
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
                {Header : 'itemId', accessor : 'itemId', id : 'itemId' },
                {Header : 'listingId', accessor : 'listingId', id : 'listingId' },
                {Header : 'price', accessor : 'price', id : 'price' }];
        if(this.props.tags != null && this.props.tags != undefined){
            this.props.tags.map((tag, i)=>{
                columns.push({Header : tag.name, accessor: tag.name});
            });
        }
        return columns;
    }
    getValues(){
        let data = [];
        this.props.listings.map((listing)=>{
            let row = {};
            row['name'] = listing.item.name;
            row['itemId'] = listing.item.id;
            row['listingId'] = listing.id;
            row['price'] = listing.starting_price;
            this.props.tagValues
                    .filter((tv)=>{return tv.itemId === listing.item.id;})
                    .map((tv)=>{
                        row[this.props.tags[tv.tagId-1].name] = tv.value;
                    });
            data.push(row);
        });
        return data;
    }
    render(){
         return (
             <InventoryTable selectItem = {this.props.selectItem} values = {this.getValues()} headers = {this.getHeaders()}/>
         );
    }
}
ListingList.propTypes = {
    listings : PropTypes.array.isRequired,
    tags : PropTypes.arrayOf(PropTypes.object).isRequired,
    tagValues : PropTypes.arrayOf(PropTypes.object).isRequired,
    selectItem : PropTypes.func.isRequired
};

module.exports = ListingList;
