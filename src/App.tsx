import React from 'react';
import './scss/_global.scss'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import Login from "./pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import Users from "./pages/users/Users";

function App() {
  return (
    <div className="App">
        <Router>
            <BaseLayout>
                <Routes>
                    <Route element={<PrivateRoute />} >
                        <Route path='/' caseSensitive element={<div>kfjskjfkdsjkfjskfjdsaa</div>} />
                        <Route path='/users' element={<Users />}   />
                    </Route>
                    <Route path='/login' element={<Login />}  />
                </Routes>
            </BaseLayout>

        </Router>
    </div>
  );
}

export default App;
