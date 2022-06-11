import React from "react";
import { FaTshirt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const forget = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  const handleChange=async(e)=>{
    if(e.target.name=='password'){
      setPassword(e.target.value);
    }
    else if(e.target.name=='cpassword'){
      setCpassword(e.target.value);
    }  
    else if(e.target.name=='email'){
      setEmail(e.target.value);
    }  
  }
  const sendResetEmail = async () => {
    if (password === cpassword) {
      let data = {
        password,
        sendMail: true,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Email has been sent");
      } else {
        console.log("error");
      }
    }
  }
    const resetPassword = async () => {
      let data = {
        email,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("passwrd has been changed");
      } else {
        console.log("error");
      }
    
  };

  return (
    <div>
      <div className="min-h-screen flex items-start justify-center pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaTshirt className="text-pink-600 text-4xl m-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={"/login"}>
                <a
                  href="#"
                  className="font-medium mx-2 text-pink-600 hover:text-pink-500"
                >
                  Login
                </a>
              </Link>
            </p>
          </div>
          {router.query.token && (
            <div>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
                    </label>
                    <input
                    onChange={handleChange}
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      autoComplete="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirm new Password
                    </label>
                    <input
                    onChange={handleChange}
                    value={cpassword}
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      autoComplete="cpassword"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div>
                  <button
                  onClick={resetPassword}
                    type="submit"
                    className="group disabled:bg-pink-400 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {/* <!-- Heroicon name: solid/lock-closed --> */}
                      <svg
                        className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Continue
                  </button>
                </div>
                {password!==cpassword&& <span className="text-red-600 text-sm">Password and Confirm Password should be Same!</span>}
                {password && password===cpassword&& <span className="text-green-600 text-sm">Password Matched!</span>}
             
            </div>
          )}
          {!router.query.token && (
            <div>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                  onChange={handleChange}
                    id="email-address"
                    name="email"
                    value={email}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendResetEmail}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: solid/lock-closed --> */}
                    <svg
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default forget;
