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
import Signup from './components/navigation/Signup';
import Header from './containers/Header';
import Workspace from './containers/Workspace';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/workspace' component={Workspace} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
