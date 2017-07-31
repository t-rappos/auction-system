var React = require('react');
import PropTypes from 'prop-types';
import Radium from 'radium';

const containerStyle = {

};

const tabContainerStyle = {
    display : 'flex'
};

const contentStyle = {
    padding: '6px',
    paddingTop: '16px'
};

const baseButtonStyle = {
    background: 'transparent',
    margin : 0,
    fontWeight: '700',
    color: 'rgba(128, 128, 128, 0.5)'
};

const activeButtonStyle = {
    color: 'black'
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
            return (<h5 
                className = "button"
                key = {i}
                id = {child.props.name}
                style = {active?[baseButtonStyle,activeButtonStyle]:baseButtonStyle}
                onClick = {()=>{this.setState({activeTab : i});}}
            >{child.props.name}
            </h5>);
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

module.exports = {TabContainer : Radium(TabContainer) ,Tab : Tab};