import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, showForm } from "../features/formSlice";
import { Link } from "react-router-dom";
import style from "./Users.module.css";

const Users = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDeleteUser = (e, userId) => {
    e.preventDefault()
    dispatch(deleteUser(userId))
  };

  return (
    <>
      <div className="container">
        <Link className="bg-primary text-white py-2 px-3 rounded-pill text-decoration-none fw-semibold" to="/createform" onClick={() => dispatch(showForm(true))}> <i className="fa-solid fa-user-plus"></i> Create User</Link>
        <h4 className="text-center text-decoration-underline text-white ">User Details</h4>
        <div className="row justify-content-center ">

          {userDetails.loading ? (
            <h4 className="text-center mt-4 text-white">User Details are Loading...</h4>
          ) : (
            userDetails.error ? (
              <h4 className="text-center mt-4 text-white">{userDetails.error}</h4>
            ) : (

              Array.isArray(userDetails.user) && userDetails.user.length > 0 &&
              userDetails.user.filter(findData => {
                if (userDetails.searchData.length === 0) {
                  return findData
                } else {
                  const regex = new RegExp(userDetails.searchData, "i");
                  return (findData.name.match(regex) || findData.email.match(regex));
                }
              }).map((data) => (
                <div key={data.id} className="col-md-6 col-md-6 col-xl-3 my-2 text-center">
                  <div className="card h-100" style={{ backgroundColor: "#42607d", color: "white" }}>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title mb-5">{data.name}</h5>
                        <h6 className="card-subtitle mb-2 ">
                          {data.email}
                        </h6>
                        <h6 className="card-subtitle mb-2">
                          {data.role}
                        </h6>
                        <p className="card-text">{data.gender}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Link to={`/update/${data.id}`} className={style.edit_btn}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link
                          to=""
                          onClick={(e) => handleDeleteUser(e, data.id)}
                          className={style.del_btn}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )))
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
