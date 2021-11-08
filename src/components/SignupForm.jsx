import { useState } from "react";
import axios from "axios";
const SignupForm = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password === confirmPassword){
            
            const authObject = {
                "Private-Key": "5f682baa-73ef-46e2-a3e6-ee5b75f6b346"
            };

            
            
            try{
                const userData = await axios.get('https://api.chatengine.io/users', {headers: authObject});
                console.log(userData);
                let usrs = [];
                userData.data.map((element) => {return usrs.push(element.username)});
                const isNewUser = !usrs.includes(username);
                console.log(isNewUser);

                if(isNewUser){
                    setError("okay");
                    await axios.post('https://api.chatengine.io/users', {'username' : username, 'secret' : password, 'first_name' : firstname, 'last_name' : lastname, 'email':email}, {headers: authObject});
                    
                    const authHeader = {
                      "Private-Key": "5f682baa-73ef-46e2-a3e6-ee5b75f6b346"
                    };

                    await axios.post('https://api.chatengine.io/chats/68371/people/', {'username' : username}, {headers: authHeader}).then(r => console.log(r));
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);

                    window.location.reload();
                }
                else{
                    setError("Username is taken");
                }

            }
            catch (error){
                console.log(error);
                setError("catching")
            }

        }
        else{
            setError('Passwords dont match ')
        }

    }

    return (
        <div className="signup-wrapper">
          <div className="signup-form" >
            <h1 className="title">Sign Up to Chat App</h1>
            <form onSubmit={handleSubmit}>
                <input 
                className="input-signup"
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder="First Name"
                required
              />
              <input
                className="input-signup"
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder="Last Name"
                required
              />
               
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
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="input"
                placeholder="CONFIRM PASSWORD"
                required
              />
              <input
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                placeholder="Email"
              />
              <h2 className="error">{error}</h2>
              <div align="center">
                <button type="submit" className="signup-button" style={{marginRight: "2%"}} >
                  <span>Sign Up</span>
                </button>
                <button className="signup-button" onClick={() => window.location.reload()} >
                  <span>Back</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default SignupForm;