import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {Link} from "react-router-dom";

const Dashboard = () => {
  // Представление списка объявлений
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    // Запрос к серверу для получения списка объявлений
    // Асинхронная функция для демонстрации
    const fetchListings = async () => {
      // Имитации получения данных с сервера
      const response = await new Promise(resolve =>
        setTimeout(() => resolve({
          data: [
            {
              id: 1,
              title: "Просторная квартира в центре",
              description: "Уютная и светлая квартира рядом с парком.",
              price: "5 000 000 руб.",
              area: "74 кв.м",
              address: "г. Москва, ул. Пушкина, д. 10",
              phoneNumber: "+7 (999) 888-77-66"
            },
            // Другие объявления...
          ]
        }), 500)
      );
      setListings(response.data);
    };

    fetchListings();
  }, []);

  return (
    <div className="dashboard">
      <h1>Объявления</h1>
      <div className="listings">
        {listings.map((listing, index) => (
          <Link to={`/dashboard/${listing.id}`} key={listing.id} className="listing-link">
            <div className="listing">
              <h2>{listing.title}</h2>
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
