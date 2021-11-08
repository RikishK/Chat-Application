import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import NavigationBar from './components/NavigationBar';
import { useState } from 'react';
import './App.css'
import SignupForm from './components/SignupForm';

const App = () => {
    const [signingUp, setSigningUp] = useState(false);

    if(signingUp){
        return <SignupForm /> 
    }

    if(!localStorage.getItem('username')){
        return(
            <LoginForm signup={() => setSigningUp(true)} />
        );
    }
    return (
        <div>
        <NavigationBar />
        <ChatEngine 
            height="92vh"
            projectID="
7b2b6f43-8474-4ec1-a615-6215689dac64"
            userName= {localStorage.getItem('username')}
            userSecret= {localStorage.getItem('password')}
            renderChatFeed={(chatprops) => <ChatFeed {...chatprops}/> }
        />
        </div>
    );
}

export default App;