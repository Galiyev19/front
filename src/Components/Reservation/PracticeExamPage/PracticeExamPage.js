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
import OTPInput, { ResendOTP } from "otp-input-react";

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
  const [OTP, setOTP] = useState("");

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
        //SHOW INPUT OTP TO VERIFY CODE
        setMessageBlock(true);
      }
      //APLICANT NOT FOUND
      else {
        setMessageBlock(false)
        //APPLICANT NOT FOUND ERROR
        isUser(true);
      }
    } catch (e) {
      navigate("/error-verify-page");
    }
  };

  //SEND SMS CODE FROM USER
  const sendVerifyCodeApplicant = async (verify_code) => {
    // try {
    //   const storageData = sessionStorage.getItem("iin");
    //   const obj = {
    //     iin: JSON.parse(storageData),
    //     code: verify_code,
    //   };

    //   const response = await verifySMSCode(obj);

    //   // APLICANT NOT PASS EXAM
    //   if (response.error) {
    //     //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
    //     setNotPassExam(true);
    //   }
    //   //APLICANT INPUT WRONG VERIFY CODE
    //   else if (response.success === false) {
    //     //SHOW ERROR APPLICANT INPUT WRONG VERIFY CODE
    //     setIsWrongCode(true);
    //   }
    //   //OK
    //   else {
    //     setNotPassExam(false);
    //     setIsVerify(true);
    //     dispatch(setDataUser(response));
    //     setMessageBlock(false)
    //   }
    // } catch (e) {
    //   navigate("/error-verify-page");
    // }

    fetch(url, {
      header: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Accept" : "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      method: "POST",
      body: JSON.stringify(obj),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    })
    .then((data) => {
      if (data.error) {
        //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
        setMessageBlock(false)
        setNotPassExam(true);
        setOTP("")
      }
      //APLICANT INPUT WRONG VERIFY CODE
      else if (data.success) {
        //SHOW ERROR APPLICANT INPUT WRONG VERIFY CODE
        setIsWrongCode(true);
        setOTP("")
      }
      //OK
      else if(data) {
        setNotPassExam(false);
        setIsVerify(true);
        dispatch(setDataUser(data));
        setMessageBlock(false)
        setOTP("")
      }
    // } 
    })
    .catch(function (res) {
      return res
    });
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
  const submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    setMessageBlock(false);
    sendVerifyCodeApplicant(OTP);
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
            {errors.IIN && <p className="text-danger">{errors.message}</p>}

            {/* ERROR NOT FOUND TICKTET */}
            {isUser && (
              <p className="text-danger my-2">Заявитель с таким ИИН не найден.</p>
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
        <div
          className="d-flex flex-wrap flex-column align-items-center justify-content-center w-100 mt-3"
          // onSubmit={handleSubmit(submit)}
        >
          <p className="px-3 text-center">
            Введите отправленный на ваш телефон номер код.
          </p>
          {/* <input
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
          /> */}
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType="number"
            maxTime={seconds}
            disabled={seconds === 0}
            inputStyles={{
              border: "1px solid green",
              width: "44px",
              height: "44px",
              fontSize: "18px",
              borderRadius: "8px",
            }}
            focusStyle={{
              border: "1px solid green",
            }}
          />

          {/* ERROR APPLICANT NOT PASS THEORY EXAM */}
          {notPassExam && <h2 className="texd-danger text-center">Заявитель не сдал теоритический экзамен</h2>}

          {/* ERROR APPLICANT  */}
          {isWrongCode && <p>Вы ввели не корректный код.</p>}
          <div className="d-flex flex-column w-50 align-items-center justify-content-center w-100 mt-3">
            <button
              className="btn btn-success mb-5"
              type="submit"
              onClick={submit}
              disabled={disBtn || OTP.length < 6}
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
        </div>
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
