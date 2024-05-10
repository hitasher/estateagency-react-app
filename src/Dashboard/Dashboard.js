import React, {useContext, useEffect, useState} from 'react';
import './Dashboard.css';
import {useNavigate} from "react-router-dom";
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
      .then(async (response) => { // Используйте async здесь, чтобы использовать await дальше
        await Promise.all(response.data.map(ad => loadImages(ad))); // Дождитесь загрузки всех изображений
        setListings(response.data); // Обновите состояние только один раз после загрузки всех изображений
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadImages = async (ad) => {
    const imagePromises = ad.images.map(async (image) => {
      let config = {
        method: 'get',
        url: `/images/get?filename=${image.filePath}`,
        headers: {
          'Authorization' : `Bearer ${user ? user.token : ""}`
        },
        responseType: 'blob'
      };
      const imageResponse = await axios.request(config); // Дождитесь ответа перед продолжением
      const imageBlob = new Blob([imageResponse.data]);
      image.file = URL.createObjectURL(imageBlob);
    });

    await Promise.all(imagePromises); // Дождитесь загрузки всех изображений для конкретного объявления
  }

  useEffect(fetchListings, [user?.token, minPrice, maxPrice, minArea, maxArea]);

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
            <div className="listing-images">
            {listing.images.map((image) => (
              <div key={image.id}>
                <img className={"listing-img"} src={image.file} alt="Image"/>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
