import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import fetchRequestIfNeeded from "../middleware/api";
import { saveData } from "../actions";

const mapStateToProps = state => ({
  LoginData: state.fetchData || { isFetching: false }
});

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, method, params) =>
    dispatch(fetchRequestIfNeeded(url, method, params)),
  saveData: (data, dataName) => dispatch(saveData(data, dataName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
