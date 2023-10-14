import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { noteContext } from "../../Context/NoteContext";

export default function Login() {

  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let {tokens, settokens}=useContext(noteContext)
  let navigate = useNavigate()
  async function submet(values) {
    setLoading(true)
    let { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values).catch((error) => {
      setError(error.response.data.msg)
      setLoading(false)
    })
    if (data.msg === 'done') {
      setLoading(false)
      settokens(`3b8ny__${data.token}`);
      localStorage.setItem('token', tokens)
      navigate('/')
    }
    console.log(data);

  }
  let validationSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is requried'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is invalid').required('password is requried'),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submet,
    validationSchema
  });
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row `}>
        <div className="image-container col-md-8 m-0 p-md-0">
          <img src={LoginImage} className="w-100" alt="Regsiter_Image" />
        </div>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5 py-3">
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          {error ? <div className="alert alert-danger mt-2 p-3">{error}</div> : ''}
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className="form-control" placeholder="Email" name="email" id="email" />
            {formik.errors.email && formik.touched.email ? <p className="error">{formik.errors.email}</p> :
              ''}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className="form-control" placeholder="Password" name="password" id="password" />
            {formik.errors.password && formik.touched.password ? <p className="error">{formik.errors.password}</p> :
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
            /></button> : <button disabled={!formik.isValid && formik.dirty} type="submit" className="btn btn-primary"> Login </button>}

            <p>
              You don't have account yet ?
              <Link to="/Register" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
