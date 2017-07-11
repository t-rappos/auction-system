var React = require('react');
let ListingInspector = require('../itemInspector/listingInspector.jsx');
let ListingList = require('./listingList.jsx');

const ListingContainer = (props)=>{
    return <div className='row'>
                                <div className='small-6 columns'>
                                       <ListingInspector/>
                                </div>
                                <div className='small-6 columns'>
                                       <ListingList/>
                                </div>
                            </div>;
};

module.exports = ListingContainer;
