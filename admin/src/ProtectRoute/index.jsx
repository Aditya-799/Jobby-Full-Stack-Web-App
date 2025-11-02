import Cookies from 'js-cookie'


//NOt done yet

const ProtectRoute=({children})=>{
    const cookieVal=Cookies.get('jwtToken')
    if(cookieVal===undefined){
        return <Navigate to="/login" replace/>
    }
    return children
}