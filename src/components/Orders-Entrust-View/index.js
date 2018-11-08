import React from "react";
import PageHeader from './PageHeader'
import './index.less'
import { SearchForm } from '../../containers/Orders-Entrust-View'

class OrdersEntrustView extends React.Component {
  componentDidMount() {
    console.log(this)
  }
  render() {
    return (
      <div className="OrdersEntrustView-container">
        <PageHeader />
        <div className="main-content">
          <SearchForm />
        </div>
      </div>
    )
  }
}
export default OrdersEntrustView;
