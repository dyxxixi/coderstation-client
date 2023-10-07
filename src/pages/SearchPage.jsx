import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AddIssueBtn from '../components/AddIssueBtn';
import Recommend from '../components/Recommend';
import ScoreRank from '../components/ScoreRank';
import SearchResultItem from '../components/SearchResultItem';
import styles from '../css/SearchPage.module.css'
import { getIssueByPageApi } from '../api/issue';
import { Pagination } from 'antd';

// 搜索结果页
function SearchPage() {
  const location = useLocation()
  // 存储搜索结果
  const [searchResult, setSearchResult] = useState([])
  // 分页信息
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前页
    pageSize: 10, // 每页条数
    total: 0 // 总条数
  })

  useEffect(() => {
    async function fetchData({ value, searchType }) {
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true
      }
      switch (searchType) {
        case 'issue': {
          // 搜索问答
          searchParams.issueTitle = value
          const { data } = await getIssueByPageApi(searchParams)
          // 更新分页信息
          setPageInfo({ ...pageInfo, total: data.count })
          // 存储数据列表
          setSearchResult(data.data)
          break
        }
        case 'book': {
          // 搜索问答
          break
        }
      }
    }
    if (location.state) {
      fetchData(location.state)
    }
  }, [location.state])

  let searchList = []
  searchResult.forEach((item, index) => {
    searchList.push(<SearchResultItem key={index} info={item} />)
  })

  /**
 * 处理翻页的回调函数
 */
  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize
    })
  }

  return (
    <div>
      {/* 上面的头部 */}
      <PageHeader title='搜索结果' />
      {/* 下面的列表内容区域 */}
      <div className={styles.searchPageContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          {searchList}
          <div className="paginationContainer">
            {
              searchList.length > 0
                ? <Pagination
                  showQuickJumper
                  defaultCurrent={1}
                  {...pageInfo} onChange={handlePageChange}
                  pageSizeOptions={[5, 10, 15]}
                  showSizeChanger
                />
                : <div className={styles.noResult}>
                  空
                </div>
            }
          </div>
        </div>
        {/* 右边区域 */}
        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div style={{ marginBottom: '30px' }}>
            <Recommend />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <ScoreRank />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
