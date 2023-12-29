import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import {useSelector, useDispatch} from "react-redux"
import { removefromCart, addtoCart, clearCart } from '../../Redux/cartSlice';
import { addPrice, subtractPrice, clearTotal } from '../../Redux/priceSlice';
import { MdClose } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import "./Modal.css";

const Modal = ({showModal, setShowModal, setOverflow, setIndex, setDisplay}) => {
  const modalRef = useRef();
  const Total = useSelector(state => state.price.total);
  const dispatch = useDispatch();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setIndex(50);
      setDisplay(50);
    }
    setIndex(50);
    setDisplay(50);
    setOverflow("none");
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <div onClick={closeModal} ref={modalRef} className='modal'>
          <div style={animation}>

<div>
<form>
  <label htmlFor="fname">Payment Method</label><br />
  <div>
  <input type="radio" id="fname" name="fname" /><br />
  <label htmlFor="fname">Paypal</label><br />
  </div>
  <div>
  <input type="radio" id="fname" name="fname" /><br />
  <label htmlFor="fname">Master Card</label><br />
  </div>
  <div>
  <input type="radio" id="fname" name="fname" /><br />
  <label htmlFor="fname">VISA Card</label><br />
  </div>
  <label htmlFor="lname">Card Numbers</label><br />
  <input type="text" id="lname" name="lname" placeholder="XXXX-XXXX-XXXX-XXXX"/>

  <h2>Total Price: ${Total}</h2>
</form>
<button className="btn btn-success" onClick={()=>{
    dispatch(clearCart());
    dispatch(clearTotal());
}}>
    Checkout
</button>
  
</div>

              <MdClose
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
                style={{cursor: "pointer",
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "32px",
                height: "32px",
                backgroundColor:"white",
                padding: 0,
                zIndex: 10}}
              />
          
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
