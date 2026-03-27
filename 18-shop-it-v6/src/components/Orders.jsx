function Orders() {
    const orders = [
        { id: 'ORD-1001', item: 'Laptop', amount: 100000, status: 'Delivered' },
        { id: 'ORD-1002', item: 'Smartphone', amount: 50000, status: 'Processing' },
    ];

    return (
        <section className="card shadow-sm border-0">
            <div className="card-body p-4">
                <h1 className="h3 mb-2">My Orders</h1>
                <p className="text-muted mb-4">Your recent orders are shown below.</p>

                <div className="table-responsive">
                    <table className="table table-striped align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Item</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.item}</td>
                                    <td>Rs. {order.amount}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Orders;