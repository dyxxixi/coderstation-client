import { useEffect, useState } from 'react';
import { Card, Pagination } from "antd"
import PageHeader from "../components/PageHeader"
import TypeSelect from "../components/TypeSelect"
import { getBookByPageApi } from '../api/book';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import styles from "../css/Books.module.css"

const { Meta } = Card;

// 书籍页
function Books() {
  const [bookInfo, setBookInfo] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();
  const { bookTypeId } = useSelector(state => state.type);

  useEffect(() => {
    async function fetchData() {
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
      };
      if (bookTypeId !== "all") {
        // 需要按照typeId分类
        searchParams.typeId = bookTypeId

        // 通过检测total值判断 是否为搜索结果里的页面跳转
        if (pageInfo.total) {
          // 重置为第一页
          searchParams.current = 1
        }
      }
      const { data } = await getBookByPageApi(searchParams)
      setBookInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fetchData();
  }, [bookTypeId, pageInfo.current, pageInfo.pageSize])

  const bookData = [];
  if (bookInfo.length) {
    for (let i = 0; i < bookInfo.length; i++) {
      bookData.push(<Card
        hoverable
        style={{
          width: 200,
          marginBottom: 30
        }}
        cover={<img alt="example" style={{
          width: 160,
          height: 200,
          margin: 'auto',
          marginTop: 10
        }} src={bookInfo[i]?.bookPic} />}
        key={i}
        onClick={() => navigate(`/books/${bookInfo[i]._id}`)}
      >
        <Meta title={bookInfo[i]?.bookTitle} />
        <div className={styles.numberContainer}>
          <div>浏览数：{bookInfo[i]?.scanNumber}</div>
          <div>评论数：{bookInfo[i]?.commentNumber}</div>
        </div>
      </Card>);
    }
    // 添加白板占位空白
    if (bookInfo.length % 5 !== 0) {
      var blank = 5 - bookInfo.length % 5;
      for (let i = 1; i <= blank; i++) {
        bookData.push(<div style={{ width: 220, marginBottom: 20 }} key={i * Math.random()}></div>)
      }
    }
  }

  /**
   *
   * @param {*} page 当前页
   * @param {*} pageSize 每页条数
   */
  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }

  return (
    <div>
      <PageHeader title="最新资源">
        <TypeSelect />
      </PageHeader>
      <div className={styles.bookContainer}>
        {bookData}
      </div>
      <div className="paginationContainer">
        {
          bookData.length > 0 ? (
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              {...pageInfo} onChange={handlePageChange}
              pageSizeOptions={[5, 10, 15]}
              showSizeChanger
            />
          ) : (
            <div style={{
              fontSize: "26px",
              fontWeight: "200"
            }}>该分类下暂无书籍</div>
          )
        }
      </div>
    </div>
  );
}

export default Books;
