
var React = require('react');
import PropTypes from 'prop-types';
let ImageListForm = require('./imageListForm.jsx');
let ServerAPI = require('../../api/server.jsx');

class ImageListContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {selectedImageIndex : -1,
                    urls : [],
                    ids : [],
                    names : []
        };
    }

    loadImages(){
        ServerAPI.sendImageListViewRequest((res)=>{
            if(res){
                if(res.error){
                    alert("Cannot connect to server!");
                } else {
                    let urls = [];
                    let ids = [];
                    let names = [];
                    res.images.map((image)=>{
                        urls.push(image.url);
                        ids.push(image.id);
                        names.push(image.name);
                    });
                    this.setState({urls : urls, ids : ids, names : name});
                }
            }
        });
    }
    componentDidMount() {
        this.loadImages();
    }
     //onImageSelection
     render(){
        return (
            <ImageListForm images = {this.state.urls}
                        names = {this.state.names}
                        onImageClick = {(imageIndex)=>{
                            this.setState({selectedImageIndex : imageIndex});
                            this.props.onImageSelection(this.state.ids[imageIndex],this.state.urls[imageIndex] );
                        }}
                        selectedImageIndex = {this.state.selectedImageIndex}/>
        );
     }
}

ImageListContainer.propTypes = {
    onImageSelection : PropTypes.func.isRequired
};

module.exports = ImageListContainer;