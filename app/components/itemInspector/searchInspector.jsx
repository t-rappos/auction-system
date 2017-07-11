var React = require('react');
let SearchButtons = require('./searchButtons.jsx');
let ItemView = require('./itemView.jsx');

const SearchInspector = (props)=>{
    let itemView = <ItemView
                            description = {''}
                            name = {'empty search listing'}
                            imageUrl = {''}
                            tagNames = {[]}
                            tagValues = {[]}
                        />;

    return (
        <div>
            {itemView}
            <SearchButtons/>
        </div>
    );
    
    
};

module.exports = SearchInspector;
