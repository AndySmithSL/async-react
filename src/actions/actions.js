import fetch from 'cross-fetch';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectSubreddit = subredditName => (
    {
        type: SELECT_SUBREDDIT,
        subredditName
    }
);

export const invalidateSubreddit = subredditName => (
    {
        type: INVALIDATE_SUBREDDIT,
        subredditName
    }
);

export const requestPosts = subredditName => (
    {
        type: REQUEST_POSTS,
        subredditName
    }
);

export const receivePosts = (subredditName, json) => (
    {
        type: RECEIVE_POSTS,
        subredditName,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
);

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export const fetchPosts = subredditName => {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return dispatch => {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestPosts(subredditName));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895

        return fetch(`https://www.reddit.com/r/${subredditName}.json`)
            .then(
                response => response.json(), error => console.log('An error occurred.', error)
            )
            .then(json =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.     
                dispatch(receivePosts(subredditName, json))
            )
    }
}

export const shouldFetchPosts = (state, subredditName) => {

    const posts = state.postsBySubreddit[subredditName];

    if(!posts) {
        return true;
    } else if(posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }

}

export const fetchPostsIfNeeded = subredditName => {
    
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {

        if(shouldFetchPosts(getState(), subredditName)) {
            // Dispatch a thunk from thunk!!!
            return dispatch(fetchPosts(subredditName));
        } else {
            return Promise.resolve();
        }

    }
}

export const searchPosts = subredditName => {

    return dispatch => {

        dispatch(selectSubreddit(subredditName));
        dispatch(fetchPostsIfNeeded(subredditName));

    }

}