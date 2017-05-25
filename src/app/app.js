import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import App from './components/App';
import About from './components/navigation/About';
import Contact from './components/navigation/Contact';
import Pricing from './components/navigation/Pricing';
import PageNotFound from './components/navigation/PageNotFound';
import Login from './components/navigation/Login';
import Signup from './components/navigation/Signup';
import Header from './containers/Header';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'));
