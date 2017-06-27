
var React = require('react');
import PropTypes from 'prop-types';

//gets account details from db
class InventoryView extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div>
               InventoryView
               {this.props.items.map((item, i)=>{
                 return (<p>{item.name}</p>);  
               })}
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