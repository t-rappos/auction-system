
var React = require('react');
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
require('style!css!react-table/react-table.css');

//gets account details from db
class InventoryTable extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div>
               <ReactTable
               style = {{maxHeight:'550px'}}
               getTdProps={(state, rowInfo, column, instance) => {
                return {
                    onClick: e => {
                        /*
                            e.g. selectIdNames = [itemId,status,expired]
                            returns selectData = {itemId : 0, status: outbid, expired: -100.00}
                            to this.props.selectItem callback
                         */
                        if(this.props.selectIdNames){
                           let selectData = {};
                           this.props.selectIdNames.map((key)=>{
                               
                                selectData[key] = rowInfo.row[key];
                           });
                           this.props.selectItem(selectData);
                        }
                    }
                };
               }}
                data = {this.props.values}
                columns = {this.props.headers}
               />
            </div>
        );
    }
}

InventoryTable.propTypes = {
    headers : PropTypes.arrayOf(PropTypes.object),
    values : PropTypes.arrayOf(PropTypes.object),
    selectIdNames : PropTypes.array.isRequired,
    selectItem : PropTypes.func
};

module.exports = InventoryTable;