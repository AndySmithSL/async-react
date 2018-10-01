import { connect } from 'react-redux';
import SubredditList from '../components/subredditList';

const mapStateToProps = state => {

    let items = [];

    for (let key in state.postsBySubreddit) {
        items = state.postsBySubreddit[key].items;
    }

    return {
        items
    }
}

const VisibleSubredditList = connect(
    mapStateToProps
)(SubredditList);

export default VisibleSubredditList;