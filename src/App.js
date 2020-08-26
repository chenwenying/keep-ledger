import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { Route, BrowserRouter } from 'react-router-dom';
import Header from './pages/header';
import Home from './pages/home';
import store from './store';
import 'antd/dist/antd.css'; 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <BrowserRouter> */}
          <Header />
          <Home />
          {/* <Route path="/" exact component={List}></Route>
          <Route path="/chart" exact component={Chart}></Route> */}
        {/* </BrowserRouter> */}
      </Provider>
    )
  }
}

export default App;