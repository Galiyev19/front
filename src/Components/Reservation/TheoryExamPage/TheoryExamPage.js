import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import TheoryExamForm from "./TheoryExamForm/TheoryExamForm";
import ModalLoading from "../ModalLoading/ModalLoading";
import ModalTheoryExam from "../../Modal/ModalTheoryExam";

import { setData } from "../../../store/slices/ReservationTheoryData";
import { setDataUser } from "../../../store/slices/userDataSlice";


import "./TheoryExamPage.css";

const TheoryExamPage= () => {
  // TRANSLATE
  const { t } = useTranslation();

  const [search, setSearch] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isReserv, setIsReserv] = useState(false)

  // const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    IIN: "",
    mode: "onChange",
  });

  const getUserData = async (data) => {
    const username = "admin"; 
    const password = "admin"; 


    fetch(`/api/search/applicant/${data.IIN}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSearch(false)
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
        if(data[0]?.fields?.statusT === true){
          setIsReserv(true)
        }else{
          setSearch(true);
          dispatch(setDataUser(data[0]));
        }
      })
      .catch((error) => {
        setSearch(false);
        setIsUser(true);
      });
  };

  
  // SEARCH TICKET SUBMIT BUTTON
  const submit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    getUserData(data);
    reset();
  };

  useEffect(() => {}, []);

  return (
    <div className="offset_theory_exam_page">
      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2 className="header_text_theory_exam_form">
          {t("titlePageTheoryExam")}
        </h2>
        {!search ? (
          <form
            className="d-flex align-items-center justify-content-center flex-column w-100 mt-3"
            onSubmit={handleSubmit(submit)}
          >
            <p className="text-center">{t("head_text_input")}</p>
            {/* INPUT TICKET */}
            <input
              className="form-control w-50 my-2"
              placeholder={t("head_text_input")}
              maxLength="12"
              minLength="12"
              name="IIN"
              {...register("IIN", {
                required: "Введите ваш номер завки",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "ИИН состоит только из цифр",
                },
              })}
            />
            {/* ERRORS FOR INPUT */}
            {errors.IIN && <p className="text-danger">{errors.IIN.message}</p>}
            {isUser && <p className="text-danger">Неверный цифровой талон</p>}
            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-success w-25 my-2"
              type="submit"
              disabled={!isDirty || !isValid}
            >
              {t("btn_title_reservation")}
            </button>
          </form>
        ) : (
          <div className="d-flex w-100 text-start align-items-center justify-content-center">
            <TheoryExamForm isReserv={isReserv}/>
          </div>
        )}
      </div>
      {isloading && <ModalLoading isLoading={isloading} />}
      <ModalTheoryExam isReserv={isReserv} setShow={setIsReserv}/>
    </div>
  );
}

export default TheoryExamPage;