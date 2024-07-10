import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './UserDashboard';
import './PlaceOrder.css';
import { useUserContext } from '../context/UserContext';

const PlaceOrder = ({ onLogout }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const user = useUserContext();
    const username = user?.username;

    useEffect(() => {
        axios.get('http://localhost:5000/api/menu')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the menu!', error);
            });
    }, []);

    const handleAddItem = (item, quantity) => {
        const newItem = { ...item, quantity: parseInt(quantity, 10) };
        setOrderItems([...orderItems, newItem]);
        setTotalAmount(totalAmount + (item.price * quantity));
    };

    const handlePlaceOrder = () => {
        const orderData = {
            username,
            items: orderItems.map(item => ({
                id: item.id,
                price: parseFloat(item.price),
                quantity: item.quantity
            }))
        };

        console.log('Order Data:', orderData);

        axios.post('http://localhost:5000/api/place_order', orderData)
            .then(response => {
                console.log(response.data);
                setOrderItems([]);
                setTotalAmount(0);
                toast.success('Order placed successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error placing the order!', error);
                toast.error('Failed to place the order', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="container">
            <UserDashboard username={username} onLogout={onLogout} />
            <h2>Place Order</h2>
            <div className="menu-items">
                {menuItems.map(item => (
                    <div key={item.id} className="menu-item">
                        <div className="item-details">
                            <h5>{item.name} - ${item.price}</h5>
                            <p>{item.description}</p>
                        </div>
                        <div className="item-actions">
                            <input type="number" min="1" defaultValue="1" id={`quantity-${item.id}`} className="form-control" />
                            <button onClick={() => handleAddItem(item, parseInt(document.getElementById(`quantity-${item.id}`).value, 10))}>Add</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <h3>Order Summary</h3>
                {orderItems.map(item => (
                    <div key={item.id} className="order-item">
                        <div className="item-details">
                            <h5>{item.name} x {item.quantity}</h5>
                            <p>Total: ${item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
                <div className="total-amount">
                    <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
                </div>
                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PlaceOrder;
