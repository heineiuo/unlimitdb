import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spin from '@react-web/spin'
import { match, when } from 'match-when'
import Logged from "./Logged"
import UnLogged from './Unlogged'
import Header from './accountHeader'
import { checkLogin, sendVerifyCode, getAuthCodeAndRedirect } from './'

class Check extends Component {

  static defaultProps = {
    account: {},
    checkLogin: () => {},
    getAuthCodeAndRedirect: () => {}
  };

  render (){
    const {loginChecked, logged} = this.props;
    return (
      <div>
        <Header />
          {match(loginChecked, {
            [when(false)]: () => <Spin />,
            [when()]: () => 
              match(logged, {
                [when(true)]: () => <Logged />,
                [when()]: () => <UnLogged />
              })
          })}
      </div>
    )
  }
}


export default connect(
  (store) => ({
    loginChecked: store.account.loginChecked,
    logged: store.account.logged,
    postList: store.postList,
  }),
  (dispatch) => bindActionCreators({
    checkLogin, 
    sendVerifyCode, 
    getAuthCodeAndRedirect
  }, dispatch)
)(Check)
