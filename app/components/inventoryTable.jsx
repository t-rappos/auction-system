
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
               getTdProps={(state, rowInfo, column, instance) => {
                return {
                    onClick: e => {
                        this.props.selectItem(rowInfo.row.itemId);
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
    selectItem : PropTypes.func
};

module.exports = InventoryTable;