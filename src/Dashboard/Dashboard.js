import React, {useState, useEffect, useContext} from 'react';
import './Dashboard.css';
import {Link, redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from "../AuthContext";

const Dashboard = () => {
  // Представление списка объявлений
  const [listings, setListings] = useState([]);
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  console.log(listings);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/ads',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user ? user.token : ""}`
      },
    };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setListings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Объявления</h1>
      <div className="listings">
        {listings.map((listing, index) => (
            <div className="listing">
              <h2><a href={`dashboard/${listing.id}`}>{listing.name}</a></h2>
              <p>{listing.description}</p>
              <div className="listing-details">
                <span>Цена: {listing.price}</span>
                <span>Площадь: {listing.area}</span>
              </div>
              <div className="listing-location">
                <span>Адрес: {listing.address}</span>
              </div>
              <div className="listing-contact">
                <span>Тел: {listing.phoneNumber}</span>
              </div>
              {user && user.role === "ADMIN" ? (
                <>
                  <button className={"edit-button"} onClick={() => navigate("/edit/" + listing.id)}>Редактировать</button>
                </>) : (<></>)}
            </div>
        ))}
      </div>
    </div>
  );

};

export default Dashboard;
