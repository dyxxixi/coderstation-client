import IssueItem from './IssueItem';

import PropTypes from 'prop-types'
SearchResultItem.propTypes = {
  info: PropTypes.object
}

/**
 * 为容器组件
 * 根据搜索的类型返回不同类型的搜索项目组件
 */
function SearchResultItem({ info }) {
  return (
    <div>
      {
        info.issueTitle
          ?
          <IssueItem issueInfo={info} />
          :
          null
      }
    </div>
  );
}

export default SearchResultItem;
