var React = require('react');
let ItemView = require('./itemView.jsx');
let ItemButtons = require('./itemButtons.jsx');
import PropTypes from 'prop-types';

class ItemInspector extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        let valid = this.props.item;
        let itemView = <ItemView
                            description = {valid?this.props.item.description:''}
                            name = {valid?this.props.item.name:''}
                            imageUrl = {valid?this.props.url:''}
                            tagNames = {valid?this.props.tagNames:[]}
                            tagValues = {valid?this.props.tagValues:[]}
                        />;
        return (
            <div>
                {itemView}
                <ItemButtons/>
            </div>
        );
    }
}

ItemInspector.propTypes = {
    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array
};

module.exports = ItemInspector;
