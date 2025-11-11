import Cookies from 'js-cookie'

const routetologin = () => {
    Cookies.remove('jwtToken')
    window.location.replace('http://localhost:5174/login')
}

const SettingsTab = () => {
    return (
        <div>
            <h1>Settings</h1>
            <button onClick={() => routetologin()} className="asc-addJobsbutton">Logout</button>
        </div>
    );
};

export default SettingsTab;