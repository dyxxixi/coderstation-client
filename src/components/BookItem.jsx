import { Image } from "antd"
import styles from "../css/BookItem.module.css";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types'
BookItem.propTypes = {
  bookInfo: PropTypes.object
}

/**
 * 每一本书籍项目
 */
function BookItem({ bookInfo }) {
  const reg = /<[^<>]+>/g;
  const bookIntro = bookInfo.bookIntro.replace(reg, "");
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      {/* 评论数 */}
      <div className={styles.bookNum}>
        <div>{bookInfo.commentNumber}</div>
        <div>评论</div>
      </div>
      {/* 浏览数 */}
      <div className={styles.bookNum}>
        <div>{bookInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      {/* 书籍内容 */}
      <div className={styles.bookContainer}>
        {/* 左边图片 */}
        <div className={styles.left}>
          <Image className={styles.bookPic} src={bookInfo.bookPic} />
        </div>
        {/* 右侧分为上下 */}
        <div className={styles.right}>
          <div className={styles.top} onClick={() => navigate(`/books/${bookInfo._id}`)}>{bookInfo.bookTitle}</div>
          <div className={styles.bottom}>{bookIntro.slice(4, 55) + "..."}</div>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
