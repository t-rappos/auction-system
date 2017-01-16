var React = require('react');

class UsernameInputFormComponent  extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <form>
          <input type="text" size = '14' placeholder ='Enter username'></input>
        </form>
      </div>
    );
  }
}

module.exports = UsernameInputFormComponent;
