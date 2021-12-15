import React from "react";
import { Input } from "antd";
const { Search } = Input;

function SearchInput({ onSubmit, searchVal, onSearchChange }) {
  const onChange = (e) => {
    const searchValue = e.target.value;
    onSearchChange(searchValue.trim());
  };

  const onSearchSubmit = (searchVal) => {
    onSubmit(searchVal);
  };

  return (
    <>
      <Search
        placeholder="Search by category"
        allowClear
        value={searchVal}
        onChange={onChange}
        onSearch={onSearchSubmit}
      />
    </>
  );
}

export default React.memo(SearchInput);
