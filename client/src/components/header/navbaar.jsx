import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import './navbaar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import RightHeader from "./RightHeader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const Navbaar = () => {
  const history = useNavigate();

  const [text, setText] = useState("");
  console.log("text", text);
  const [liopen, setLiopen] = useState(true);
  const { products } = useSelector(state => state.getproductsdata);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [aopen, setopen] = useState(false);
  const { account, setAccount } = useContext(LoginContext);
  console.log("account", account);

  const getdetailvailduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    // console.log(data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  }

  const logoutUser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data2 = await res2.json();
    // console.log(data);
    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      toast.success("User Logout", {
        position: "top-right",
      })
      setAccount(false);
      history("/")
    }
  }


  useEffect(() => {
    getdetailvailduser();
  }, [])

  const handleopen = () => {
    setopen(true);
  }
  const handleDrawerClose = () => {
    setopen(false);
  }

  const getText = (e) => {
    setText(e.target.value)
    setLiopen(false)
  }


  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className='hamburgur' onClick={handleopen}>
            <MenuIcon  style={{color: "#fff"}}/>
          </IconButton>

          <Drawer open={aopen}>
            <RightHeader handleDrawerClose={handleDrawerClose} logoutUser={logoutUser} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="logo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name='' id='' placeholder='Search Your Product' onChange={getText} value={text} />
            <div className="search_icon">
              <SearchIcon id='search' />
            </div>

            {
              text &&
              <List className='extrasearch' hidden={liopen}>
                {
                  products.filter(product=>(
                    product.title.longTitle.toLowerCase().includes(text.toLowerCase()))).map(product=>(
                      <ListItem>
                        <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                        {product.title.longTitle}
                        </NavLink>
                      </ListItem>
                    )
                  )
                }
              </List>
            }
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">Sign In</NavLink>
          </div>
          <div className="cart_btn">
            {
              account ? <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink> :
                <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
            }

            <p>Cart</p>
          </div>
          {
            account ? <Avatar className='avtar2'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >{account.fname[0].toUpperCase()}</Avatar>
              : <Avatar className='avtar'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              ></Avatar>
          }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ?
                <MenuItem onClick={logoutUser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
            }

          </Menu>

        </div>
      </nav>
      <ToastContainer />
    </header>
  )
}

export default Navbaar