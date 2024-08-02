import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReservationList.css';
import logo from '../components/app_logo.png';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [checkedInReservations, setCheckedInReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Data retrieved successfully!');

    const fetchReservations = async () => {
      const reservationsCollection = await getDocs(collection(db, 'reservations'));
      const fetchedReservations = reservationsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(fetchedReservations.filter(reservation => !reservation.checkedIn));
      setCheckedInReservations(fetchedReservations.filter(reservation => reservation.checkedIn));
    };

    fetchReservations();
  }, []);

  const deleteReservation = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      await deleteDoc(doc(db, 'reservations', id));
      setReservations(reservations.filter(reservation => reservation.id !== id));
      setCheckedInReservations(checkedInReservations.filter(reservation => reservation.id !== id));
      toast.error('Reservation deleted successfully!');
    }
  };

  const checkInReservation = async (id) => {
    const reservationDoc = doc(db, 'reservations', id);
    await updateDoc(reservationDoc, { checkedIn: true });
    const updatedReservation = reservations.find(reservation => reservation.id === id);
    updatedReservation.checkedIn = true;
    setReservations(reservations.filter(reservation => reservation.id !== id));
    setCheckedInReservations([...checkedInReservations, updatedReservation]);
    toast.success('Reservation checked in successfully!');
  };

  const undoCheckInReservation = async (id) => {
    const reservationDoc = doc(db, 'reservations', id);
    await updateDoc(reservationDoc, { checkedIn: false });
    const updatedReservation = checkedInReservations.find(reservation => reservation.id === id);
    updatedReservation.checkedIn = false;

    // Remove from checked-in reservations
    setCheckedInReservations(checkedInReservations.filter(reservation => reservation.id !== id));

    // Add back to ongoing reservations
    setReservations([...reservations, updatedReservation]);

    toast.warning('Check-in undone successfully!');
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut(auth);
      toast.info('Logged out successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="tables-container">
        <div className="table-wrapper">
          <h1>Ongoing Reservations</h1>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Restaurant</th>
                <th>Location</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Setting</th>
                <th>Guests</th>
                <th>Requests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="13" className='empty-table'>No ongoing reservations as of the moment.</td>
                </tr>
              ) :
              reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id.slice(0, 5)}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>{reservation.restaurantName}</td>
                  <td>{reservation.restaurantLocation}</td>
                  <td>{reservation.firstName} {reservation.lastName}</td>
                  <td>{reservation.phoneNumber}</td>
                  <td>{reservation.emailAddress}</td>
                  <td>{reservation.customerAddress || 'N/A'}</td>
                  <td>{reservation.settingType}</td>
                  <td>{reservation.numberOfGuests}</td>
                  <td>{reservation.specialRequests || 'N/A'}</td>
                  <td>
                    <button className="action-button checkin-button" onClick={() => checkInReservation(reservation.id)}>Check-In</button>
                    <button className="action-button delete-button" onClick={() => deleteReservation(reservation.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-wrapper">
          <h1>Checked-In Reservations</h1>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Restaurant</th>
                <th>Location</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Setting</th>
                <th>Guests</th>
                <th>Requests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {checkedInReservations.length === 0 ? (
                <tr>
                  <td colSpan="13" className='empty-table'>No checked-in reservations as of the moment.</td>
                </tr>
              ) :
              checkedInReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id.slice(0, 5)}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>{reservation.restaurantName}</td>
                  <td>{reservation.restaurantLocation}</td>
                  <td>{reservation.firstName} {reservation.lastName}</td>
                  <td>{reservation.phoneNumber}</td>
                  <td>{reservation.emailAddress}</td>
                  <td>{reservation.customerAddress || 'N/A'}</td>
                  <td>{reservation.settingType}</td>
                  <td>{reservation.numberOfGuests}</td>
                  <td>{reservation.specialRequests || 'N/A'}</td>
                  <td>
                    <button className="action-button undo-checkin-button" onClick={() => undoCheckInReservation(reservation.id)}>Undo</button>
                    <button className="action-button delete-button" onClick={() => deleteReservation(reservation.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
