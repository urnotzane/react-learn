import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import fetchRequestIfNeeded from "../middleware/api";
import { saveData } from "../actions";

const mapStateToProps = state => ({
  LoginData: state.fetchData || { isFetching: false }
});

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, params, method) =>
    dispatch(fetchRequestIfNeeded(url, params, method)),
  saveData: (data, dataName) => dispatch(saveData(data, dataName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
