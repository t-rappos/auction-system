var React = require('react');
let ListingButtons = require('./listingButtons.jsx');
let ItemView = require('./itemView.jsx');

const ListingInspector = (props)=>{
    let itemView = <ItemView
                            description = {''}
                            name = {'empty listing'}
                            imageUrl = {''}
                            tagNames = {[]}
                            tagValues = {[]}
                        />;

    return (
        <div>
            {itemView}
            <ListingButtons/>
        </div>
    );
    
    
};

module.exports = ListingInspector;
