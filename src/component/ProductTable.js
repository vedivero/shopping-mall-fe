import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm, openDiscountModal }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>
                  {item.originalPrice && item.price !== item.originalPrice ? (
                    <div>
                      <span style={{ textDecoration: 'line-through', color: 'red' }}>
                        ₩ {currencyFormat(item.originalPrice)}
                      </span>
                      <br />
                      <span>→ ₩ {currencyFormat(item.price)}</span>
                      <br />
                      <span style={{ color: "red" }}>
                        {((item.originalPrice - item.price) / item.originalPrice * 100).toFixed(0)}% 할인 적용
                      </span>
                    </div>
                  ) : (
                    currencyFormat(item.price)
                  )}
                </th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button className="mr-1" size="sm" onClick={() => openEditForm(item)}>
                    수정하기
                  </Button>
                  <Button className="mr-1" size="sm" variant="success" onClick={() => openDiscountModal(item)}>
                    세일 설정
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                  >
                    삭제
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
