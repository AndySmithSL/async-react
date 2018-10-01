import React from 'react';
import SubredditItem from './subredditItem';

const SubredditList = ({ items }) => (
    <ul>
        { items.map(item => (
            <SubredditItem key={item.id} {...item} />
        ))}
    </ul>
);

export default SubredditList;