const flexContainerStyle = {
    display : 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around'
};

const flexMobileContainerStyle = {
    '@media (max-width: 750px)':{
        display : 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    }
};

const flexChildStyle = {
    margin: '10px',
    overflow: 'hidden'
};

const flexChildPanelStyle = {
    margin: '10px',
    background: 'white',
    overflow: 'hidden',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 5px 5px 5px, rgba(0, 0, 0, 0.05) 0px 0px 5px',
    border: '0px'
};

const panelStyle ={
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 5px',
    borderRadius: '4px'
};

module.exports = {
    flexContainerStyle : flexContainerStyle,
    flexChildStyle : flexChildStyle,
    flexChildPanelStyle : flexChildPanelStyle,
    flexMobileContainerStyle : flexMobileContainerStyle,
    panelStyle : panelStyle
};