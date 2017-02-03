import {StyleSheet, css} from 'aphrodite/no-important'

const styles = StyleSheet.create({
  card: {
    width: 480,
    height: 618,
    margin: '60px auto 0',
    padding: '70px 92px 30px 92px',
    background: '#fff',
    fontSize: 14,
    borderRadius: 2,
    boxShadow: '0 2px 3px rgba(213,213,213,0.7)'
  },

  logo: {
    width: 200,
    height: 200,
    textAlign: 'center',
    margin: '0 auto',
    fontSize: 43,
    fontFamily: 'Serif',
    color: '#333',
    lineHeight: '55px',
    fontWeight: 'bold'
  },

  tabbar: {
    textAlign: 'center',
    fontSize: 17,
    borderBottom: '1px solid #E9E9E9',
    color: '#41464b',
    marginBottom: 20
  },

  tab: {
    display: 'inline-block',
    height: 40,
    lineHeight: '20px',
    width: 80,
    margin: '0 20px -1px',
    borderBottom: '2px solid transparent',
    opacity: 0.65,
    transition: 'all .25s ease',
    cursor: 'pointer',

    ':hover': {
      borderBottom: '2px solid #8f9396',
      opacity: 1
    }
  },

  'tab--active': {
    borderBottom: '2px solid #8f9396',
    opacity: 1
  },

  errorMsg: {
    display: 'none'
  },

  'errorMsg--show': {
    display: 'block'
  },

  clearfix: {
    flex: 1,
    padding: '10px 0',
    ':after': {
      display: 'table',
      clear: 'both',
      content: '""',
    }
  },

  forgot: {
    float: 'left',
    cursor: 'pointer',
    color: '#333',
    textDecoration: 'none'
  },

  registerBtn: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: '#333',
    float: 'right'
  }
});

export default module.exports = styles