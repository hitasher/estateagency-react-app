import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../AuthContext";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const fetchListings = () => {
    const params = new URLSearchParams({
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(minArea && { minArea }),
      ...(maxArea && { maxArea }),
    }).toString();

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/ads?${params}`,
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
  };

  useEffect(fetchListings, [user?.token, minPrice, maxPrice, minArea, maxArea]); // Добавляем зависимости для фильтров

  return (
    <div className="dashboard">
      <h1>Объявления</h1>
      <div className="filters">
        <div className="filter">
        Мин. цена
        <input
          type="number"
          placeholder="Мин. цена"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        Макс. цена
        <input
          type="number"
          placeholder="Макс. цена"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        </div>
      </div>
      <div className="filters">
        <div className="filter">
        Мин. площадь
        <input
          type="number"
          placeholder="Мин. площадь"
          value={minArea}
          onChange={e => setMinArea(e.target.value)}
        />
        Макс. площадь
        <input
          type="number"
          placeholder="Макс. площадь"
          value={maxArea}
          onChange={e => setMaxArea(e.target.value)}
        />
        </div>
      </div>
      <div className="listings">
        {listings.map((listing) => (
          <div className="listing" key={listing.id}>
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
              <button className={"edit-button"} onClick={() => navigate("/edit/" + listing.id)}>Редактировать</button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
