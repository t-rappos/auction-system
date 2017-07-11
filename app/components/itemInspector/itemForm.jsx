var React = require('react');
import PropTypes from 'prop-types';
let ImageListContainer = require('../imageListContainer.jsx');
let Modal = require('../modal.jsx');

//gets account details from db
class ItemForm extends React.Component{
    constructor(props) {
        super(props);
     }
     onSubmit(e){
         e.preventDefault();
         let tagNames = [];
         let tagValues = [];
         if(this.tagName1.value){tagNames.push(this.tagName1.value); tagValues.push(this.tagValue1.value);}
         if(this.tagName2.value){tagNames.push(this.tagName2.value); tagValues.push(this.tagValue2.value);}
         if(this.tagName3.value){tagNames.push(this.tagName3.value); tagValues.push(this.tagValue3.value);}
         this.props.sendData(this.name.value, this.desc.value, tagNames, tagValues);
     }
    render(){

        let modal = this.props.image != '' ? (
                        <Modal label = 'test modal' >
                            <img className = "open-modal" style = { {cursor: 'pointer'} } src={this.props.image} alt=''/>
                            <ImageListContainer onImageSelection = {this.props.onImageSelection}/>
                            <button className = "button success close-modal"> Close modal </button>
                        </Modal>
                    ) : (
                        <Modal label = 'test modal' >
                            <button className = "button open-modal"> Select Image </button>
                            <ImageListContainer onImageSelection = {this.props.onImageSelection}/>
                            <button className = "button success close-modal"> Close modal </button>
                        </Modal>
                    );

        return (
            <div>
                <label> Image
                        {modal}
                </label>
                <form onSubmit = {this.onSubmit.bind(this)}>
                    <label> Name
                        <input type = 'text' ref={(input) => this.name = input}/>
                    </label>

                    <label> Description
                        <input type = 'text' ref={(input) => this.desc = input}/>
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
                                    <td><input type = 'text' ref={(input) => this.tagName1 = input} /></td>
                                    <td><input type = 'text' ref={(input) => this.tagValue1 = input} /></td>
                                </tr>
                                <tr>
                                    <td><input type = 'text' ref={(input) => this.tagName2 = input} /></td>
                                    <td><input type = 'text' ref={(input) => this.tagValue2 = input} /></td>
                                </tr>
                                <tr>
                                    <td><input type = 'text' ref={(input) => this.tagName3 = input}/></td>
                                    <td><input type = 'text' ref={(input) => this.tagValue3 = input}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </label>
                    <button className = "button success" type="submit">Create Item</button>
                </form>
            </div>
        );
    }
}

ItemForm.propTypes = {
    image : PropTypes.string,
    tags : PropTypes.arrayOf(PropTypes.string),
    onImageSelection : PropTypes.func,
    sendData : PropTypes.func
};

module.exports = ItemForm;