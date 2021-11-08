import { useState } from "react";
import axios from "axios";
const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authObject = {
      "Project-ID": "7b2b6f43-8474-4ec1-a615-6215689dac64",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="wrapper">
      <div className="form" >
        <h1 className="title">Chat Application by Rikish Kamboj</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="input"
            placeholder="USERNAME"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="input"
            placeholder="PASSWORD"
            required
          />
          <h2 className="error">{error}</h2>
          <div align="center">
            <button type="submit" className="button">
              <span>Login</span>
            </button>
          </div>
          <div align="center">
            <button className="button" onClick={props.signup}>
                <span>Sign Up</span>
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
