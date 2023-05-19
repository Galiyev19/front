import React from "react";

import { FaUserAlt } from "react-icons/fa";

import "./SearchResultExam.css";
import { useNavigate } from "react-router";

const SearchResultExam = () => {
    const navigate = useNavigate()
    const handleCancel = () => {
        navigate(-1)
    }

    const handleHomePage = () => {
        navigate('/')
    }
  return (
    <main className="search_result_exam_offset">
      <div className="d-flex w-100 px-5 mt-5 justify-content-around">
        <div className="d-flex h-100 justify-content-center">
          <FaUserAlt className="icon" />
        </div>
        <div className="d-flex flex-column w-50 align-items-start">
          <p className="ticket_text_aside">
            ФИО: <span className="text_data">ФИО</span>{" "}
          </p>
          <p className="ticket_text_aside">
            ИИН: <span className="text_data">ИИН</span>
          </p>
          <p className="ticket_text_aside">
            Адрес СпецЦОНа: <span className="text_data">Адрес СпецЦОНа</span>
          </p>
          <p className="ticket_text_aside">
            Тип услуги: <span className="text_data">Тип услуги</span>
          </p>
          <p className="ticket_text_aside">
            Дата и время для сдачи практического экзамена:{" "}
            <span className="text_data">
              Дата и время для сдачи практического экзамена
            </span>
          </p>
          <p className="ticket_text_aside">
            Статус ТЭ: <span className="text_data">Статус ТЭ</span>
          </p>
          <p className="ticket_text_aside">
            Статус ТЭ: <span className="text_data">Статус ТЭ</span>
          </p>
        </div>
      </div>
      <div className="d-flex w-100 align-items-center justify-content-center mt-5">
        <button className="btn btn-danger mx-2" onClick={() => handleCancel()}>Отмена</button>
        <button className="btn btn-primary mx-2" onClick={() => handleHomePage()}>Главная страница</button>
      </div>
    </main>
  );
};

export default SearchResultExam;
