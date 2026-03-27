
import { React, useState } from 'react';

function CustomerForm() {

    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        name: ''
    });

    let { name, email, phone } = customer;

    const handleChange = (e) => {
        let { name: fieldName, value } = e.target;
        setCustomer({ ...customer, [fieldName]: value })
    }

    const validateName = () => {
        if (name.length < 3) {
            setErrors({ ...errors, name: 'Name must be at least 3 characters long' });
        }
    }

    return (
        <div>
            <h1>Customer Form</h1>
            {JSON.stringify(customer)}
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input value={name}
                                onChange={handleChange}
                                onBlur={validateName}
                                type="text"
                                id="name"
                                name="name"
                                className="form-control" />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input value={email} onChange={handleChange} type="email" id="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input disabled={email} value={phone} onChange={handleChange} type="tel" id="phone" name="phone" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;