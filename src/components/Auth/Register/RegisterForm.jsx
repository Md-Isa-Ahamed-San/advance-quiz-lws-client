import logo from "../../../assets/logo.svg"
import Field from "../../Common/Field.jsx";
import { useForm } from "react-hook-form"
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  const navigate = useNavigate();
  const submitForm = async (formData) => {
    // Check if the role checkbox is selected
    if (formData.role) {
      formData.role = "admin"; 
    } else {
      formData.role = "user";
    }
  
    console.log(formData);
  
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      console.log(response);
  
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  
    return (
        <div onSubmit={handleSubmit(submitForm)}
      className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
          <div className="w-full max-w-lg ">
            <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} className="h-7"/>
            </h2>
            <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

            <form className="">
              <div className="">
                <div className="mb-4">
                  <Field htmlFor="full_name" label="Full Name" error={errors.name}>
                    <input  {...register("full_name", {
                      required: "Full name is required",
                      minLength: {
                        value: 6,
                        message: "Username must be at least 6 characters"
                      }
                    })}
                            placeholder="Isa Ahamed"
                            type="text" id="full_name"
                            className={`w-full px-4 py-3 rounded-lg border ${!!errors.name ? "border-red-500" : "border-gray-300"}`}
                    />
                  </Field>
                </div>

                <div className="mb-4">
                  <Field htmlFor="email" label="Email" error={errors.email}>
                    <input {...register("email", {
                      required: "Email is required"
                    })} placeholder="Email address" type="email" id="email"
                           className={`w-full px-4 py-3 rounded-lg border ${!!errors.email ? "border-red-500" : "border-gray-300"} `}/>
                  </Field>
                </div>
              </div>

              <div className="flex  gap-4">
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


                <div className="mb-6">
                  <Field htmlFor="password" label="Confirm Password" error={errors.confirmPassword}>
                    <input {...register("confirmPassword", {
                      required: "Confirm Password is required",

                    })} type="password" id="confirmPassword"
                           className="w-full px-4 py-3 rounded-lg border border-gray-300"
                           placeholder="Confirm Password"/>
                  </Field>
                </div>
              </div>

              <div className="mb-6 flex gap-2 items-center">
                <Field htmlFor="admin" label="Register as Admin">
                  <input {...register("role")} type="checkbox" id="role"
                         className="px-4 py-3 rounded-lg border border-gray-300"/>
                </Field>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg mb-2">Create Account
              </button>
            </form>
            <p>{errors?.root?.random?.message}</p>

            <div className="mt-2 text-gray-400">
              <p className="text-center">Already have account ? <NavLink to="/login" className="text-primary">Sign
                In</NavLink></p>
            </div>
          </div>
        </div>
    );
};

export default RegisterForm;