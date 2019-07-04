import React from 'react';
import routes from "./routes";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render(){
    const routeComponents = routes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);
    return(
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>

        <hr />
        {routeComponents}

        
      </div>
    </Router>
    ) 
  }

}

  

export default App;
