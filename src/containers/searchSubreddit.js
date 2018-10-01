import React from 'react';
import { connect } from 'react-redux';
import { searchPosts } from '../actions/actions';

let SearchSubreddit = ({ dispatch }) => {

    let input;

    return (
        <div>
            <form onSubmit={ e => {
                e.preventDefault();

                if(!input.value.trim()) {
                    return;
                }

                dispatch(searchPosts(input.value));
                input.value = '';

            }}>
                <input ref={x => input = x}/>
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    );

};

SearchSubreddit = connect()(SearchSubreddit);

export default SearchSubreddit;