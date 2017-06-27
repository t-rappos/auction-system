
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
                data = {this.props.values}
                columns = {this.props.headers}
               />
            </div>
        );
    }
}

InventoryTable.propTypes = {
    headers : PropTypes.arrayOf(PropTypes.object),
    values : PropTypes.arrayOf(PropTypes.object)
};

module.exports = InventoryTable;