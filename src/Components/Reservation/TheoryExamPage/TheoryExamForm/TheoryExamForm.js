import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import ModalLoading from "../../ModalLoading/ModalLoading";
import UserDataView from "../../UserDataView/UserDataView";

import { setData } from "../../../../store/slices/ReservationTheoryData";

import {
  getExamDateById,
} from "../../../../helpers/ApiRequestList";

const TheoryExamForm = () => {
  //FOR LOADING MODAL
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(null);

  //FOR DISABLED SELECT

  // const [addressDepartament, setAddressDepartament] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(null);

  const [dateList, setDateList] = useState([]);
  const [examId, setExamId] = useState(null);
  const [dateError, setDateError] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [isAdd, setIsAdd] = useState(null);
  const [isRecord, setIsRecord] = useState(false);

  // DATA FROM REDUX
  const userData = useSelector((state) => state.userData.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // SORTED EXAM DATE
  // const sorted = exams.sort((a, b) => a.id - b.id);

  //use hook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    date: "",
    time: "",
    IIN: "",
    mode: "onChange",
  });

  //SELECT DATE
  const onChangeSelectDate = (value) => {
    setDate(value);
    console.log(value);
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

    console.log(timeObj);
    const obj1 = sessionStorage.getItem("date");
    if (obj1 === null) {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    } else {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    }
    setExamId(obj[0]?.id);
  };

  //CANCEL ACTION GO BACK
  const handnleCancelResTheoryExam = () => {
    // navigate(-1);
    reset();
  };

  //POST DATA TO SERVER FOR BOOKING THEORY EXAM
  const postUserData = async (obj) => {
    const url = "/api/exam/enroll/queue/";
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
      body: JSON.stringify(obj),
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
        console.log(res);
        const record = Object.values(res)[0];
        setIsRecord(record);
        // setIsAdd(res)
        // sessionStorage.setItem('isAdd',res.enrolled)
      })
      .catch(function (res) {
        // setErrorText(res);
      
      });
  };

  //SUBMIT FOR RESERVATION TO THEORY EXAM
  const handleSubmitTheoryExam = (data) => {
    const obj = {
      user_id: userData.id,
      exam_id: examId,
    };

    console.log(obj);

    console.log(userData);

    //POST DATA USER FOR SERVER
    postUserData(obj);
    dispatch(setData(obj));

    setLoading(true);

    //TIME FOR ANIMATION LOADING
    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (isRecord) {
      navigate("/reservation/theory-exam/ticket");
    } else {
      setIsRecord(true);
    }

    reset();
  };

  const getExamsDate = async (id) => {
    const response = await getExamDateById(id);
    console.log(response);
    if (response.length === 0) {
      setDateError(true);
      setDateList(response);
    } else {
      setDateError(false);
      setDateList(response);
    }
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    getExamsDate(userData.department_code);
    console.log(isRecord);
    // getCityList();
  }, [date, dateList?.length, isAdd, isRecord]);

  return (
    <div className="form_input_date_item">
      <div className="form-control my-4 ">
        <UserDataView />
      </div>
      <div className="w-100 d-flex text-center">
        {isRecord && <h2 className="text-danger">Вы уже записаны</h2>}
      </div>
      <form
        className="d-flex w-100 flex-column"
        onSubmit={handleSubmit(handleSubmitTheoryExam)}
      >
        {/* CITY  */}

        <p className="my-2">Город</p>
        <input disabled={true} value={userData.city} className="form-control" />

        {/*DEPARTMENT  */}

        <p className="my-2">Отделение</p>
        <input
          className="form-control"
          disabled={true}
          value={userData.department}
        />

        {/* SELECT DATE */}

        {/* ERROR IF DATE LIST EMPTY */}
        {dateError ? (
          <p className="fs-5 my-2 text-danger">
            К сожалению в этот день отсутствует запись в текущий департамент
          </p>
        ) : null}

        <p className="my-2">Выберите дату</p>
        <input
          className="form-control"
          type="date"
          min={today || dateList[0]?.date}
          max={dateList[dateList.length - 1]?.date}
          disabled={dateList.length === 0}
          {...register("date", { required: true })}
          onChange={(e) => onChangeSelectDate(e.target.value)}
        />
        {errors?.selectDate && (
          <p className="error_text text-danger my-2">Выберите дату</p>
        )}

        {/* SELECT TIME */}

        {/* ERROR TEXT IF TIME NOT GET */}
        {time?.length === 0 ? (
          <p className="fs-5 my-2 text-danger">
            К сожалению в текущий день нету записей
          </p>
        ) : null}
        <p className="my-2">Выберите время</p>
        <select
          className="form-select"
          {...register("time", {
            required: true,
          })}
          disabled={date === "" || time?.length === 0}
          onChange={(e) => onChangeSelectTime(e.target.value)}
        >
          <option value="">Выберите время</option>
          {time?.map((time) => (
            <option key={time.id}>{time.time}</option>
          ))}
        </select>
        {errors?.selectTime && (
          <p className="error_text text-danger my-2">Выберите время</p>
        )}

        {/* BUTTONS */}
        <div className="d-flex w-100 align-items-center justify-content-center mt-3">
          <button
            className="btn btn-danger mx-1"
            onClick={() => handnleCancelResTheoryExam()}
          >
            Отмена
          </button>

          <button
            disabled={examId === null}
            className="btn btn-success mx-1"
            type="submit"
          >
            Подтвердить
          </button>
        </div>
      </form>

      {loading && <ModalLoading isLoading={loading} />}
    </div>
  );
};

export default TheoryExamForm;
