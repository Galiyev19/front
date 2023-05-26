import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setData } from "../../../../store/slices/ReservationTheoryData";

import UserDataView from "../../UserDataView/UserDataView";
import ModalLoading from "../../ModalLoading/ModalLoading";
import { setDataUser } from "../../../../store/slices/userDataSlice";

const PracticeExamForm = ({ isReserv }) => {
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(null);


  const [dateError, setDateError] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(null);
  const [examId, setExamId] = useState(null);
  const [kpp,setKPP] = useState("")
  const [errorText, setErrorText] = useState("");
  const [notTheoryExam,setNotTheoryExam] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData = useSelector((state) => state.userData.userData);
  
  
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    selectCity: "",
    selectAddress: "",
    selectDate: "",
    IIN: "",
    mode: "onChange",
  });

  //SELECT DATE
  const onChangeSelectDate = (value) => {
    setDate(value);
    
    const sortedTime = dateList.filter((item) => item.date.includes(value));

    dispatch(setData(sortedTime));
    setTime(sortedTime);
  };

  //SELECT TIME
  const onChangeSelectTime = (value) => {
    const obj = time.filter((item) => item.time.includes(value));
  
    const timeObj = {
      date: obj[0]?.date,
      time: obj[0]?.time,
    };

    
    const obj1 = sessionStorage.getItem("date");
    if (obj1 === null) {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    } else {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    }
    setExamId(obj[0]?.id);
  };

  //GET FREE PRACTICE EXAM
  const getFreeExamPractice = async (id_depart) => {
    const url = "/api/practice/free/exams/";
    const username = "admin";
    const password = "admin";


    const id = id_depart;
    const categoryName = userData.category;
    const kpp = userData.kpp === "Автомат" ? "автомат" : "механика";
    console.log(kpp)
    fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      method: "POST",
      body: JSON.stringify({
        department_id: id,
        category: categoryName,
        kpp: kpp,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          setDateError(true);
          setDateList(data);
        } else {
          setDateError(false);
          setDateList(data);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  };


  //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
  const postUserExamData = (user_exam_data) => {
    const url = "/api/practice/enroll/queue/";
    const username = "admin";
    const password = "admin";

    fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      method: "POST",
      body: JSON.stringify(user_exam_data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setErrorText(response.status);
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((res) => {
        if(res.enrolled) {
          navigate("/reservation/practice-exam/ticket");
        }else if(res.error){
          setNotTheoryExam(res.error)
        }
      })
      .catch(function (res) {
        setErrorText(res);
      });
  };

  //SUBMIT
  const handleSubmitPraticeExam = () => {
    const obj = {
      user_id: userData.id,
      exam_id: examId,
    };

    postUserExamData(obj);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };


  const userData = JSON.parse(sessionStorage.getItem("user"))
  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);                              
    getFreeExamPractice(userData.department_code);
  }, []);

  return (
    <div className="form_input_date_item">
      <div className="d-flex align-items-start justify-content-center form-control my-4 ">
        <UserDataView />
      </div>
      <h2>{errorText}</h2>
      {
        notTheoryExam.length !== 0 ? <h2>{notTheoryExam}</h2> : null 
      }
      <form
        onSubmit={handleSubmit(handleSubmitPraticeExam)}
        className="d-flex flex-column w-100"
      >
        {userData.kpp === "B" && (
          <>
            <p className="my-2 text-danger fs-3">
              Обязательно выберите вид КПП, который вы указали при регистрации.
            </p>
            <select className="form-select" onChange={(e) => setKPP(e.target.value)}>
              <option value="">Выберите КПП</option>
              <option value="АТ">Автомат</option>
              <option value="МТ">Механика</option>
            </select>
          </>
        )}
        {/* SELECT DATE */}
        {dateError ? (
          <p className="fs-5 my-2 text-danger">
            К сожалению в текущий день нету записей
          </p>
        ) : null}

        <p className="my-2">Выберите дату</p>
        <input
          className="form-control "
          {...register("selectDate", { required: true })}
          type="date"
          min={today || dateList[0]?.date}
          max={dateList[dateList.length - 1]?.date}
          disabled={dateList.length === 0}
          onChange={(e) => onChangeSelectDate(e.target.value)}
        />
        {errors?.selectDate && (
          <p className="error_text text-danger my-2">Выберите дату и время</p>
        )}
        {time?.length === 0 ? (
          <p className="fs-5 my-2 text-danger">
            К сожалению в текущий день нету записей
          </p>
        ) : null}

        {/* SELECT TIME */}
        <p className="my-2">Время</p>
        <select
          className="form-select"
          {...register("selectTime", { required: true })}
          disabled={date === "" || time?.length === 0}
          onChange={(e) => onChangeSelectTime(e.target.value)}
        >
          <option value="">Выберите время</option>
          {time?.map((time) => (
            <option key={time.id}>{time.time}</option>
          ))}
        </select>
        <div className="d-flex align-items-center justify-content-center w-100 mt-3">
          <button className="btn btn-danger mx-2">Отмена</button>
          <button
            className="btn btn-success mx-2"
            type="submit"
            disabled={examId === null}
          >
            Подтвердить
          </button>
        </div>
      </form>
      {loading && <ModalLoading isLoading={loading} />}
    </div>
  );
};

export default PracticeExamForm;
