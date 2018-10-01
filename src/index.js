import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from './actions/actions';
import rootReducer from './reducers/reducers';

import { Provider } from 'react-redux';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

//store.dispatch(selectSubreddit('reactjs'));
//store.dispatch(fetchPosts('frontend')).then(() => console.log(store.getState()));

store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => console.log(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
