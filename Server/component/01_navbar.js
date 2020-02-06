import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { PagesAction } from "../redux/reduxPages/pagesAction";
import { pages } from './00_pagesIndex'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const NavigationBar = (props) => {

  //redux Pages Action
  const { pageNum, home, order, graph, profile, setting1, setting2 } = PagesAction()

  //Navigation Bar Expand or Collapse
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout >

      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />

        <Menu theme="dark" defaultSelectedKeys={[pageNum.toString()]} mode="inline">

          <Menu.Item key="1" onClick={home}>
            <Icon type="carry-out" />
            <span>Home</span>
          </Menu.Item>

          <Menu.Item key="2" onClick={order}>
            <Icon type="ordered-list" />
            <span>Order</span>
          </Menu.Item>

          <Menu.Item key="3" onClick={graph} >
            <Icon type="line-chart" />
            <span>Graph</span>
          </Menu.Item>

          <Menu.Item key="4" onClick={profile}>
            <Icon type="profile" />
            <span>Profile</span>
          </Menu.Item>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="setting"/>
                <span>Setting</span>
              </span>
            }
          >
            <Menu.Item key="5" onClick={setting1} >Setting 1</Menu.Item>
            <Menu.Item key="6" onClick={setting2} >Team 2</Menu.Item>
          </SubMenu>

        </Menu>

      </Sider>
            
      <Layout>
        <Header hidden = {true}/>
        <Content style={{ margin: '0px 16px' }}>
          
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ paddingTop: 0, background: '#fff', marginTop: 0 }}>{pages[pageNum]}</div>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' , marginBottom: 0}}>Thank you Ant Design ©2018 Created by Ant UED Developed By Fluke</Footer>
      </Layout>
    </Layout>
  );
}

export default NavigationBar