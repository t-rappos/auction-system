
var React = require('react');
import PropTypes from 'prop-types';
let Flex = require('../../flexStyles.js');
import Radium from 'radium';

const imageStyle = {
    maxWidth : '70vw',
    width:'200px',
    marginLeft : 'auto',
    marginRight : 'auto'
};

const panelStyle = {
    name : 'panelStyle',
    maxWidth : '70vw',
    width:'200px',
    margin: '10px'
};

const headingStyle = {
    textAlign : 'center',
    marginTop: '10px'
};

const descriptionStyle = {
    margin : '10px'
};

//gets account details from db
class ItemView extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div style = {panelStyle}>
                <div style = {{display : 'flex'}}>
                    <img style = {[imageStyle,Flex.panelStyle]} src={this.props.imageUrl} alt=''/>
                </div>
                <div style ={Flex.panelStyle}>
                    <h4 style = {headingStyle}>{this.props.name}</h4>
                    <p style = {this.props.description?descriptionStyle:{}}>{this.props.description}</p>
                </div>
                <table style ={ this.props.tagNames && this.props.tagNames.length >0 ?
                                Flex.panelStyle : {}}>
                    <tbody>
                    {   
                        this.props.tagNames.map((name, i)=>{
                        return (
                                <tr key = {i}>
                                    <td >{this.props.tagNames[i]}</td>
                                    <td >{this.props.tagValues[i]}</td>
                                </tr>
                            );
                        })
                    }   
                    </tbody>
                </table>
            </div>
        );
    }
}

ItemView.propTypes = {
    imageUrl : PropTypes.string, 
    name : PropTypes.string,
    description : PropTypes.string ,
    tagNames : PropTypes.arrayOf(PropTypes.string),
    tagValues : PropTypes.arrayOf(PropTypes.string)
};

module.exports = Radium(ItemView);