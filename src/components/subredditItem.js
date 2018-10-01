import React from 'react';
import PropTypes from 'prop-types';

const SubredditItem = ({ title, author }) => (
    <li>
        {title} - {author}
    </li>
);

SubredditItem.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default SubredditItem;