import { useState, useRef, useEffect } from 'react';
import { Modal, Radio, Form, Input, Row, Col, Checkbox, Button, message } from 'antd';

import styles from '../css/loginForm.module.css'

import { getCaptchaApi, userIsExitApi, registerUserApi, loginApi, getUserByIdApi } from '../api/user'

import { initUserInfo, changeUserStatus } from '../redux/userSlice';
import { useDispatch } from 'react-redux'


import PropTypes from 'prop-types'
LoginForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

function LoginForm({ isModalOpen, closeModal }) {

  const [value, setValue] = useState(1)
  const loginFormRef = useRef()
  const registerFormRef = useRef()

  const dispatch = useDispatch()

  //登录表单的状态数据 
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: false
  })

  // 注册表单的状态数据
  const [registerInfo, setRegisterInfo] = useState({
    loginId: '',
    nickname: '',
    captcha: ''
  })

  const [captcha, setCaptcha] = useState(null)


  useEffect(() => {
    // 接收验证码
    handleCaptchaClick()
  }, [isModalOpen])

  // 点击确定后
  function handleOk() {
    console.log('确认');
  }

  function handleChange(e) {
    setValue(e.target.value)
    handleCaptchaClick()
  }

  /**
   * 处理登录
   */
  async function handleLogin() {
    const result = await loginApi(loginInfo)
    if (result.data) {
      //接下来有3种情况 1.密码不正确 2.账户被冻结 3.正常登录
      const data = result.data
      if (!data.data) {
        message.error("账户或密码不正确")
        handleCaptchaClick()
      } else if (!data.data.enabled) {
        message.warning("账户被冻结，请联系管理员")
        handleCaptchaClick()
      } else {
        // 正常登录
        // 存储token
        localStorage.userToken = data.token
        // 将用户信息存入数据仓库
        // 先根据id获取用户信息
        const result = await getUserByIdApi(data.data._id)
        // 存仓库 和注册情况一样
        dispatch(initUserInfo(result.data))
        dispatch(changeUserStatus(true))
        handleCancel()
      }

    }
    else {
      // 验证码错误
      message.warning(result.msg)
      handleCaptchaClick()
    }
  }

  // 处理登录注册成功后的弹窗关闭
  function handleCancel() {
    setLoginInfo(
      {
        loginId: '',
        loginPwd: '',
        captcha: '',
        remember: false
      }
    )
    setRegisterInfo(
      {
        loginId: '',
        nickname: '',
        captcha: ''
      }
    )
    closeModal()
  }

  /**
   * 处理注册
   */
  async function handleRegister() {
    const result = await registerUserApi(registerInfo)
    if (result.data) {
      message.success("用户注册成功，密码默认为123456")
      // 将用户信息存储在用户仓库里
      dispatch(initUserInfo(result.data))
      // 改变仓库里用户的登录状态
      dispatch(changeUserStatus(true))
      // 清空input并关闭弹窗
      handleCancel()
    } else {
      // 验证码错误
      message.warning(result.msg)
      handleCaptchaClick()
    }
  }

  /**
   * 
   * @param {*} oldInfo 之前整体的状态
   * @param {*} newContent 用户输入的新的内容
   * @param {*} key 对应的键名
   * @param {*} setInfo 修改状态值的函数
   */
  function updateInfo(oldInfo, newContent, key, setInfo) {
    const obj = { ...oldInfo }
    obj[key] = newContent
    setInfo(obj)
  }

  // 处理验证码点击
  async function handleCaptchaClick() {
    const result = await getCaptchaApi()
    setCaptcha(result)
  }

  // 验证登录状态是否存在
  async function checkLoginIdIsExist() {
    if (registerInfo.loginId) {
      const { data } = await userIsExitApi(registerInfo.loginId)
      if (data) {
        // 用户已存在
        return Promise.reject("该用户已经被注册")
      }
    }
  }

  let container = null
  if (value === 1) {
    // 登录面板的jsx
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={handleLogin}
          ref={loginFormRef}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={handleCaptchaClick}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
              checked={loginInfo.remember}
            >记住我</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    // 注册面板的jsx
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={handleRegister}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              { validator: checkLoginIdIsExist }
            ]}
            validateTrigger='onBlur'
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
            />
          </Form.Item>

          <Form.Item
            label="用户昵称"
            name="nickname"
          >
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={handleCaptchaClick}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <Modal title="登录/注册" open={isModalOpen} onOk={handleOk} onCancel={closeModal}>
      <Radio.Group
        className={styles.radioGroup}
        value={value}
        onChange={handleChange}
        buttonStyle='solid'
      >
        <Radio.Button className={styles.radioButton} value={1}>登录</Radio.Button>
        <Radio.Button className={styles.radioButton} value={2}>注册</Radio.Button>
        {/* 显示对应的内容 */}
        {container}
      </Radio.Group>
    </Modal>
  );
}

export default LoginForm;
