import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { searchUser } from '../features/formSlice';


const Navbar = () => {
    const [searchVal, setSearchVal] = useState("")

    const totalUsers = useSelector(state => state.userDetails.user)

    const dispatch = useDispatch()

    const searchHandler = (e) => {
        setSearchVal(e.target.value)
    }

    useEffect(() => {
        dispatch(searchUser(searchVal))
    }, [searchVal])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#273f51" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{color: "#45eafd"}} to="/">User Management</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/createform">Create User</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">All Users ({totalUsers.length})</NavLink>
                            </li>
                        </ul>
                        <form className="form-inline d-flex justify-content-end my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" value={searchVal} onChange={searchHandler} placeholder="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;