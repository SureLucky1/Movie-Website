import "./Chectout.css";
import {useSelector, useDispatch} from "react-redux"
import { removefromCart, addtoCart} from '../Redux/cartSlice';
import { addPrice, subtractPrice} from '../Redux/priceSlice';
import Modal from './Modal/Modal2'  
import React,{useState, useEffect, useRef} from "react";
const Chectout = () => {
  const [display, setDisplay] = useState("flex");
  const [index, setIndex] = useState(50);
  const [showModal, setShowModal] = useState(false);
  const [overflow, setOverflow] = useState('none');
    const cartitems = useSelector(state => state.cart.cart);
    const Total = useSelector(state => state.price.total);
    const dispatch = useDispatch();
    console.log(cartitems)
    const handleAddToCart = (item) => {
      dispatch(addtoCart(item));
      dispatch(addPrice(item));
    };
  
    const handleRemoveFromCart = (item) => {
      dispatch(removefromCart(item));
      dispatch(subtractPrice(item));
    };
  
    return (
      <div className="cart">
        <h2>Cart Items</h2>
        <div className="itemgroup">
                    {Object.keys(cartitems).map(id => {
          return cartitems[id].map(item => (
            <div className="d-flex">
              <img src={item.image} className="c-image" alt='' />
              <div>
                <h4>{item.title}</h4>
                <h4>{item.price}</h4>
                <button className="btn btn-warning btn-sm" onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </div>
            </div>
          ));
        })}
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>

<Modal showModal={showModal}setShowModal={setShowModal} setOverflow={setOverflow} setDisplay={setDisplay} setIndex={setIndex}/>
  </div>
<div>

        <h2>Total Price: ${Total}</h2>
        <button className="btn btn-success" onClick={()=>{
    setShowModal(true);
}}>
    Checkout
</button>
</div>
      </div>
    );
  };
 

export default Chectout;