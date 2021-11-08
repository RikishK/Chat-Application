
const NavigationBar = () => {

    const handleLogout = () => {
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');

        window.location.reload();
    }

    return (
        <div className="nav-bar">
        <button className="logout-button" type="submit" alignText="right" onClick={handleLogout}>
            <span>
                Log Out
            </span>
            </button>
        </div>
    );
}

export default NavigationBar;