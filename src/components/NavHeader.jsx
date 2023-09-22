import { NavLink } from "react-router-dom";
import { Input, Space, Select, Button } from "antd";

function navHeader() {
  return (
    <div className="headerContainer">
      {/* 头部logo */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 头部导航 */}
      <nav className="navContainer">
        <NavLink to='/' className='navigation'>问答</NavLink>
        <NavLink to='/books' className='navigation'>书籍</NavLink>
        <NavLink to='/interviews' className='navigation'>面试题</NavLink>
        <a href='https://www.bilibili.com/' className='navigation' target="_blank" rel="noreferrer">视频教程</a>
      </nav>
      {/* 搜索框 */}
      <div className="searchContainer">
        <Space.Compact>
          <Select defaultValue='issue' size="large">
            <Select.Option value='issue'>问答</Select.Option>
            <Select.Option value='book'>书籍</Select.Option>
          </Select>
          <Input.Search placeholder="请输入要搜索的内容" size="large" allowClear enterButton='搜索' />
        </Space.Compact>
      </div>
      {/* 登录按钮 */}
      <div className="loginBtnContainer">
        <Button type="primary" size='large'>注册/登录</Button>
      </div>
    </div>
  );
}

export default navHeader;
