const Login = () => {
    return (
        <div className="vh-100 w-full d-flex justify-content-center align-items-center">
            <div className="w-25 h-50 rounded-5 border border-primary d-flex justify-content-center align-items-center">
                <form className="w-75 h-75 d-flex  flex-column justify-content-around ">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="username"
                               placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Password"/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input"/>
                            <label className="form-check-label">Remember me</label>
                        </div>
                        <a href="#" className="ml-auto px-2">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className="text-center">
                        <a href="/register" className="ml-auto px-2">Doesn't have account?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;