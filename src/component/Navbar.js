import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBox, faSearch, faShoppingBag, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import * as types from "../constants/product.constants";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // 현재 경로 확인
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = [
    { name: "전체 상품", path: "product" },
    { name: "신상", path: "new" },
    { name: "인기", path: "hottest" },
    { name: "세일", path: "discounted" },
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      let searchKeyword = event.target.value;
      if (searchKeyword === "") {
        dispatch({ type: types.SET_SEARCH_KEYWORD, payload: "" });
        return navigate("/");
      }
      dispatch({ type: types.SET_SEARCH_KEYWORD, payload: searchKeyword });
      navigate(`?name=${searchKeyword}`);
    }
  };
  const logout = () => {
    dispatch(userActions.logout());
  };
  const showSearchBoxOnPage = !["/hottest"].includes(location.pathname); // 특정 경로에서 검색 바 숨김

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품 검색"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index} onClick={() => navigate(`/${menu.path}`)}>{menu.name}</button>
          ))}
        </div>
      </div>
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>로그아웃</span>
                )}
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>로그인</span>}
              </div>
            )}
            <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`쇼핑백(${cartItemCount || 0
                  })`}</span>
              )}
            </div>
            <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>
                  내 주문
                </span>
              )}
            </div>
            {user && user.level === "admin" && (
              <Link
                to="/admin/product?page=1"
                className="nav-icon"
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <FontAwesomeIcon icon={faUserTie} />
                {!isMobile && <span style={{ cursor: "pointer" }}>관리자 페이지</span>}
              </Link>
            )}
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={300} height={100} src="/image/logo.png" alt="logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link to={`/${menu.path}`}>{menu.name}</Link>
            </li>
          ))}
        </ul>
        {!isMobile && showSearchBoxOnPage && ( // 특정 경로에서 검색 바 숨김
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="제품검색"
              onKeyPress={onCheckEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
