import styles from '../css/PageHeader.module.css';

import PropTypes from 'prop-types'
PageHeader.propTypes = {
  title: PropTypes.string
}

/**
 * 每一页的页头
 */
function PageHeader({ title = '问答列表' }) {
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>
        {title}
      </div>
      {/* 分类选择  */}
    </div>
  );
}

export default PageHeader;
