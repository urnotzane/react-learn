import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import fetchRequestIfNeeded from "../middleware/api";


const mapStateToProps = (state) => ({
  LoginData: state.fetchData.LoginData || { isFetching: false }
})

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, params, dataName) => dispatch(fetchRequestIfNeeded(url, params, dataName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)