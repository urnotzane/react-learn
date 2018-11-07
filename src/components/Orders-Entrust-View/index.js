import React from "react";
import PageHeader from './PageHeader'
import './index.less'
import SearchForm from './SearchForm'

const OrdersEntrustView = () => (
  <div className="OrdersEntrustView-container">
    <PageHeader />
    <div className="main-content">
      <SearchForm />
    </div>
  </div>
)
export default OrdersEntrustView;
