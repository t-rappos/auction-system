
var React = require('react');
import PropTypes from 'prop-types';


//gets account details from db
class ItemView extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div>
                <img src={this.props.imageUrl} alt=''/>
                <h4>{this.props.name}</h4>
                <p>{this.props.description}</p>
                {
                    this.props.tagNames.map((name, i)=>{
                    return (
                        <tr key = {i}>
                            <td>{this.props.tagNames[i]}</td>
                            <td>{this.props.tagValues[i]}</td>
                        </tr>
                        );
                    })
                }
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

module.exports = ItemView;