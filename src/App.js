import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch("https://localhost:5001/user")
    .then(res => res.json())
    .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
    });
  }
  render () {
    var {isLoaded, items} = this.state;
    if(!isLoaded){
      return <div>Loading...</div>
    }
    return(
      <div className = "App"> 
       <ul> 
            {items.map(item => (
                  <li>
                         {item.user_name}
                  </li>
            ))};
       </ul>

      </div>
    );
  }

}
export default App;
