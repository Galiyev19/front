import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import ModalLoading from "../ModalLoading/ModalLoading";
import PracticeExamForm from "./PracticeExamForm/PracticeExamForm";
import { setDataUser } from "../../../store/slices/userDataSlice";

import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

const PracticeExamPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

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
          setSearch(false)
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
          if(data.find === false){
          setIsUser(true);
          setSearch(false);
        }else{
          dispatch(setDataUser(data));
          setSearch(true)
        }
      })
      .catch((error) => {
          setIsUser(true);
          setSearch(false);
        // console.error(error);
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
    <div className="offset_theory_exam_page flex-column">
      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2 className="header_text_theory_exam_form">
          {t("titlePagePracticeExam")}
        </h2>
      </div>
      <div className="d-flex w-100">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack/>
          назад
        </button>
      </div>
      <div className="d-flex w-100 text-start align-items-center justify-content-center">
        {!search ? (
          <form
            className="form_input"
            onSubmit={handleSubmit(submit)}
          >
            <p className="text-center">{t("head_text_input")}</p>
            {/* INPUT TICKET */}
            <input
              className="form-control input_w my-2"
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
            {/* ERROR NOT FOUND TICKTET */}
            {isUser && <p className="text-danger">Неверный цифровой талон</p>}
            {/* ERROR IF USER BOOKIG FOR PRACTICE EXAM */}
           
            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-success btn_width my-2"
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
      {/* MODAL LOADING ANIMATE  */}
      {isloading && <ModalLoading isLoading={isloading} />}
      {/* SHOW MODAL ERROR */}
      <ModalPracticeError
        isTheoryResModal={isTheoryResModal}
        setShow={setIsTheoryResModal}
      />
      {/* SHOW CONGRATULATION MODAL */}
      <ModalCongratPractice
        congartModal={congartModal}
        setShow={setCongartModal}
      />
    </div>
  );
};

export default PracticeExamPage;
