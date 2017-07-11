
var React = require('react');
let ItemForm = require('./itemForm.jsx');
let ServerAPI = require('../../api/server.jsx');

//Container for item construction panel
class ItemFormContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {selectedImageId : -1,
                    selectedImageUrl : '',
                    tags : []};
     }
     
     onImageSelection(id, url){
         this.setState({selectedImageId : id, selectedImageUrl : url});
     }

     sendData(name, desc, tagNames, tagValues){
        ServerAPI.sendItemCreationRequest(this.state.selectedImageId, name, desc, tagNames, tagValues,(res)=>{
            if(res){
                if(res.error){
                    alert("Item couldn't be created! " + res.error);
                    return;
                }
                alert("Item created successfully!");
            }
        });
     }

     loadData(){
         ServerAPI.sendTagViewRequest((res)=>{
             if(res){
                 if(res.error){
                     alert("error connecting to server");
                 } else {
                     if(res.tags && res.tags.length > 0){
                         let tagNames = [];
                         res.tags.map((tag)=>{
                             tagNames.push(tag.name);
                         });
                        this.setState({tags : tagNames});
                     }
                 }
             }
         });
        
     }

     componentDidMount(){
        this.loadData();
     }

     render(){
        return (
            <div>
                <ItemForm onImageSelection = {this.onImageSelection.bind(this)} 
                            image={this.state.selectedImageUrl}
                            tags={this.state.tags}
                            sendData = {this.sendData.bind(this)}/>
            </div>
        );
     }
}

module.exports = ItemFormContainer;