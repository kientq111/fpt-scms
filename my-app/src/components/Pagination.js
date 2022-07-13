import { Pagination } from 'antd';
import React from 'react';

const pageOnchangeHandle = (values) => {
    console.log(values);
}

const Paging = (pagesize, total) => (
    <Pagination defaultCurrent={1}
        onChange={(values) => { pageOnchangeHandle(values) }}
        total={50} />
);

export default Paging;