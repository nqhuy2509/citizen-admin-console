import {useSelector} from "react-redux";
import {IRootState} from "./redux/store";
import {Navigate, Outlet} from "react-router-dom";


const PrivateRoute = () =>{
    const isAuth = useSelector((state : IRootState) => state.auth.isLogin);

    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute;