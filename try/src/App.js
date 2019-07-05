import React from 'react';
import routes from "./routes";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     isAuth : false
  //   }

  // }



  render(){
    const routeComponents = routes.map(({path, component}, key) =>
     <Route exact path={path} component={component} key={key} />);
   
    return(
      <Router>
      <div>
          <button>
            <Link to="/login">login</Link>
          </button>
        <hr />
        {routeComponents}    
      </div>
    </Router>
    ) 
  }

}

  

export default App;
