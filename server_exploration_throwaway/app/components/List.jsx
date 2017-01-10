var React = require('react');
var ListItem = require('ListItem');

class List extends React.Component
{
  render()
  {
      return (
          <div>
             <ul>
              <ListItem content="Component 1" />
              <ListItem content="Component 2" />
              <ListItem content="Component 3" />
             </ul>
           </div>
         );
  }
}

module.exports = List;
