import React from 'react';
import classes from  './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NodeControllerContainer from "./components/GraphsController/NodeControllerContainer";
import GraphsContainer from "./components/Graphs/GraphsContainer";

const App = (props) => {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Nodes generator
        </p>

      </header>
      <div className="appBody">
          <div className="col-lg-8 col-sm-12">
              <GraphsContainer />
          </div>
          <div className="col-lg-4 col-sm-12">
              <NodeControllerContainer />
          </div>
      </div>
    </div>
  );
};

export default App;
