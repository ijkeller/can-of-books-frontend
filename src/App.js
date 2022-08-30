import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import BestBooks from './Components/BestBooks';
import About from './Components/About'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


// let LAB = process.env.REACT_APP_LAB_SERVER;
// let DEPLOYED = process.env.REACT_APP_DEPLOYED_SERVER;
// let ACTIVE_SERVER =
//   LAB
//   // DEPLOYED
//   ;


class App extends React.Component {




  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route 
            exact path="/"
            element={<About />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
