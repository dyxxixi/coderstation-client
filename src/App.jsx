import { Layout } from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';

import RouteConfig from './router';

const { Header, Content, Footer } = Layout;
import './css/App.css'

function App() {
  return (
    <div className='app'>
      <Header>
        <NavHeader />
      </Header>
      <Content className='content'>
        <RouteConfig />
      </Content>
      <Footer>
        <PageFooter />
      </Footer>
    </div>
  )
}

export default App
