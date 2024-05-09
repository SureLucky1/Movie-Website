import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../../redux/cartSlice';
import { clearTotal } from '../../redux/priceSlice';
import "./Modal.css";
import { MdClose } from 'react-icons/md';
const Modal = ({ showModal, setShowModal }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const Total = useSelector(state => state.price.total);
  const dispatch = useDispatch();

  const check = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
    } else if (cardNumber === "") {
      alert("Please enter your credit card number.")
    } else {
      dispatch(clearCart());
      dispatch(clearTotal());
    }
  }

  return (
    <>
      {showModal ? (
        <div className='modal'>
          <div>
            <form>
              <label htmlFor="fname">Payment Method</label><br />
              <div>
                <input type="radio" id="paypal" name="fname" value="Paypal" onChange={e => setPaymentMethod(e.target.value)} /><br />
                <label htmlFor="paypal">Paypal</label><br />
              </div>
              <div>
                <input type="radio" id="mastercard" name="fname" value="Master Card" onChange={e => setPaymentMethod(e.target.value)} /><br />
                <label htmlFor="mastercard">Master Card</label><br />
              </div>
              <div>
                <input type="radio" id="visa" name="fname" value="VISA Card" onChange={e => setPaymentMethod(e.target.value)} /><br />
                <label htmlFor="visa">VISA Card</label><br />
              </div>
              <label className='card'>Card Numbers</label><br />
              <input type="text" id="lname" placeholder="e.g. XXXX-XXXX-XXXX-XXXX" onChange={e => setCardNumber(e.target.value)} />

              <h2>Total Price: ${Total}</h2>
            </form>
            <button className="btn btn-success" onClick={check}>
              Checkout
            </button>
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
