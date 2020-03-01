import React from 'react';
import { Layout } from 'antd';
import Header from 'components/Header';
import 'components/Layout/Layout.scss';

const { Content, Footer } = Layout;

function AppLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <Content className="layout__content">{children}</Content>
      <Footer className="layout__footer">Copyright © 2020 Keyforge Hanoi</Footer>
      <div className="layout__background layout__background_left" />
      <div className="layout__background layout__background_right" />
    </div>
  );
}

export default AppLayout;
