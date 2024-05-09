import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetail.css';
import axios from "axios";

const ListingDetail = () => {
  const [listing, setListing] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/ads/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
    };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setListing(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listing-detail">
      <h2 className="title">{listing.name}</h2>
      <p className="description">{listing.description}</p>
      <div className="gallery">
        {listing.images ? (
          <>
          {listing.images.map((image, index) => (
              <img src={image} alt="u" key={index} className="gallery-image" />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <ul className="details">
        <li>Цена: <strong>{listing.price}</strong></li>
        <li>Площадь: <strong>{listing.area}</strong></li>
        <li>Адрес: <strong>{listing.address}</strong></li>
        <li>Телефон: <strong>{listing.phoneNumber}</strong></li>
      </ul>
    </div>
  );
};

export default ListingDetail;