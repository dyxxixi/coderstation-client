import styles from '../css/Issue.module.css'
import PageHeader from '../components/PageHeader';
import IssueItem from '../components/IssueItem';
import AddIssueBtn from '../components/AddIssueBtn';
import Recommend from '../components/Recommend';
import ScoreRank from '../components/ScoreRank';
import TypeSelect from '../components/TypeSelect';
import { useState, useEffect } from 'react';
import { getIssueByPageApi } from '../api/issue';
import { Pagination } from 'antd'
import { useSelector } from 'react-redux';

function Issues() {
  // 用于存储获取到的数据列表
  const [issueInfo, setIssueInfo] = useState([])
  // 分页信息
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前页
    pageSize: 10, // 每页条数
    total: 0 // 总条数
  })
  const { issueTypeId } = useSelector(state => state.type)

  useEffect(() => {
    async function fetchData() {
      let pageParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true
      }
      if (issueTypeId !== 'all') {
        // 需要按照typeId分类
        pageParams.typeId = issueTypeId
        
        // 通过检测total值判断 是否为搜索结果里的页面跳转
        if (pageInfo.total) {
          // 重置为第一页
          pageParams.current = 1
        }
      }
      //  {currentPage: 1, eachPage: 15, count: 20, totalPage: 2, data: Array(15)}
      const { data } = await getIssueByPageApi(pageParams)
      // 更新分页信息
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count
      })
      // 存储数据列表
      setIssueInfo(data.data)
    }
    fetchData()
  }, [pageInfo.current, pageInfo.pageSize, issueTypeId])

  let issueList = []
  issueInfo.forEach((item, index) => {
    issueList.push(<IssueItem key={index} issueInfo={item} />)
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
      <PageHeader title='问答列表' >
        {/* 分类选择  */}
        <TypeSelect />
      </PageHeader>
      {/* 下面的列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          {issueList}
          <div className="paginationContainer">
            {
              issueList.length > 0
                ? <Pagination
                  showQuickJumper
                  defaultCurrent={1}
                  {...pageInfo} onChange={handlePageChange}
                  pageSizeOptions={[5, 10, 15]}
                  showSizeChanger
                />
                : <div className={styles.noIssue}>
                  有问题就来 CoderStation !
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

export default Issues;
