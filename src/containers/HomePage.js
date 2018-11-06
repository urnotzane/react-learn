import { connect } from "react-redux";
import HomePage from "../components/HomePage";
import fetchRequestIfNeeded from "../middleware/api";
import { saveData } from "../actions";

const mapStateToProps = state => ({
  // MenuList: state.commonData.MenuList || {}
});

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, params, method) =>
    dispatch(fetchRequestIfNeeded(url, params, method)),
  saveData: (data, dataName) => dispatch(saveData(data, dataName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
