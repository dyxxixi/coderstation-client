import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter><App /></BrowserRouter>
  </ConfigProvider>
)
