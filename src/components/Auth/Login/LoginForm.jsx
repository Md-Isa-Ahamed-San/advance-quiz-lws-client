/* eslint-disable no-extra-boolean-cast */
import logo from "../../../assets/logo.svg"
import { useForm } from "react-hook-form"

import Field from "../../Common/Field.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../../hooks/useAuth.js";
import {useEffect} from "react";
const LoginForm = () => {
  const {setAuth,auth} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
      setError
  } = useForm();
const navigate = useNavigate();
// console.log(auth)
  const submitForm = async (formData) => {
    // console.log(formData);
    try {
      let response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
          formData
      );

      // console.log(response)
      if (response.status === 200) {
        const {tokens,user} = response.data.data;
        if(tokens){
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          // console.log(user,authToken,refreshToken)
          setAuth({user,authToken,refreshToken});
          // navigate("/")
        }

      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth, navigate]);
    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} className="h-7"/>
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>


            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">

                <Field htmlFor="email" label="Email" error={errors.email}>
                  <input {...register("email", {
                    required: "Email is required"
                  })} placeholder="Email address" type="email" id="email"
                         className={`w-full px-4 py-3 rounded-lg border ${!!errors.email ? "border-red-500" : "border-gray-300"} `}/>
                </Field>
              </div>


              <div className="mb-6">
                <Field htmlFor="password" label="Enter your Password" error={errors.password}>
                  <input {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })} type="password" id="password" className="w-full px-4 py-3 rounded-lg border border-gray-300"
                         placeholder="Password"/>
                </Field>
              </div>
             
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg mb-4">Sign in</button>
            </form>
            <p>{errors?.root?.random?.message}</p>

            <div className="text-center">
              <a href="#" className="text-primary">Forgot Password</a>
            </div>

            <div className="mt-8">
              <p className="text-center">No Account ? <NavLink to="/register" className="text-primary">Sign up</NavLink>
              </p>
            </div>
          </div>
        </div>
    );
};

export default LoginForm;