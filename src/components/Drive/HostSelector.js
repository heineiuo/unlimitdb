import React, { Component } from 'react'
import { Link } from 'react-router'
import Card from 'react-sea/lib/Card'
import Button from 'react-sea/lib/Button'
import { StyleSheet, css } from 'aphrodite'

class HostSelector extends Component {

  static defaultProps = {
    style: {}
  };

  state = {
    hostName: '',
    page: 1
  };

  _openHostCreateModal = () => {
    this.props.closeDropdown();
    this.props.openHostCreateModal()
  };

  _deleteHost = (host) => {
    console.log(host);
    this.props.deleteHost(host.hostname)
  };

  render(){
    const {style, host} = this.props;
    const {hostList} = host;

    return (
      <div style={style}>
        <Card>
          <div className={css(styles.hostList)}>
            {(() => {
              return hostList.map((item, index)=>{
                return (
                  <div className={css(styles.hostItem)} key={index}>
                    <Link to={`/drive/${item.hostname}`} style={{float: 'left'}} onClick={this.props.closeDropdown}>
                      <div>{item.hostname}</div>
                    </Link>
                    <div className={css(styles.buttons)} style={{float: 'left'}}>
                      <Button onClick={(e) => this._deleteHost(item)} type="danger" size="small">删除</Button>
                    </div>
                  </div>
                )
              })
            })()}
          </div>
          <div>
            <Button size="normal" onClick={this._openHostCreateModal}>添加</Button>
          </div>
        </Card>
      </div>

    )
  }
}


const styles = StyleSheet.create({
  titlebar: {
    marginBottom: 20,
    ':after': {
        clear: 'both',
        content: '',
        display: 'table'
      }
  },

  hostItem: {
    boxSizing: 'border-box',
    padding: 5,
    height: 42,
    lineHeight: '42px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between'
  }

});

export default module.exports = HostSelector