import React, {Component} from 'react'
import AsyncComponent from '../common/AsyncComponent'
import {injectAsyncReducer} from '../../store'
import host from '../../store/host'
import file from '../../store/file'
import nav from '../../store/nav'

const AsyncDrive = (props) => {
  injectAsyncReducer('host', host);
  injectAsyncReducer('file', file);
  injectAsyncReducer('nav', nav);

  return (
    <AsyncComponent load={
      (callback) => {
        //callback(require('./Master'));
        require.ensure([], (require) => callback(null, require('./Master')))
      }
    }>
      {(state, Master) => (
        state < 2 ? null: <Master {...props}/>
      )}
    </AsyncComponent>
  );
};

export default AsyncDrive