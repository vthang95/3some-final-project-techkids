import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';
import io from 'socket.io-client';

const socket = io('/workplace');

import reducers from './reducers';
import PageNotFound from './components/navigation/PageNotFound';
import Workspace from './containers/Workspace';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/workspace' component={Workspace} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('react-app'));
