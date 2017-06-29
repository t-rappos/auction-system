
var React = require('react');
import PropTypes from 'prop-types';

class ImageListContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {selectedImageIndex : -1};
     }

     render(){
        return (
            <ImageListForm images = {['./assets/image1.jpg','./assets/image1.jpg']}
                        onImageClick = {(imageIndex)=>{console.log(imageIndex + " image clicked");
                                                        this.setState({selectedImageIndex : imageIndex});}}
                        selectedImageIndex = {this.state.selectedImageIndex}/>
        );
     }
}

class ImageListForm extends React.Component{

    constructor(props) {
        super(props);
     }

     render(){
        let images = this.props.images.map((url, i)=>{
                return (
                    <img src={url}
                         key = {i}
                         onClick = {()=>{this.props.onImageClick(i);}}
                         style = {{cursor : 'pointer',
                                padding : 3,
                                backgroundColor : this.props.selectedImageIndex === i ? 'Blue' : ''}}
                        alt = ''/>
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
    images : PropTypes.arrayOf(PropTypes.string),
    onImageClick : PropTypes.func,
    selectedImageIndex : PropTypes.number
};

//gets account details from db
class ItemForm extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
            <div>
                <form>
                    <label> Image
                        <img onClick = {()=>{console.log('clicked image');}} style = { {cursor: 'pointer'} } src='./assets/image1.jpg' alt=''/>
                    </label>

                    <label> Name
                        <input type = 'text'/>
                    </label>

                    <label> Description
                        <input type = 'text'/>
                    </label>

                    <label> Metadata
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type = 'text'/></td>
                                    <td><input type = 'text'/></td>
                                </tr>
                                <tr>
                                    <td><input type = 'text'/></td>
                                    <td><input type = 'text'/></td>
                                </tr>
                                <tr>
                                    <td><input type = 'text'/></td>
                                    <td><input type = 'text'/></td>
                                </tr>
                            </tbody>
                        </table>
                    </label>
                </form>
            </div>
        );
    }
}
/*
ItemView.propTypes = {
    imageUrl : PropTypes.string, 
    name : PropTypes.string,
    description : PropTypes.string ,
    tagNames : PropTypes.arrayOf(PropTypes.string),
    tagValues : PropTypes.arrayOf(PropTypes.string)
};
*/

class ItemFormContainer extends React.Component{
    constructor(props) {
        super(props);
     }

     render(){
        return (
            <div>
                <ItemForm/>
                <ImageListContainer/>
            </div>
        );
     }
}

module.exports = ItemFormContainer;