import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import ModalLoading from "../ModalLoading/ModalLoading";
import PracticeExamForm from "./PracticeExamForm/PracticeExamForm";
import { setDataUser } from "../../../store/slices/userDataSlice";

import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";
import ReactCountdownClock from "react-countdown-clock";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import {
  verifyUserByIIN,
  verifySMSCode,
} from "../../../helpers/ApiRequestList";

const PracticeExamPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isReserv, setIsReserv] = useState(false);
  const [congartModal, setCongartModal] = useState(false);
  const [isTheoryResModal, setIsTheoryResModal] = useState(false);
  const [messageBlock, setMessageBlock] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const [disBtn, setDisBtn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    IIN: "",
    mode: "onChange",
    message: "",
  });

  const dispatch = useDispatch();

  const getUserData = async (iin) => {
    const username = "admin";
    const password = "admin";

    // console.log(iin);

    fetch(`/api/search/applicant/${iin}`, {
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
          setSearch(false);
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
        if(data.error){
          setIsUser(true)
        }
        dispatch(setDataUser(data));
        setMessageBlock(true);
      })
      .catch((error) => {
        setIsUser(true);
        setSearch(false);
        // console.error(error);
      });
  };

  const verifyUser = async (iin) => {
    // const response = await verifyUserByIIN(iin);
    sessionStorage.setItem("iin", JSON.stringify(iin));
    setMessageBlock(true)
  };

  // IF THE TIMER IS OUT OF TIME
  const timeDone = () => {
    setDisBtn(true);
    // setMessageBlock(false);
  };

  // SEND SMS CODE AGAIN
  const SendMessageAgain = () => {
    setDisBtn(false);
    setSeconds((seconds) => (seconds += 10));
  };

  //SEND IIN AND VERIFY WITH SMS
  const getMessage = (data) => {
    // getUserData(data.IIN);
    verifyUser(data.IIN);
  };

  //AFTER INPUT SMS CODE
  const submit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    setSearch(true);
    // getUserData(data);
    reset();

    setMessageBlock(false);

    const storageData = sessionStorage.getItem("iin");
    
    const obj = {
      iin: JSON.parse(storageData),
      sms_code: data.message,
    };

    verifySMSCode(obj);
  };

  useEffect(() => {}, [search, isReserv, seconds]);

  return (
    <div className="offset_theory_exam_page flex-column">
      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2>{t("titlePagePracticeExam")}</h2>
      </div>
      <div className="d-flex w-100">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          назад
        </button>
      </div>
      <div className="d-flex w-100 text-start align-items-center justify-content-center">
        {!search ? (
          <form
            className={messageBlock ? "hide" : "form_input"}
            onSubmit={handleSubmit(getMessage)}
          >
            <p className="text-center">{t("head_text_input")}</p>
            {/* INPUT TICKET */}
            <input
              className="form-control input_w my-2"
              placeholder="Введите ИИН"
              maxLength="12"
              minLength="12"
              name="IIN"
              {...register("IIN", {
                required: "Введите ИИН",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "КОД состоит только из цифр",
                },
              })}
            />
            {/* ERRORS FOR INPUT */}
            {errors.IIN && <p className="text-danger">{errors.IIN.message}</p>}
            {/* ERROR NOT FOUND TICKTET */}
            {isUser && (
              <p className="text-danger">Заявитель с таким ИИН не найден.</p>
            )}
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
      {messageBlock && (
        <form
          className="d-flex flex-wrap flex-column align-items-center justify-content-center w-100 mt-3"
          onSubmit={handleSubmit(submit)}
        >
          <p className="px-3 text-center">
            Введите отправленный на ваш телефонный номер код.
          </p>
          <input
            className="form-control w-50 mb-2"
            maxLength="6"
            minLength="6"
            name="IIN"
            {...register("message", {
              required: "Введите или номер завки",
              pattern: {
                value: /^[0-9]+$/,
                message: "ИИН состоит только из цифр",
              },
            })}
          />
          <div className="d-flex flex-column w-50 align-items-center justify-content-center w-100 mt-3">
            <button
              className="btn btn-success mb-5"
              type="submit"
              disabled={disBtn}
            >
              Забронировать
            </button>
            <button
              className="btn mb-3 btn-light"
              onClick={() => SendMessageAgain()}
              disabled={!disBtn}
            >
              Отправить код повторно
            </button>
            <ReactCountdownClock
              seconds={seconds}
              color="#6c757d"
              alpha={2}
              size={48}
              onComplete={timeDone}
            />
          </div>
        </form>
      )}
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
