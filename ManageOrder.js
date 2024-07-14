import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const ManageOrders = ({username, onLogout}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
            });
    }, []);

    return (
        <div className="container">
          <AdminDashboard username={username} onLogout={onLogout} />
            <h2>Manage Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Order Date</th>
                        <th>Total Amount</th>
                        <th>Quantity</th>
                        <th>Order Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.username}</td>
                            <td>{order.order_date}</td>
                            <td>${order.total_amount}</td>
                            <td>{order.quantity}</td>
                            <td>{order.order_items}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrders;
