import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import reserv from '../../assets/images/reserv.png'

import {IoIosArrowBack} from 'react-icons/io'

import "./Reservation.css";

const Reservaton = () => {
  
  const {t} = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="offset_reservation py-5">
      <div className="d-flex w-100">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack/>
          назад
        </button>
      </div>
      <div className="d-flex flex-column py-5  w-100 align-items-center justify-content-center ">
        {/* <Link to="/reservation/theory-exam" className="link_btn_resev_exam">
          <img src={reserv} className="w-25" />
          <p className="w-75 mx-5">{t("btn_title_reservation_theory_exam")}</p>
        </Link> */}
        <Link className="link_btn_resev_exam" to="/reservation/practice-exam">
          <img  src={reserv} className="w-25"/>
          <p className="w-75 mx-5">{t("btn_title_reservation_practce_exam")}</p>
        </Link>
      </div>
    </div>
  );
};

export default Reservaton;
