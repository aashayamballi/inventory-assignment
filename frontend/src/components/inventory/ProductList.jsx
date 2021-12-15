import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "./ProductCard";
import { disaptchProductsList } from "../../actions/inventory/action-creator";
import SearchInput from "../general/SearchInput";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.inventoryReducer);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(disaptchProductsList());
  }, []);

  const onSearchChange = (val) => {
    setSearch(val);
  };

  const onSubmit = (searchVal) => {
    dispatch(disaptchProductsList(searchVal));
  };

  if (loading) {
    return <Spin />;
  } else {
    const productsCard = products.map((data) => {
      return (
        <Col span={6} key={data.id}>
          <ProductCard
            title={data.name}
            description={data.description}
            id={data.id}
            category={data.category.categoryName}
          />
        </Col>
      );
    });

    return (
      <>
        {products.length > 0 ? (
          <Row gutter={[16, 16]}>
            <Col span={6} offset={18}>
              <SearchInput
                onSearchChange={onSearchChange}
                onSubmit={onSubmit}
                searchVal={search}
              />
            </Col>
            {productsCard}
          </Row>
        ) : (
          <h1>NO PRODUCTS</h1>
        )}
      </>
    );
  }
}

export default React.memo(ProductList);
