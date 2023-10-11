import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../features/formSlice'

const UpdateUser = () => {
    const [inputValue, setInputValue] = useState(({
        name: "",
        role: "",
        email: "",
        gender: ""
    }))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector(state => state.userDetails)

    const { id } = useParams()

    useEffect(() => {
        const singleUser = userDetails.user.filter(ele => ele.id === id)
        if (singleUser.length > 0) {
            setInputValue(singleUser[0]);
        }
    }, [id, userDetails.user])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(inputValue))
        navigate("/users")
    }

    const inputValueHandler = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <h4 className="text-center text-decoration-underline text-white ">Update</h4>
            <form className='w-50 mx-auto' onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" id="" value={inputValue && inputValue.name} onChange={inputValueHandler} placeholder="write your name..." />
                </div>
                <div className="form-group mt-3">
                    <label>Role</label>
                    <input type="text" className="form-control" name="role" id="" value={inputValue.role} onChange={inputValueHandler} placeholder="write your role..." />
                </div>
                <div className="form-group mt-3">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" id="" value={inputValue && inputValue.email} onChange={inputValueHandler} placeholder="write your email..." />
                </div>
                <div className='d-flex mt-3'>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" id="" value="male"
                                checked={inputValue && inputValue.gender === "male"} onChange={inputValueHandler} />
                            Male
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" id="" value="female"
                                checked={inputValue && inputValue.gender === "female"} onChange={inputValueHandler} />
                            Female
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" id="" value="others"
                                checked={inputValue && inputValue.gender === "others"} onChange={inputValueHandler} />
                            Others
                        </label>
                    </div>
                </div>
                <div className='mt-5 d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary px-5">Submit</button>
                    <button type="submit" className="btn btn-primary px-5 mx-4">Cancel</button>
                </div>
            </form>
        </>
    )
}

export default UpdateUser;