import { connect } from "react-redux";
import OrdersEntrust from "../components/Orders-Entrust-View";
import SearchFormCom from "../components/Orders-Entrust-View/SearchForm";
import fetchRequestIfNeeded from "../middleware/api";
import { saveData } from "../actions";

const mapStateToProps = state => ({
  OrderEntrustData: state.fetchData || {}
});

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, method, params) =>
    dispatch(fetchRequestIfNeeded(url, method, params)),
  saveData: (data, dataName) => dispatch(saveData(data, dataName))
});

const OrdersEntrustView = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersEntrust)

const SearchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormCom)


export { OrdersEntrustView, SearchForm } 
