// import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({ children }) {

//     const isAuth = sessionStorage.getItem('userToken');
//     useEffect(() => {

//         if (!isAuth) {
//             return <Navigate to="/login" replace />;
//         }

//     }, [isAuth])
//     if (!isAuth) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;
