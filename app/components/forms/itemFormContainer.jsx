
var React = require('react');
let ItemForm = require('./itemForm.jsx');
let ServerAPI = require('../../api/server.jsx');
let ToastStore = require('../toast/toastStore.jsx');
let store = require('../../redux/wrapper.jsx').store;
let actions = require('../../redux/actions.jsx');


const containerStyle = {
    padding : '10px'
};

//Container for item construction panel
class ItemFormContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {selectedImageId : -1,
                    selectedImageUrl : '',
                    tags : []};
        this.onImageSelection = this.onImageSelection.bind(this);
        this.sendData = this.sendData.bind(this);
     }
     
     onImageSelection(id, url){
         this.setState({selectedImageId : id, selectedImageUrl : url});
     }

     sendData(name, desc, tagNames, tagValues){
        ServerAPI.sendItemCreationRequest(this.state.selectedImageId, name, desc, tagNames, tagValues,(res)=>{
            if(res){
                if(res.error){
                    ToastStore.push('Item creation FAILED!', 5000, 'error');
                    return;
                }
                ToastStore.push('Item created successfully', 5000, 'success');
                store.dispatch(actions.refreshItems());
            }
        });
     }

     loadData(){
         ServerAPI.sendTagViewRequest((res)=>{
             if(res){
                 if(res.error){
                     ToastStore.push('Couldnt connect to server!', 5000, 'error');
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
            <div style = {containerStyle}>
                <ItemForm onImageSelection = {this.onImageSelection} 
                            image={this.state.selectedImageUrl}
                            tags={this.state.tags}
                            sendData = {this.sendData}/>
            </div>
        );
     }
}

module.exports = ItemFormContainer;