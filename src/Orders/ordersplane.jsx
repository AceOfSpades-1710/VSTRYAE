import React, { useState, useEffect } from "react";
import "./ordersplane.css";
import OrderBox from "./orderbox";
import dress1 from "../assets/items/bg2.jpg";
import dress2 from "../assets/items/bg3.jpg";

const OrdersPlane = ({ filters, orders: initialOrders = [] }) => {

  /* STATEFUL ORDERS */
  const [orders, setOrders] = useState(initialOrders.length ? initialOrders : [
    {
      id: 1,
      title: "Desi Traditional",
      image: dress1,
      mode: "Buy",
      size: "S",
      price: 8000,
      status: "Delivered",
      orderNo: "XYZ000",
      orderedOn: "Jan 27, 2026",
      deliveredOn: "Jan 30, 2026",
      customer: "SJ",
      address: "Delhi | 110084",
      dealer: "PS",
      dealerContact: "+91 0000000000"
    },
    {
      id: 2,
      title: "Suit",
      image: dress2,
      mode: "Rent",
      size: "L",
      price: 17000,
      status: "Placed",
      orderNo: "XYZ005",
      orderedOn: "Jan 27, 2026",
      deliveredOn: "-",
      customer: "SJ",
      address: "Delhi | 110084",
      dealer: "PS",
      dealerContact: "+91 0000000000"
    }
  ]);

  useEffect(() => {
    if (initialOrders && initialOrders.length) {
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  /* ACTION HANDLER */
  const updateOrder = (id, action) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== id) return order;

        // CANCEL (only if NOT delivered)
        if (action === "cancel" && order.status !== "Delivered") {
          return {
            ...order,
            status: "Cancelled",
            deliveredOn: "-"
          };
        }

        // RETURN (only if delivered)
        if (action === "return" && order.status === "Delivered") {
          return {
            ...order,
            status: "Return Scheduled"
          };
        }

        return order;
      })
    );
  };

  /* FILTERING (unchanged logic) */
  const filteredOrders = orders.filter(order => {

    if (filters.size.length &&
        !filters.size.includes(order.size)) return false;

    if (filters.orderType.length &&
        !filters.orderType.includes(order.status)) return false;

    if (filters.state.length &&
        !filters.state.includes(order.state)) return false;

    if (order.price > filters.price) return false;

    if (
      filters.search &&
      !order.title.toLowerCase()
        .includes(filters.search.toLowerCase())
    ) return false;

    return true;
  });

  return (
    <div className="ordersplane">
      {filteredOrders.length === 0 ? (
        <div className="orders-empty">
          <h2>No Drip Ordered</h2>
          <p>Try different filters or order something fresh.</p>
        </div>
      ) : (
      filteredOrders.map(order => (
        <div className="ordersplane-row" key={order.id}>
          <OrderBox
            order={order}
            onAction={updateOrder}
          />
        </div>
      ))
      )}
    </div>
  );
};

export default OrdersPlane;