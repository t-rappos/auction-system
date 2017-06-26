var React = require('react');
import PropTypes from 'prop-types';

const containerStyle = {
    maxWidth : 250,
    margin : 30
};

const tabContainerStyle = {
    display : 'flex',
    borderStyle: 'solid',
    borderWidth: 1
};

const contentStyle = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightGrey',
    padding: '6px',
    paddingTop: '16px'
};

const buttonStyle = {
    backgroundColor: '#e6e6e6',
    margin : 0,
    color: 'black'
};

const activeButtonStyle = {
    margin : 0
};

class Tab extends React.Component{
    constructor(props) {
        super(props);
    }
}

Tab.propTypes = {
    name : PropTypes.string
};

class TabContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {activeTab: 0};
     }
    switchTab(num){
        this.setState({activeTab : num});
    }
    render() {
        let tabs = this.props.children.map((child, i)=>{
            let active = i==this.state.activeTab;
            return (<button 
                className = "button"
                key = {i}
                id = {child.props.name}
                style = {active?activeButtonStyle:buttonStyle}
                onClick = {()=>{this.setState({activeTab : i});}}
            >{child.props.name}
            </button>);
        });
        let contents = this.props.children.map((child, i)=>{
            let active = i==this.state.activeTab;
            if(active){
                let clonedChildContent = React.cloneElement(child.props.children,{key : i, switchTab : this.switchTab.bind(this)});
                return clonedChildContent;
            }
            return;
        });
        return (
        <div style = {containerStyle} ref={node => this.node = node} >
            <div style = {tabContainerStyle}>
                {tabs}
            </div>
            <div style = {contentStyle}>
                {contents}
            </div>
        </div>
        );
    }
}

TabContainer.propTypes = {
    children: React.PropTypes.node
};

module.exports = {TabContainer : TabContainer ,Tab : Tab};