import { connect } from 'react-redux'
import HomePage from '../components/HomePage'
import fetchRequestIfNeeded from "../middleware/api";


const mapStateToProps = (state) => ({
  NavData: state.fetchData.NavData || { isFetching: false }
})

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, params, dataName, method) => dispatch(fetchRequestIfNeeded(url, params, dataName, method))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)