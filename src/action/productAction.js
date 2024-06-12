import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

//상품 가져오기
const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get("/product", {
      params: { ...query }
    });
    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: errorMessage });
  }
};



//상품 상세정보
const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/product/${id}`);
    dispatch({
      type: types.GET_PRODUCT_DETAIL_SUCCESS,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

//상품 생성
const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST });
    ///product를 호출하고, 생성할 데이터 formData를 전송
    const response = await api.post("/product", formData);
    dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
    dispatch(commonUiActions.showToastMessage("상품이 등록되었습니다.", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: errorMessage });
    dispatch(commonUiActions.showToastMessage(errorMessage, "error"));
  }
};


//상품 삭제
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    const response = await api.delete(`/product/${id}`);
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS });
    dispatch(commonUiActions.showToastMessage("상품이 삭제되었습니다.", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
}


//상품 수정
const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST });
    const response = await api.put(`/product/${id}`, formData);
    dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data });
    dispatch(commonUiActions.showToastMessage("상품 정보가 수정되었습니다.", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: errorMessage });
    dispatch(commonUiActions.showToastMessage(errorMessage, "error"));
  }
};





export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
