import React, { useContext, useState, useEffect } from 'react';
import 'components/Header/Header.scss';
import { Layout, Menu, Row } from 'antd';
import logo from 'assets/pictures/logo.png';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from 'services/context';
import firebase from 'services/firebase';

const { Header } = Layout;

function LayoutHeader() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState([]);

  useEffect(() => {
    setSelectedMenu([location.pathname.split('/')[1] || 'ranking']);
  }, [location.pathname]);

  const logout = () => {
    firebase.auth().signOut();
    history.replace('/');
  };

  const onClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      setSelectedMenu(['ranking']);
    } else {
      setSelectedMenu([key]);
    }
  };

  return (
    <Header className="header">
      <Row justify="space-between">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>KEYFORGE HÀ NỘI RANKING</span>
        </div>
        <Row justify="end">
          <Menu
            className="header__menu"
            mode="horizontal"
            theme="dark"
            onClick={onClick}
            selectedKeys={selectedMenu}
          >
            <Menu.Item key="ranking">
              <Link to="/ranking">Ranking</Link>
            </Menu.Item>
            <Menu.Item key="history">
              <Link to="/history">Match history</Link>
            </Menu.Item>
            <Menu.Item key="bonus">
              <Link to="/bonus">Event bonus</Link>
            </Menu.Item>
            {!currentUser ? (
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="logout">
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            )}
          </Menu>
        </Row>
      </Row>
    </Header>
  );
}

export default LayoutHeader;
