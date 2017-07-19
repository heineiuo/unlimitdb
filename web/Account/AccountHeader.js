import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DropDown, {DropDownTrigger, DropDownContent} from 'react-sea/lib/DropDown'
import {StyleSheet, css} from 'aphrodite'
import Paper from 'react-sea/lib/Paper'
import Modal from 'react-modal'
import Input from 'react-sea/lib/Input'
import Button from 'react-sea/lib/Button'
import Title from '../components/Title'
import ProfileDropDown from '../components/ProfileDropDown'
import commonStyles from '../components/styles'

class Header extends Component {

  state = {
    hostName: '',
    modalOpen: false,
  };

  closeDropdown = () => {
    this.dropdown.hide()
  };

  _createHost = () => {
    this.props.createHost({hostname: this.state.hostName});
    this.setState({modalOpen: false})
  };

  handleClickOpenModal = () => {
    this.setState({
      modalOpen: true
    })
  };

  cancel = () => {
    this.setState({
      modalOpen: false
    })
  };

  render(){
    const {nav, host, getHostList, deleteHost} = this.props;

    return (
      <div className={css(styles.globalHeaderBar)}>
        <Title color="rgb(255, 145, 0)" title="账号" />
        {/*<div>{nav.title}</div>*/}
        <ProfileDropDown />

      </div>
    )
  }
}

const customStyles = {
  overlay : {
    position : 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '380px',
    padding: '0px',
    borderRadius: 0,
    border:0,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const styles = StyleSheet.create({
  ...commonStyles
});

export default module.exports = Header