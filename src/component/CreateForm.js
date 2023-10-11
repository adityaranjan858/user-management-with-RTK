import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { submitForm } from '../features/formSlice'
import { useNavigate } from 'react-router-dom'
import style from "./CreateForm.module.css"

const CreateForm = () => {
    const [inputValue, setInputValue] = useState({
        name : "",
        role : "",
        email : "",
        gender : ""
    })
    const [errors, setErrors] = useState({
        name: "",
        role: "",
        email: "",
        gender: ""
    });
    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateForm =()=>{
        let valid = true;
        const newErrors = {...errors}

    if (inputValue.name.trim() === "") {
        newErrors.name = "* Please enter your name";
        valid = false;
    } else {
        newErrors.name = "";
    }

    if (inputValue.role.trim() === "") {
        newErrors.role = "* Please enter your role";
        valid = false;
    } else {
        newErrors.role = "";
    }

    if (inputValue.email.trim() === "") {
        newErrors.email = "* Please enter your email";
        valid = false;
    } else {
        newErrors.email = "";
    }

    if (!inputValue.gender) {
        newErrors.gender = "* Please select your gender";
        valid = false;
    } else {
        newErrors.gender = "";
    }

        setErrors(newErrors)
        return valid
    }
  
    const inputValueHandler = (e) => {
          setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
          });

        const newErrors = { ...errors };
        newErrors[e.target.name] = "";
        setErrors(newErrors);
      };

    const submitHandler=(e)=>{
        e.preventDefault()
        if(validateForm()){
            dispatch(submitForm(inputValue))
            setInputValue("")
            navigate("/")
        }
    }
  

    return (
        <>
            <form className='w-50 mx-auto' onSubmit={submitHandler}>
                
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" name="name" id="" value={inputValue.name } onChange={inputValueHandler} placeholder="write your name..." />
                    {errors.name && <small className={style.errors}>{errors.name}</small>}
                </div>
                <div className="form-group mt-3">
                    <label>Role</label>
                    <input type="text" className="form-control" name="role" id="" value={inputValue.role } onChange={inputValueHandler} placeholder="write your role..." />
                    {errors.role && <small className={style.errors}>{errors.role}</small>}
                </div>
                <div className="form-group mt-3">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" id="" value={inputValue.email} onChange={inputValueHandler} placeholder="write your email..." />
                    {errors.email && <small className={style.errors}>{errors.email}</small>}
                </div>
                <div className='d-flex mt-3'>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" id=""  value="male"
            checked={inputValue.gender === "male"} onChange={inputValueHandler}/>
                            Male
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" id=""  value="female"
            checked={inputValue.gender === "female"} onChange={inputValueHandler}/>
                            Female
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="gender" id=""  value="others"
            checked={inputValue.gender === "others"} onChange={inputValueHandler}/>
                            Others
                        </label>
                    </div>
                </div>
                {errors.gender && <small className={style.errors}>{errors.gender}</small>}
                <div className='mt-5 d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary px-5" >Submit</button>
                <button type="submit" className="btn btn-primary px-5 mx-4" >Cancel</button>
                </div>
            </form>
        </>
    )
}

export default CreateForm;