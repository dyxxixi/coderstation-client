import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Comment } from '@ant-design/compatible';
import { Avatar, Button, Form, List, Tooltip, message, Pagination, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { addCommentApi, getIssueCommentByIdApi, getBookCommentByIdApi } from '../api/comment';
import { getUserByIdApi } from '../api/user';
import { formatDate } from '../utils';
import { updateIssueApi } from '../api/issue';
import { updateBookApi } from '../api/book';
import { updateUserInfoAsync } from '../redux/userSlice';
import styles from '../css/Discuss.module.css'

import PropTypes from 'prop-types'
Discuss.propTypes = {
  commentType: PropTypes.number, // 用来判断是issue评论还是book评论
  targetId: PropTypes.string,
  issueInfo: PropTypes.object,
  bookInfo: PropTypes.object
}

function Discuss({ commentType, targetId, issueInfo, bookInfo }) {
  const { userInfo, isLogin } = useSelector(state => state.user)
  const editorRef = useRef()
  const [commentList, setCommentList] = useState([])
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前页
    pageSize: 10, // 每页条数
    total: 0 // 总条数
  })
  const [refresh, setRefresh] = useState(false)
  const [value, setValue] = useState('');
  const dispatch = useDispatch()

  //根据登录状态进行头像处理
  let avatar = null
  if (isLogin) {
    avatar = (<Avatar src={userInfo.avatar} />)
  } else {
    avatar = (<Avatar icon={<UserOutlined />} />)
  }

  useEffect(() => {
    async function fetchCommentList() {
      let data = null
      if (commentType === 1) {
        // 传递过来的是问答 id ,需要获取该问答 id 所对应的评论
        const result = await getIssueCommentByIdApi(targetId, {
          current: pageInfo.current,
          pageSize: pageInfo.pageSize
        })
        data = result.data
      } else if (commentType === 2) {
        // 传递过来的是书籍 id ,需要获取该书籍 id 所对应的评论
        const result = await getBookCommentByIdApi(targetId, {
          current: pageInfo.current,
          pageSize: pageInfo.pageSize
        })
        data = result.data
      }
      for (const item of data.data) {
        const { data } = await getUserByIdApi(item.userId)
        // 将评论用户的信息添加到评论对象上
        item.userInfo = data
      }
      // 更新评论数据
      setCommentList(data.data)
      // 更新分页数据
      setPageInfo({ ...pageInfo, total: data.count })
    }
    if (targetId) {
      fetchCommentList();
    }
  }, [targetId, pageInfo.current, refresh])

  // 处理添加评论
  function handleSubmit() {
    let newComment = null
    if (commentType === 1) {
      // 说明是新增问答的评论
      newComment = editorRef.current.getInstance().getHTML()
      if (newComment === '<p><br></p>') {
        newComment = ''
      }
    } else if (commentType === 2) {
      // 说明是新增书籍的评论
      newComment = value;
    }
    if (!newComment) {
      message.warning('请输入评论内容')
      return
    }
    // 提交评论
    addCommentApi({
      userId: userInfo._id,
      typeId: issueInfo ? issueInfo.typeId : bookInfo.typeId,
      commentContent: newComment,
      commentType: commentType,
      bookId: bookInfo?._id,
      issueId: issueInfo?._id
    })

    if (commentType === 1) {
      // 问答评论数 +1
      updateIssueApi(targetId, {
        commentNumber: ++issueInfo.commentNumber
      })
      // 增加仓库对应用户积分的变化
      dispatch(updateUserInfoAsync({
        userId: userInfo._id,
        newInfo: {
          points: userInfo.points + 4
        }
      }))
      message.success("评论添加成功，积分+4");
      // 清空评论框
      editorRef.current.getInstance().setHTML("");
    } else if (commentType === 2) {
      // 书籍评论数 +1
      updateBookApi(targetId, {
        commentNumber: ++bookInfo.commentNumber
      })
      // 增加仓库对应用户积分的变化
      dispatch(updateUserInfoAsync({
        userId: userInfo._id,
        newInfo: {
          points: userInfo.points + 2
        }
      }))
      message.success("评论添加成功，积分+2");
      // 清空评论框
      setValue("");
    }
    // 刷新评论
    setRefresh(!refresh);
  }

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
      {/* 评论框 */}
      <Comment
        avatar={avatar}
        content={
          <>
            <Form.Item>
              {
                commentType === 1
                  ?
                  <Editor
                    initialValue=""
                    previewStyle="vertical"
                    height="270px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    language='zh-CN'
                    ref={editorRef}
                  />
                  :
                  <Input.TextArea
                    rows={4}
                    placeholder={isLogin ? "" : "请登录后评论..."}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
              }
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                disabled={isLogin ? false : true}
                onClick={handleSubmit}
              >添加评论</Button>
            </Form.Item>
          </>
        }
      />

      {/* 评论列表 */}
      {
        commentList?.length > 0
        &&
        <List
          header='当前评论'
          dataSource={commentList}
          renderItem={(item) => (
            <Comment
              avatar={<Avatar src={item.userInfo.avatar} />}
              content={
                <div dangerouslySetInnerHTML={{ __html: item.commentContent }} />
              }
              datetime={
                <Tooltip title={formatDate(item.commentDate, 'year')} >
                  <span>{formatDate(item.commentDate, 'year')}</span>
                </Tooltip>
              }
            />
          )}
        />
      }

      {/* 分页 */}
      {
        commentList.length > 0
          ? (
            <div className={styles.paginationContainer}>
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                {...pageInfo}
                onChange={handlePageChange}
              />
            </div>
          )
          : (
            <div style={{
              fontWeight: '200',
              textAlign: 'center',
              margin: '50px'
            }} >
              暂无评论
            </div>
          )
      }
    </div>
  );
}

export default Discuss;
