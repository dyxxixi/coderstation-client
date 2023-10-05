import styles from '../css/RecommendItem.module.css'

import PropTypes from 'prop-types'
RecommendItem.propTypes = {
  recommendInfo: PropTypes.object
}

function RecommendItem({ recommendInfo }) {
  return (
    <a className={styles.container} href={recommendInfo.href} target="_blank" rel="noreferrer">
      <div className={styles.leftSide}>{recommendInfo.num}</div>
      <div className={styles.rightSide}>{recommendInfo.title}</div>
    </a>
  );
}

export default RecommendItem;
