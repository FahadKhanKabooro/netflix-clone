import "./Login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (signState === "sign In") {
      await login(email, Password);
    } else {
      await signup(name, email, Password);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isloading ? (
        <div className="login-spinner">
          <img src={netflix_spinner} alt="" />
        </div>
      ) : (
        <div className="login">
          <img src={logo} className="login-logo" alt="" />
          <div className="login-form">
            <h1>{signState}</h1>
            <form>
              {signState === "Sign Up" ? (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              ) : (
                <></>
              )}

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button onClick={user_auth} type="submit">
                {signState}
              </button>
              <div className="form-help">
                <div className="remember">
                  <input type="checkbox" />
                  <label htmlFor="">Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            </form>
            <div className="form-switch">
              {signState === "Sign In" ? (
                <p>
                  New to Netflix?{" "}
                  <span
                    onClick={() => {
                      setSignState("Sign Up");
                    }}
                  >
                    Sign Up Now
                  </span>
                </p>
              ) : (
                <p>
                  Already have Account?{" "}
                  <span
                    onClick={() => {
                      setSignState("Sign In");
                    }}
                  >
                    Sign In Now
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
