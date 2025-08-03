import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

// Validation Schema
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  passw: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must contain upper, lower, number & special char"
    ),
  age: z.coerce.number().min(1, "Age must be a positive number"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3008/api/auth/r", data);
      toast.success("User registered successfully");
      reset();
    } catch (err) {
      if (err?.response?.status === 409) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("Something went wrong");
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-[url('/assets/img/hero/hero-1.jpg')] bg-cover bg-center"></div>

      <ToastContainer />

      <div className="relative z-10 w-full max-w-md p-6 rounded-xl shadow-lg ">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-orange-600">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-orange-600">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border text-white border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-orange-600">Password</label>
            <input
              type="password"
              {...register("passw")}
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter a strong password"
            />
            {errors.passw && <p className="text-sm text-red-500 mt-1">{errors.passw.message}</p>}
          </div>

          {/* Age */}
          <div className="mb-6">
            <label className="block font-medium mb-1 text-orange-600">Age</label>
            <input
              type="number"
              {...register("age")}
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;



