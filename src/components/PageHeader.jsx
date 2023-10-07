import styles from '../css/PageHeader.module.css';

import PropTypes from 'prop-types'
PageHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
}

/**
 * 每一页的页头
 */
function PageHeader({ title = '问答列表', children }) {
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>
        {title}
      </div>
      {/* 分类选择  */}
      {children}
    </div>
  );
}

export default PageHeader;
