import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'

import selectedImages from './reducers/selectedImages'
import fetchedItems from './reducers/search'

import Search from './components/search'
import Showcase from './components/search/Showcase'

const store = createStore(
  combineReducers({
    selectedImages: selectedImages,
    fetchedItems: fetchedItems,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(thunk)
  )
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/'>
        <Route path='search'  component={Search}>
          <Route path=':imageId' component={Showcase}/>
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'))
