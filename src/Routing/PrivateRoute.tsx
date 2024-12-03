// // src/routing/PrivateRoute.tsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // Assuming you are using Redux for authentication state

// const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

//   if (!isAuthenticated) {
//     // Redirect to login if the user is not authenticated
//     return <Navigate to="/login" />;
//   }

//   return children; // If authenticated, render the children (protected route)
// };

// export default PrivateRoute;
