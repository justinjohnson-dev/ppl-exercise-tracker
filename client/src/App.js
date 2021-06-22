import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Exercise from './components/exercise/exercise';
import Welcome from './components/welcome/welcome';
import Workouts from './components/workouts/workouts';


class App extends Component {
  render() {
    return (
      <>
        <div className="Content">
          <Router>
            <div className="App">
              {/* <Header /> */}
              <Route exact path="/" component={Welcome} />
              <Route exact path="/workouts" component={Workouts} />
              <Route exact path="/exercise" component={Exercise} />
            </div>
          </Router>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;
