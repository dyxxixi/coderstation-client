import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'
import './index.css'
// 引入uno.css
import 'uno.css'

import store from './redux/store.js';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter><App /></BrowserRouter>
    </ConfigProvider>
  </Provider>

)
