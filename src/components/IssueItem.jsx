import styles from '../css/IssueItem.module.css'
import { formatDate } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTypesList } from '../redux/typeSlice';
import { Tag } from 'antd'
import { getUserByIdApi } from '../api/user';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types'
IssueItem.propTypes = {
  issueInfo: PropTypes.object
}

/**
 * 每一条问答项目
 */
function IssueItem({ issueInfo }) {
  // 所有的类型列表
  const { typesList } = useSelector(state => state.type)
  const dispatch = useDispatch()
  const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
  // 取出对应的类型
  const type = typesList.find((item) => item._id === issueInfo.typeId)
  // 存储用户信息
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    // 类型列表没值才去调接口
    if (!typesList.length) {
      dispatch(getTypesList())
    }

    //获取用户信息
    async function fetchUserData() {
      const { data } = await getUserByIdApi(issueInfo.userId)
      setUserInfo(data)
    }
    fetchUserData()
  }, [])

  return (
    <div className={styles.container}>
      {/* 回答数 */}
      <div className={styles.issueNum}>
        {issueInfo.commentNumber}
        <div>回答</div>
      </div>
      {/* 浏览数 */}
      <div className={styles.issueNum}>
        {issueInfo.scanNumber}
        <div>浏览</div>
      </div>
      {/* 问题内容 */}
      <div className={styles.issueContainer}>
        <div className={styles.top} onClick={() => navigate(`/issues/${issueInfo._id}`)}>
          {issueInfo.issueTitle}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag color={colorArr[typesList.indexOf(type) % colorArr.length]}>{type?.typeName}</Tag>
          </div>
          <div className={styles.right}>
            <span>
              <Tag color='volcano'>{userInfo.nickname}</Tag>
              {formatDate(issueInfo.issueDate, 'year')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
