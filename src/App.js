import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Login from './components/Login';
import ReservationList from './components/ReservationList'; // Adjust the import path if necessary
import './App.css';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [adminEmail, setAdminEmail] = useState(null);
  const [loadingAdminEmail, setLoadingAdminEmail] = useState(true);

  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        const adminDoc = await getDoc(doc(db, 'admin', 'ivan'));
        if (adminDoc.exists()) {
          setAdminEmail(adminDoc.data().email);
        } else {
          console.error('No admin email found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching admin email:', error);
      } finally {
        setLoadingAdminEmail(false);
      }
    };

    fetchAdminEmail();
  }, []);

  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  if (loading || loadingAdminEmail) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            user ? (
              user.email === adminEmail ? (
                <ReservationList />
              ) : (
                <div className='not-admin'>
                  <h2>You are not allowed!</h2>
                  <h6>Note: Only the admin can access the dashboard.</h6>
                </div>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
