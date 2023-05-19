import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import ModalLoading from "../ModalLoading/ModalLoading";
import PracticeExamForm from "./PracticeExamForm/PracticeExamForm";
import { setDataUser } from "../../../store/slices/userDataSlice";

import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";

const PracticeExamPage = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isReserv, setIsReserv] = useState(false);
  const [congartModal, setCongartModal] = useState(false);
  const [isTheoryResModal,setIsTheoryResModal] = useState(false)

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

  const dispatch = useDispatch();

  const getUserData = async (data) => {
    const username = "admin";
    const password = "admin";

    console.log(data.IIN);

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
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
        if (
          data[0]?.fields.statusT === false &&
          data[0]?.fields.statusP === false
        ) {
          setSearch(false);
          setIsTheoryResModal(true);
          console.log(1);
        } else if (
          data[0]?.fields.statusT === true &&
          data[0]?.fields.statusP === false
        ) {
          setSearch(true);
         
          dispatch(setDataUser(data[0]));
          console.log(2);
        } else if (
          data[0]?.fields.statusT === true &&
          data[0]?.fields.statusP === true
        ) {
      
          setCongartModal(true)
          console.log(3);
        } else {
          setSearch(true);
          dispatch(setDataUser(data[0]));
        }
        console.log(data);
      })
      .catch((error) => {
        setSearch(false);
        setIsUser(true);
        console.error(error);
      });
  };

  const submit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    getUserData(data);
    reset();
  };

  useEffect(() => {}, [search, isReserv]);

  return (
    <div className="offset">
      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2 className="header_text_theory_exam_form">
          {t("titlePagePracticeExam")}
        </h2>
      </div>
      <div className="d-flex w-100 text-start align-items-center justify-content-center">
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
                required: "Введите или номер завки",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "ИИН состоит только из цифр",
                },
              })}
            />
            {/* ERRORS FOR INPUT */}
            {errors.IIN && <p className="text-danger">{errors.IIN.message}</p>}
            {/* ERROR NOT FOUND TICKTE */}
            {isUser && <p className="text-danger">Неверный цифровой талон</p>}
            {/* ERROR IF USER BOOKIG FOR PRACTICE EXAM */}
           
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
            <PracticeExamForm isReserv={isReserv} />
          </div>
        )}
      </div>
      {isloading && <ModalLoading isLoading={isloading} />}
      <ModalPracticeError
        isTheoryResModal={isTheoryResModal}
        setShow={setIsTheoryResModal}
      />
      <ModalCongratPractice
        congartModal={congartModal}
        setShow={setCongartModal}
      />
    </div>
  );
};

export default PracticeExamPage;
