import { combineReducers } from 'redux';
import { 
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions/actions';

const selectSubreddit = (state = 'reactjs', action) => {
    switch(action.type) {
        case SELECT_SUBREDDIT:
            return action.subredditName;
        default:
            return state;
    }
};

const posts = (state = { isFetching: false, didInvalidate: false, items: [] }, action) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, { 
                didInvalidate: true 
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, { 
                isFetching: true, 
                didInvalidate: false 
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, { 
                isFetching: false, 
                didInvalidate: false, 
                items: action.posts, 
                lastUpdate: action.receivedAt 
            });
        default:
            return state;
    }
};

const postsBySubreddit = (state = {}, action) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                [action.subredditName]: posts(state[action.subredditName], action)
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    selectSubreddit,
    postsBySubreddit
});

export default rootReducer;