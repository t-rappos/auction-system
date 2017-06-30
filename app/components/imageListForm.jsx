var React = require('react');
import PropTypes from 'prop-types';

class ImageListForm extends React.Component{

    constructor(props) {
        super(props);
     }

     render(){
        let images = this.props.images.map((url, i)=>{
                return (
                    <label key={"label"+i}>
                        {this.props.names[i]}
                        <img src={url}
                            key = {i}
                            onClick = {()=>{this.props.onImageClick(i);}}
                            style = {{
                                    maxHeight : '20vh',
                                    maxWidth : '20vw',
                                    cursor : 'pointer',
                                    padding : 3,
                                    backgroundColor : this.props.selectedImageIndex === i ? 'Blue' : ''}}
                            alt = ''/>
                    </label>
                );
            });
        return (
            <div>
                {images}
            </div>
        );
     }
}

ImageListForm.propTypes = {
    images : PropTypes.arrayOf(PropTypes.string).isRequired,
    names : PropTypes.arrayOf(PropTypes.string).isRequired,
    onImageClick : PropTypes.func.isRequired,
    selectedImageIndex : PropTypes.number.isRequired
};

module.exports = ImageListForm;