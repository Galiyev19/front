import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

//COMPONENTS
import ModalLoading from "../ModalLoading/ModalLoading";
import PracticeExamForm from "./PracticeExamForm/PracticeExamForm";
import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";
import ReactCountdownClock from "react-countdown-clock";
import ErrorVerifyPage from "../../ErrorPage/ErrorVerifyPage";

//REDUX
import { setDataUser } from "../../../store/slices/userDataSlice";

//ICON
import { IoIosArrowBack } from "react-icons/io";

//API REQUEST FUNCTION
import {
  verifyUserByIIN,
  verifySMSCode,
} from "../../../helpers/ApiRequestList";

const PracticeExamPage = () => {
  //USE TRANSLATE LANG
  const { t } = useTranslation();
  const navigate = useNavigate();

  //SHOW FORM SELECT DATE AND TIME FOR EXAM AFTER VERIFY APPLICANT
  const [isVerify, setIsVerify] = useState(false);
  //SHOW LOADING ANIMATION MODAL
  const [isloading, setIsLoading] = useState(false);
  //IF APPLICANT NOT FOUND SHOW ERROR
  const [isUser, setIsUser] = useState(false);

  //SHOW MODALS
  const [congartModal, setCongartModal] = useState(false);
  const [isTheoryResModal, setIsTheoryResModal] = useState(false);

  //TOOGLE SHOW INPUT VERIFY CODE
  const [messageBlock, setMessageBlock] = useState(false);
  //SECONDS FOR TIMER
  const [seconds, setSeconds] = useState(180);
  //FOR DISABLED BUTTON IF TIMER OUT OF TIME
  const [disBtn, setDisBtn] = useState(false);
  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notPassExam, setNotPassExam] = useState(false);
  //SHOW ERROR IF APPLICANT INPUT WRONG VERIFY CODE
  const [isWrongCode, setIsWrongCode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    IIN: "",
    mode: "onChange",
    message: "",
  });

  const dispatch = useDispatch();

  //SEND IIN TO DATABASE TO VERIFY USER
  const verifyUser = async (iin) => {
    try {
      const response = await verifyUserByIIN(iin);
      //APPLICANT FIND IN DATABASE
      if (response.success) {
        sessionStorage.setItem("iin", JSON.stringify(iin));
        setMessageBlock(true);
      }
      //APLICANT NOT FOUND
      else {
        isUser(true);
      }
    } catch (e) {
      navigate("/error-verify-page")
    }
  };

  //SEND SMS CODE FROM USER
  const sendVerifyCodeApplicant = async (verify_code) => {
    const storageData = sessionStorage.getItem("iin");
    const obj = {
      iin: JSON.parse(storageData),
      sms_code: verify_code,
    };

    const response = await verifySMSCode(obj);

    // APLICANT NOT PASS EXAM
    if (response.error) {
      //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
      setNotPassExam(true);
    }
    //APLICANT INPUT WRONG VERIFY CODE
    else if (response.success === false) {
      //SHOW ERROR APPLICANT INPUT WRONG VERIFY CODE
      setIsWrongCode(true);
    }
    //OK
    else {
      setNotPassExam(false);
      setIsVerify(true);
      dispatch(setDataUser(response));
    }
  };

  // IF THE TIMER IS OUT OF TIME TOOGLE DISABLED BUTTON "Забронировать"
  const timeDone = () => {
    setDisBtn(true);
  };

  // SEND SMS CODE AGAIN
  const SendMessageAgain = () => {
    setDisBtn(false);
    //RESTART TIMER
    setSeconds((seconds) => (seconds += 10));
    const storageData = sessionStorage.getItem("iin");
    verifyUser(JSON.parse(storageData));
  };

  //SUBMIT - SEND IIN AND GET VERIFY CODE
  const getMessage = (data) => {
    verifyUser(data.IIN);
  };

  //SEND SMS CODE FROM APPLICANT TO CHECK
  const submit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // getUserData(data.IIN);

    setMessageBlock(false);
    sendVerifyCodeApplicant(data.message);
    reset();
  };

  useEffect(() => {}, [isVerify, seconds]);

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
        {!isVerify ? (
          <form
            className={messageBlock ? "hide" : "form_input"}
            onSubmit={handleSubmit(getMessage)}
          >
            <p className="text-center">{t("head_text_input")}</p>
            {/* INPUT TICKET */}
            <input
              className="form-control input_w my-2"
              placeholder={t("iin_input_placeholder")}
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
          // SHOW FORM TO SELECT DATE AND TIME TO RESERVATION PRACTICE EXAM
          <div className="d-flex w-100 text-start align-items-center justify-content-center">
            <PracticeExamForm />
          </div>
        )}
      </div>
      {/* SHOW INPUT TO VERIFY CODE */}
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

          {/* ERROR APPLICANT NOT PASS THEORY EXAM */}
          {notPassExam && <p>Завитель не сдал теоритический экзамен</p>}

          {/* ERROR APPLICANT  */}
          {isWrongCode && <p>Вы ввели не корректный код.</p>}
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
            {/* COUNT DOWN TIMER */}
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
