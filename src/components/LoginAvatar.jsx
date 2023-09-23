import { useSelector } from "react-redux";
import { Button, Popover, List, Avatar, Image } from 'antd';
import { clearUserInfo, changeUserStatus } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from '../css/loginAvatar.module.css'

import PropTypes from 'prop-types'
LoginAvatar.propTypes = {
  handleLoginPopup: PropTypes.func
}

// 该组件用于显示用户的头像，如果没登录，则显示注册登录按钮
function LoginAvatar({ handleLoginPopup }) {
  const { isLogin, userInfo } = useSelector(state => state.user)
  let loginStatus = null
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleListClick(item) {
    if (item === '个人中心') {
      // 跳转到个人中心
    } else {
      // 退出登录
      // 清除token
      localStorage.removeItem('userToken')
      // 清除状态仓库
      dispatch(clearUserInfo())
      dispatch(changeUserStatus(false))
      //跳转到首页
      navigate('/')
    }
  }

  if (isLogin) {
    // 已登录
    const content = (
      <List dataSource={['个人中心', '退出登录']}
        renderItem={(item) => {
          return (
            <List.Item style={{ cursor: "pointer" }} onClick={() => { handleListClick(item) }}>{item}</List.Item>
          )
        }}
      />
    );
    loginStatus = (
      <Popover content={content}>
        <div className={styles.avatarContainer}>
          <Avatar src={<Image src={userInfo?.avatar} preview={false} />} size='large' />
        </div>
      </Popover>
    )
  } else {
    // 未登录
    loginStatus = (
      <Button type="primary" size='large' onClick={handleLoginPopup}>登录/注册</Button>
    )
  }

  return (
    <div>
      {loginStatus}
    </div>
  );
}

export default LoginAvatar;
