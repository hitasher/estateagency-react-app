import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetail.css';

const ListingDetail = () => {
  const [listing, setListing] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchListingDetail = async () => {
      // Запрос к API...
      const fetchedListing = {
        id,
        title: "Просторная квартира в центре",
        description: "Уютная и светлая квартира рядом с парком.",
        price: "5 000 000 руб.",
        area: "74 кв.м",
        address: "г. Москва, ул. Пушкина, д. 10",
        phoneNumber: "+7 (999) 888-77-66",
        images: ["url_to_image1", "url_to_image2"],
      };
      setListing(fetchedListing);
    };

    fetchListingDetail();
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listing-detail">
      <h2 className="title">{listing.title}</h2>
      <p className="description">{listing.description}</p>
      <div className="gallery">
        {listing.images.map((image, index) => (
          <img src={image} alt="u" key={index} className="gallery-image" />
        ))}
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