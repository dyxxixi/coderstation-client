import { useState, useEffect } from 'react';
import { getIssueByIdAPI } from '../api/issue';
import { useParams } from 'react-router-dom';
import styles from '../css/IssueDetail.module.css'
import Recommend from '../components/Recommend';
import ScoreRank from '../components/ScoreRank';
import Discuss from '../components/Discuss';
import { getUserByIdApi } from '../api/user';
import { Avatar } from 'antd';
import { formatDate } from '../utils';

// 内容详情页
function IssueDetail() {
  const [detailInfo, setDetailInfo] = useState(null)
  const [issueUser, setIssueUser] = useState(null)
  // 获取传来的id
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssueByIdAPI(id)
      setDetailInfo(data)
      const result = await getUserByIdApi(data.userId)
      setIssueUser(result.data)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.detailContainer}>
      {/* 左侧 */}
      <div className={styles.leftSide}>
        {/* 左上方：问答详情 */}
        <div className={styles.question}>
          {/* 标题 */}
          <h1>{detailInfo?.issueTitle}</h1>
          {/* 用户信息：头像、昵称、提问日期 */}
          <div className={styles.questioner}>
            <Avatar src={issueUser?.avatar} />
            <span className={styles.user}>{issueUser?.nickname}</span>
            <span>发布于：{formatDate(detailInfo?.issueDate)}</span>
          </div>
          {/* 问题详情 */}
          <div className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: detailInfo?.issueContent }}></div>
          </div>
        </div>
        {/* 左下方：评论 */}
        <Discuss
          commentType={1}
          targetId={id}
          issueInfo={detailInfo}
        />
      </div>
      {/* 右侧 */}
      <div className={styles.rightSide}>
        <div style={{ marginBottom: '30px' }}>
          <Recommend />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}

export default IssueDetail;
