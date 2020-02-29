import React from 'react';
import 'components/Header/Header.scss';
import { Layout, Menu, Row } from 'antd';
import logo from 'assets/pictures/logo.png';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

function LayoutHeader() {
  const location = useLocation();
  return (
    <Header className="header">
      <Row justify="space-between">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>Keyforge Hanoi</span>
        </div>
        <Row justify="end">
          <Menu
            className="header__menu"
            mode="horizontal"
            theme="dark"
            defaultSelectedKeys={[location.pathname.split('/')[1] || 'ranking']}
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
          </Menu>
        </Row>
      </Row>
    </Header>
  );
}

export default LayoutHeader;
