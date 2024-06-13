import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import "../style/ProductCard.css";

const ProductAllHottest = () => {
	const dispatch = useDispatch();
	const { hottestProductList, loading, error } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(productActions.getHottestProductList());
	}, [dispatch]);

	return (
		<Container>
			<Row>
				{loading ? (
					<div>Loading...</div>
				) : error ? (
					<div>{error}</div>
				) : (
					hottestProductList && hottestProductList.length > 0 ? (
						hottestProductList.map((product, index) => (
							<Col key={product._id} className="card" md={3} sm={12}>
								<ProductCard product={product} rank={index + 1} /> {/* 순위 전달 */}
							</Col>
						))
					) : (
						<div className="text-align-center empty-bag">
							<h2>등록된 상품이 없습니다.</h2>
						</div>
					)
				)}
			</Row>
		</Container>
	);
};

export default ProductAllHottest;
