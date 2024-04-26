import React, { useEffect } from 'react'
import logo1 from "../../assets/Logo/Tasktrove.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { BsChevronDown } from "react-icons/bs"

const Navbar = () => {
    console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    // const {user} = useSelector( (state) => state.profile );
    // const {totalItems} = useSelector( (state) => state.cart )
    const location = useLocation();

    const [sublinks, setSublinks]  = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSublinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        setLoading(true)
        fetchSublinks();
        setLoading(false)
    },[] )

    
  const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
    // bg-gradient-to-r from-violet-200 to-pink-200
  return (
    <div className='   flex h-14 items-center justify-center border-b-[1px] border-b-blue-100 bg-gradient-to-r from-blue-200 -200 to-pink-200'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between mr-20'>
        {/* Image */}
      <Link to="/">
        <img src={logo1} width={250} height={40} loading='lazy' className=' pt-9'
        alt='Logo of the company'/>
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                matchRoute("/catalog/:catalogName")
                                  ? "text-yellow-25"
                                  : "text-richblack-25"
                              }`}>
                                <p>{link.title}</p>
                                <BsChevronDown />

                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                                </div>

                                {loading ? (
                          <p className="text-center">Loading...</p>
                        ) :
                                    sublinks.length ? (
                                            sublinks.map( (sublinks, index) => (
                                                <Link to={`${sublinks.link}`} 
                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                key={index}>
                                                    <p>{sublinks.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<p className="text-center">No Tasks Found</p>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>

    
        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>

            {
                
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            
        </div>


      </div>
    </div>
  )
}

export default Navbar
