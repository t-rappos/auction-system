var React = require('react');
let SearchInspector = require('../itemInspector/searchInspector.jsx');
let SearchList = require('./searchList.jsx');

const SearchContainer = (props)=>{
    return <div className='row'>
                                <div className='small-6 columns'>
                                       <SearchInspector/>
                                </div>
                                <div className='small-6 columns'>
                                       <SearchList/>
                                </div>
                            </div>;
};

module.exports = SearchContainer;
