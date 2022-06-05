import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginScreen from './screens/login';
import Register from './screens/register';
import { Layout, Menu } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
const { Header, Footer, Content } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Router>
          <Content>
            <Routes>
              <Route path='/' element={<LoginScreen />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Content>
        </Router>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}



export default App;
