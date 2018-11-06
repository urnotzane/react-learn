import { connect } from "react-redux";
import HomePage from "../components/HomePage";
import fetchRequestIfNeeded from "../middleware/api";
import { saveData } from "../actions";

const mapStateToProps = state => ({
  // MenuList: state.commonData.MenuList || {}
});

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, method, params) =>
    dispatch(fetchRequestIfNeeded(url,method, params, )),
  saveData: (data, dataName) => dispatch(saveData(data, dataName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
