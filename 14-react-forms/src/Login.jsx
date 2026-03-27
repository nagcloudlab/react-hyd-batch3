
import { React, useRef } from 'react';

function Login() {
    console.log('Rendering Login component');
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log('Email:', email);
        console.log('Password:', password);
    }
    return (
        <div className="Login">
            <h1 className="display-1">Login</h1>
            <hr />
            <div className="row">
                <div className="col-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Enter password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;