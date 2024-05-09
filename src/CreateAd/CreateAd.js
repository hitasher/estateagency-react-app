import './CreateAd.css'
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import AuthContext from "../AuthContext";

const CreateAd = ({ onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams(); // Доступ к параметру id из URL
  let navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    let myData = formData;
    myData.isActive = formData.active;
    console.log('form data is ' + JSON.stringify(myData));
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/ads',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user ? user.token : ""}`
      },
      data: myData
    };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate('/edit/' + response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setFormData({ ...item }); // Возвращаем исходные данные, если пользователь отменил редактирование
    navigate('/dashboard')
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target[e.type === "checkbox" ? "checked" : "value"]});
  };

  const handleIsActive = (e) => {
    setFormData({ ...formData, "active": !formData.active });
  }

  if (isLoading) return <p>Загрузка...</p>;

  // JSX для редактирования (аналогично предыдущему примеру, но с добавлением isLoading и item)
  return (
    <div className="edit-container">
      {isEditing ? (
        <div className="edit-form">
          Название
          <input
            className="edit-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          Описание
          <input
            className="edit-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          Адрес
          <input
            className="edit-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          Номер телефона
          <input
            className="edit-input"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          Объявление активно
          <input
            className="edit-input"
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleIsActive}
          />
          Цена
          <input
            className="edit-input"
            type="number"
            name="price"
            value={formData.price}
            step="100000"
            onChange={handleChange}
          />
          Площадь
          <input
            className="edit-input"
            type="number"
            name="area"
            value={formData.area}
            step="0.01"
            onChange={handleChange}
          />
          <button className="edit-button save-button" onClick={handleSave}>Сохранить</button>
          <button className="edit-button cancel-button" onClick={handleCancel}>Отмена</button>
        </div>
      ) : (
        <div className="display-form">
          <span className={"edit-span"}>{formData.name}</span>
          <span className={"edit-span"}>{formData.description}</span>
          <button className="edit-button" onClick={handleEdit}>Редактировать</button>
        </div>
      )}
    </div>
  );

};

export default CreateAd;