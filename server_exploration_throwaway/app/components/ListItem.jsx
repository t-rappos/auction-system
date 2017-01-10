var React = require('react');

class ListItem extends React.Component
{
  constructor(props){
    super(props);
    this.state = {isSelected: false};
  }
  handleClick = () => {
    console.log('this is:', this);
    this.setState({isSelected: true});
  }

  //https://facebook.github.io/react/docs/handling-events.html
  render(){
    var isSelected = this.state.isSelected;
    var style = {'backgroundColor' : ''};
    if (isSelected){
      style = {'backgroundColor': '#ccc'};
    }
    return(
      <li onClick={this.handleClick} style={style}>{this.props.content}</li>
    );
  }
}

module.exports = ListItem;
