import React, {Component} from 'react'
import {Router, Route, IndexRoute, createRoutes} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'

import {checkLogin} from '../store/account'
import {getPostList} from '../store/feed/postList'
import Title from '../components/Title'


module.exports = (injectAsyncReducer) => {

  const connectCheckLogin = (CheckLogin) => {
    return connect(
      (store) => ({
        account: store.account,
        postList: store.postList
      }),
      (dispatch) => bindActionCreators({
        checkLogin,
      }, dispatch)
    )(CheckLogin);
  };

  const asyncHome = (partialNextState, callback) => {
    require.ensure([], (require) => {
      const Home = require('../components/Home');
      const HomeConnect = connect(
        (store) => ({
          account: store.account,
          postList: store.postList,
        }),
        (dispatch) => bindActionCreators({
          getPostList
        }, dispatch)
      )(Home.default);
      callback(null, HomeConnect)
    })
  };

  const asyncNotFound = (partialNextState, callback) => {
    require.ensure([], (require) => {
      const component = require('../components/NotFound');
      callback(null, component)
    })
  };

  const getTitle = () => Title;

  return (
    <Route component={connectCheckLogin(require('../components/CheckLogin'))}>
      <Route path="/" getComponent={asyncHome}/>
      <Route path="/drive" getChildRoutes={(location, callback) => {
        {/*console.error('this should only exec once.');*/}
        require.ensure([], (require) => {
          const routes = createRoutes(require('./drive')(injectAsyncReducer));
          callback(null, routes);
        })
      }} />
      <Route path="/account" getChildRoutes={(location, callback) => {
        require.ensure([], (require) => {
          const routes = createRoutes(require('./account')(injectAsyncReducer));
          callback(null, routes)
        })
      }} />
      <Route path="/auth" getChildRoutes={(location, callback) => {
        require.ensure([], (require) => {
          const routes = createRoutes(require('./auth')(injectAsyncReducer));
          callback(null, routes)
        })
      }} />
      <Route path="/console" getChildRoutes={async (location, callback) => {
        const admin = await SystemJS.import('smile-admin');
        const routes = createRoutes(admin({injectAsyncReducer, getTitle}));
        callback(null, routes)
      }} />
      <Route path="/integrateapp" getChildRoutes={(location, callback) => {
        require.ensure([], (require) => {
          const routes = createRoutes(require('./integrateapp')(injectAsyncReducer));
          callback(null, routes)
        })
      }} />
      <Route path="*" getComponent={asyncNotFound}/>
    </Route>
  )
};

