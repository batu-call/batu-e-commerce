import React, { useContext, useState } from 'react'
import { Context } from '../main';
import '../Css/Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';


const Order = () => {

    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [address,setAddress] = useState(''); 
    const {cartItems,user} = useContext(Context);
    const [country, setCountry] = useState('');


    const savedQuantities = JSON.parse(localStorage.getItem("quantity")) || {};
    const totalPrice = cartItems.reduce((acc, item) => {
    const quantity = savedQuantities[item.productId._id] || item.quantity || 1;
    return acc + item.productId.price * quantity;
    }, 0);

    const handlerOrder = async(e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:4000/api/v1/order/add",
                {user:user._id,
                    product:cartItems.map(item=>(
                        {
                            product: item.productId._id,
                            quantity: item.quantity,
                        }
                    )),
                    address,
                    city,
                    postalCode,
                    country,
                },
                {withCredentials:true,
                    headers:{
                        "Content-Type": "application/json"
                    }
                },
            )
            toast.success(response.data.success.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


  return (
    <div className='order'>
        <div className='order-left'>
            <div className='order-left-main'>
                <h2>Products in Your Order</h2>
                <hr />
                {cartItems && cartItems.length > 0 ? 
                cartItems.map((item)=> (
                    <div key={item.productId._id} className='order-product-main'>
                        <img src={item.productId.images[0].url} alt="product" className='order-image'/>
                        <div className='order-product-name'>
                        <div style={{display:"flex",flexDirection:"column"}}>
                        <p className='order-left-name'> {item.productId.product_name}</p>
                        <p className='order-left-description'>{item.productId.description}</p>
                        </div>
                        <div style={{display:"flex",gap:"7px",color:"#005689"}}>
                        <p style={{display:"flex",alignItems:"center",color:"#005689"}}>{item.productId.price} $</p>
                        <div>X</div>
                        <p>{item.quantity}</p>
                        </div>
                        </div>
                    </div>
                )) 
                :
                 ""}
            </div>
        </div>  
            <Box sx={{
        flex: 1,
        minWidth: 300,
        maxWidth: 500,
        bgcolor: '#',
        borderRadius: 2,
    
        margin: 'auto',
        ml: 3,
        height:"90vh",

      }}>
        <Typography variant="h5" textAlign="center" justifyContent="center" mb={3} width="70%">Customer Information</Typography>

        <form onSubmit={handlerOrder}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box width="48%">
        
             <TextField
            label="First Name"
            value={user.firstName}
            variant="outlined"
            fullWidth
            InputProps={{
                readOnly: true,
            }}
            sx={{ mb: 2 }}
            />
              <TextField
            label="Last Name"
            value={user.lastName}
            variant="outlined"
            fullWidth
            InputProps={{
                readOnly: true,
            }}
            sx={{ mb: 2 }}
            />
            </Box>
            <Box width="48%">
              <TextField
            label="Email"
            value={user.email}
            variant="outlined"
            fullWidth
            InputProps={{
                readOnly: true,
            }}
            sx={{ mb: 2 }}
            />
              <TextField
            label="phone"
            value={user.phone}
            variant="outlined"
            fullWidth
            InputProps={{
                readOnly: true,
            }}
            sx={{ mb: 2 }}
            />
            </Box>
          </Box>

          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              label="Country"
            >
              <MenuItem value="usa">USA</MenuItem>
              <MenuItem value="germany">Germany</MenuItem>
              <MenuItem value="france">France</MenuItem>
              <MenuItem value="turkey">Turkey</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Total Price:</Typography>
            <Typography variant="h6" color="primary">{totalPrice.toFixed(2)} $</Typography>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Place Order
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default Order
