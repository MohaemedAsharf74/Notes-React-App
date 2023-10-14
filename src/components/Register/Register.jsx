import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  async function submet(values) {
    setLoading(true)
    let { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values).catch((error) => {
      setError(error.response.data.msg)
      setLoading(false)
    })
    if (data.msg === 'done') {
      setLoading(false)
      navigate('/Login')
    }
    console.log(data);

  }
  let phoneregex = /^01[01235][0-9]{8}$/
  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'name minlenght is 3').max(10, 'name maxlenght is 10').required('name is requried'),
    email: Yup.string().email('email is invalid').required('email is requried'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is invalid').required('password is requried'),
    age: Yup.number().required('age is requried').min(18, 'you must be > 18').max(60, 'you must be < 60'),
    phone: Yup.string().matches(phoneregex, 'phone is invalid').required('phone is requried')
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    onSubmit: submet,
    validationSchema
  });
  return <>
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row `}>
        <div className="image-container col-md-8 m-0 p-md-0">
          <img src={regsiterImage} className="w-100" alt="RegsiterImage" />
        </div>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5 py-3">
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          {error ? <div className="alert alert-danger mt-2 p-3">{error}</div> : ''}
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className="form-control" placeholder="Username" name="name" id="name" />
            {formik.errors.name && formik.touched.name ? <p className="error">{formik.errors.name}</p> :
              ''}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className="form-control" placeholder="Email" name="email" id="email" />
            {formik.errors.email && formik.touched.email ? <p className="error">{formik.errors.email}</p> :
              ''}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className="form-control" placeholder="Password" name="password" id="password" />
            {formik.errors.password && formik.touched.password ? <p className="error">{formik.errors.password}</p> :
              ''}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.age} type="text" inputMode="numeric" className="form-control" placeholder="Age" name="age" id="age" />
            {formik.errors.age && formik.touched.age ? <p className="error">{formik.errors.age}</p> :
              ''}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" inputMode="numeric" className="form-control" placeholder="Phone" name="phone" id="phone" />
            {formik.errors.phone && formik.touched.phone ? <p className="error">{formik.errors.phone}</p> :
              ''}
            {loading ? <button className='btn m-auto' type='button'><ThreeDots
              height="50"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /></button> : <button disabled={!formik.isValid && formik.dirty} type="submit" className="btn btn-primary"> Create account</button>}
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  </>
}
