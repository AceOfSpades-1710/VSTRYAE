import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FollowCursor from '../crsr'
import Loader from '../loader'
import Nav from '../nav'
import Footer from '../footer'
import ShopNav from './shopnav'
import Article from './article'

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------------- INITIAL STATE FROM URL ---------------- */
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    size: searchParams.getAll("size"),
    huntMode: searchParams.getAll("mode"),
    state: searchParams.getAll("state"),
    price: searchParams.get("price")
      ? Number(searchParams.get("price"))
      : Infinity,
  });

  /* ---------------- SYNC STATE → URL ---------------- */
  useEffect(() => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.price !== Infinity) params.price = filters.price;

    if (filters.size.length) params.size = filters.size;
    if (filters.huntMode.length) params.mode = filters.huntMode;
    if (filters.state.length) params.state = filters.state;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />
      <ShopNav filters={filters} setFilters={setFilters}/>
      <Article filters={filters} />
      <Footer />
    </>
  )
}

export default Shop
