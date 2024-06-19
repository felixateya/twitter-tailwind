// ProtectedRoute.js
import {useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import { app } from '../firebase';
import FullpageLoader from '../components/FullpageLoader';
// import Loader from '../Components/Loader';
const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate()
  // const style = {
  //   backgroundColor: "#293A58",
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <FullpageLoader/> // You can replace this with a loader/spinner component
  }

  if (!isAuthenticated) navigate("/login");

  return <Outlet />;
};

export default ProtectedRoute;
