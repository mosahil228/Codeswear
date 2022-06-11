import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef,useEffect } from "react";
import {useRouter} from "next/router";

import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({logout, user,cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  // console.log(cart,addToCart,removeFromCart,clearCart,subTotal);
  // console.log(cart)
  const[dropdown,setDropdown]=useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router=useRouter();
  useEffect(() => {
    Object.keys(cart).length!==0 && setSidebar(true);
    let exempted=['/checkout','/order','/orders','/myaccount'];
    if(exempted.includes(router.pathname)){
      setSidebar(false)
    }
  }, [])
  
  const ref = useRef();
  const toggleCart = () => {
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
    setSidebar(!sidebar);
  };
  
  return (
    <>
    {!sidebar && <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="fixed top-6 z-30 right-10">
       {dropdown && <div  className="absolute right-6 bg-white top-6 rounded-md px-5 w-32 z-30">
          <ul>
          <Link href={"/myaccount"}>
              <a>
                <li className="py-1 hover:text-pink-700 font-bold text-sm">My account</li>
              </a>
            </Link>
          <Link href={"/orders"}>
              <a>
                <li className="py-1 hover:text-pink-700 font-bold text-sm">My Orders</li>
              </a>
            </Link>
           
            <li  onClick={logout} className="py-1 cursor-pointer hover:text-pink-700 font-bold text-sm">Logout</li>
          </ul>
        </div>}
        <span >{user.value && <MdAccountCircle  className="md:text-2xl text-xl mx-2" />}</span>
        
        </span>}
      <div className={`flex flex-col md:flex-row md:justify-start ${!sidebar&&"overflow-hidden"} justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white`}>
        <div className="logo mr-auto md:mx-5 ">
          <Link href={"/"}>
            <a>
              <Image src="/logo.png" width={200} height={60} alt="" />
            </a>
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}>
              <a>
                <li className="hover:text-pink-500">Tshirts</li>
              </a>
            </Link>
            <Link href={"/hoodies"}>
              <a>
                <li className="hover:text-pink-500">Hoodies</li>
              </a>
            </Link>
            <Link href={"/stickers"}>
              <a>
                <li className="hover:text-pink-500">Stickers</li>
              </a>
            </Link>
            <Link href={"/mugs"}>
              <a>
                <li className="hover:text-pink-500">Mugs</li>
              </a>
            </Link>
          </ul>
        </div>
        

        
        <div className="cursor-pointer items-center cart absolute right-0 top-6 mx-5 flex ">
        
         {!user.value &&<Link href={"/login"}><a><button className="bg-pink-600 px-2 py-1 rounded-md text-white mx-2">Login </button></a></Link>}
         
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="md:text-2xl text-xl"
          />
        </div>
        <div
          ref={ref}
          className={`w-72 h-[100vh] z-50 sideCart overflow-y-scroll absolute top-0  bg-pink-100 p-10 transition-all ${
           sidebar
              ? "right-0 "
              : "-right-96"
          }`}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold">Your cart is empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                    <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2">Subtotal : ₹{subTotal}</div>
          <div className="flex">
            <Link href={"/checkout"}>
              <button disabled={Object.keys(cart).length==0} className=" disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                <BsFillBagCheckFill className="m-1" />
                Checkout
              </button>
            </Link>
            <button
            disabled={Object.keys(cart).length==0} 
              onClick={clearCart}
              className="flex mr-2 disabled:bg-pink-300 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
              
            >
              <BsFillBagCheckFill className="m-1" />
              clearCart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
