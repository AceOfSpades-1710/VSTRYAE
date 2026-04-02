import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import FollowCursor from '../crsr'
import Loader from '../loader'
import Nav from '../nav'
import Footer from '../footer'
import OrdNav from './ordnav'
import OrdersPlane from './ordersplane'

function Orders() {
    const [orderList, setOrderList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    size: [],
    orderType: [],
    state: [],
    price: 20000,
    search: "",
  });

  /* =============================
     LOAD FILTERS FROM URL
  ============================== */
  useEffect(() => {
    setFilters({
      size: searchParams.getAll("size"),
      orderType: searchParams.getAll("type"),
      state: searchParams.getAll("state"),
      price: Number(searchParams.get("price")) || 20000,
      search: searchParams.get("search") || "",
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("authUser") || "null");
        if (!user) {
          setOrderList([]);
          return;
        }
        const qs = new URLSearchParams({ email: user.email });
        const res = await fetch(`/api/orders?${qs.toString()}`);
        const data = await res.json();
        if (res.ok) {
          setOrderList(data.orders || []);
        } else {
          setOrderList([]);
        }
      } catch (err) {
        console.error(err);
        setOrderList([]);
      }
    };
    fetchOrders();
  }, []);

  /* =============================
     UPDATE URL WHEN FILTERS CHANGE
  ============================== */
  useEffect(() => {
    const params = {};

    filters.size.forEach(v => {
      params.size = params.size
        ? [].concat(params.size, v)
        : [v];
    });

    filters.orderType.forEach(v => {
      params.type = params.type
        ? [].concat(params.type, v)
        : [v];
    });

    filters.state.forEach(v => {
      params.state = params.state
        ? [].concat(params.state, v)
        : [v];
    });

    if (filters.price !== 20000) params.price = filters.price;
    if (filters.search) params.search = filters.search;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />
      <OrdNav filters={filters} setFilters={setFilters}/>
      <OrdersPlane filters={filters} orders={orderList} />
      <Footer />
    </>
  )
}

export default Orders
