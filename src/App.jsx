import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, message } from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import LoginForm from './components/LoginForm';
import { getInfoApi, getUserByIdApi } from './api/user';

import RouteBefore from './router/RouteBefore';

const { Header, Content, Footer } = Layout;
import './css/App.css'
import { changeUserStatus, initUserInfo } from './redux/userSlice';

function App() {
  let [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  // 加载根组件时 恢复用户登录状态
  useEffect(() => {
    async function fetchData() {
      const result = await getInfoApi()
      if (result.data) {
        // 说明token有效
        // 获取该id对应的用户信息 存储到状态仓库
        const { data } = await getUserByIdApi(result.data._id)
        // 存储到状态仓库
        dispatch(initUserInfo(data))
        dispatch(changeUserStatus(true))
      } else {
        // 说明token过期了
        message.warning(result.msg)
        // 移除token
        localStorage.removeItem('userToken')
      }
    }
    if (localStorage.getItem('userToken')) {
      fetchData()
    }
  }, [dispatch])

  /**
   * 关闭弹框
   */
  function closeModal() {
    setIsModalOpen(false)
  }

  // 处理登录注册
  function handleLoginPopup() {
    //打开弹框
    setIsModalOpen(true)
  }


  return (
    <div className='app'>
      <Header>
        <NavHeader handleLoginPopup={handleLoginPopup} />
      </Header>
      <Content className='content'>
        <RouteBefore />
      </Content>
      <Footer>
        <PageFooter />
      </Footer>
      {/* 注册/登录弹框 */}
      <LoginForm isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  )
}

export default App
