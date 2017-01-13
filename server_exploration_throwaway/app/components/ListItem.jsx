var React = require('react');
//var store = require('Redux').configure();

class ListItem extends React.Component
{
  constructor(props){
    super(props);
  }

  handleClick = () => {
    this.props.onClickParentHandler(this.props.content);
  }

  //https://facebook.github.io/react/docs/handling-events.html
  render(){

    let isSelected = this.props.isSelected;
    console.log("render",isSelected);
    let style = {'backgroundColor' : ''};
    if (isSelected){
      style = {'backgroundColor': '#ccc'};
    }
    return(
      <li onClick={this.handleClick} style={style}>{this.props.content}</li>
    );
  }
}

ListItem.defaultProps = {
  content : 'default text',
  isSelected : false
};

module.exports = ListItem;


/*
store.dispatch({
  type : 'LOGIN_USERNAME_CLICKED',
  username : this.props.content
});
*/
