import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.js';

const AuthForm = () => {
  const {onLogin}=useAuth()
  const navigate=useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email:"",
    password:"",
    userName:""
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/auth/${isLogin ? 'login' : 'signup'}`;
  
    try {
      const response = await axios.post(url, {
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {} : { userName: formData.userName }),
      });
      if (isLogin) {
        onLogin(response.data.token,response.data.user.userName)
        navigate("/home")
      } else {
        setIsLogin((prev) => !prev);
        toast.success('Signup successful, please login.');
      }

    } catch (error) {
      toast.error(error.response?.data?.msgError);
    }
  };
console.log(formData)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block">Username</label>
              <input onChange={(e)=>setFormData({...formData,userName:e.target.value})} type="text" placeholder="Username" id="username"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
          )}
          <div className="mt-4">
            <label htmlFor="email" className="block">Email</label>
            <input onChange={(e)=>setFormData({...formData,email:e.target.value})} type="email" placeholder="Email" id="email"
                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block">Password</label>
            <input onChange={(e)=>setFormData({...formData,password:e.target.value})} type="password" placeholder="Password" id="password"
                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
          </div>
          <div className="flex items-baseline justify-between">
            <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Submit</button>
            <button type="button" onClick={toggleForm} className="text-sm text-blue-600 hover:underline">
              {isLogin ? 'Create account' : 'Already have an account?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
