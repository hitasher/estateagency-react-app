import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {Link} from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  // Представление списка объявлений
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/ads',
      headers: {
        'Content-Type': 'application/json'
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
          <Link to={`/dashboard/${listing.id}`} key={listing.id} className="listing-link">
            <div className="listing">
              <h2>{listing.name}</h2>
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

};

export default Dashboard;
