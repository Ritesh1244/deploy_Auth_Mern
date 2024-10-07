import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [Products, setProducts] = useState([]); // Initialize as an array

    const navigate = useNavigate(); 
   
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    const fetchProducts = async ()=>{
        try {
            const  response = await fetch('https://deploy-auth-mern-api.vercel.app/product', {
                method:'GET',
                headers: {
                    "Authorization": localStorage.getItem('token')
                  },
            })

            const result = await response.json()
            console.log(result)
            setProducts(result)
        }
        catch(error){
            handleError(error)
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])
    
   
    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {Products && Products.length > 0 ? (
                    Products.map((item, index) => (
                        <ul key={index}>
                            <li>{item.name} : {item.price}</li>
                        </ul>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>

            <ToastContainer />
        </div>
    )
}

export default Home
