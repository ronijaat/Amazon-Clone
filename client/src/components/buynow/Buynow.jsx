import React, { useEffect, useState } from 'react'
import './buynow.css'
import { Divider } from '@mui/material'
import Option from './Option'
import Subtotal from "./Subtotal"
import Right from './Right'

const Buynow = () => {

    const [cartdata, setcartdata] = useState([]);

    const getDatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("error");
        } else {
            setcartdata(data.carts);
        }
    }

    useEffect(() => {
        getDatabuy();
    }, [])

    return (
        <>{
            cartdata.length ? <div className="buynow_section">
                <div className="buynow_container">
                    <div className="left_buy">
                        <h1>Shopping Cart</h1>
                        <p>Select All item</p>
                        <span className='leftbutprice'>Price</span>
                        <Divider />
                        {
                            cartdata.map((e, k) => {
                                return (
                                    <>
                                        <div className="item_containert">
                                            <img src={e.url} alt="" />
                                            <div className="item_details">
                                                <h3>{e.title.longTitle}</h3>
                                                <h3>{e.title.shortTitle}</h3>
                                                <h3 className='diffrentprice'>₹{e.price.cost}</h3>
                                                <p className='unusuall'>Usually dispatched in 8 days.</p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img src="data:image/png;base64,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" alt="" />
                                                <Option deletedata={e.id} get={getDatabuy}/>
                                            </div>
                                            <h3 className='item_price'>₹{e.price.cost}</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })
                        }

                        
                        <Subtotal cartdata={cartdata}/>
                    </div>
                    <Right cartdata={cartdata}/>
                </div>
            </div>
                : <div>No items in Cart</div>
        }

        </>

    )
}

export default Buynow