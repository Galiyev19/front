import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import menu_img from '../../assets/images/menu_choise_exam_img.jpg'
import timeman from '../../assets/images/timeman.png'
import reserv from '../../assets/images/reserv.png'

import "./Reservation.css";
import { useTranslation } from "react-i18next";

const Reservaton = () => {
  
  const {t} = useTranslation()
  return (
    <div className="offset_reservation py-5">
      <div className="d-flex flex-column py-5  w-100 align-items-center justify-content-center ">
        <Link to="/reservation/theory-exam" className="link_btn_resev_exam">
          <img src={reserv} className="w-25" />
          <p className="w-75 mx-5">{t("btn_title_reservation_theory_exam")}</p>
        </Link>
        <Link className="link_btn_resev_exam" to="/reservation/practice-exam">
          <img  src={reserv} className="w-25"/>
          <p className="w-75 mx-5">{t("btn_title_reservation_practce_exam")}</p>
        </Link>
      </div>
    </div>
  );
};

export default Reservaton;
