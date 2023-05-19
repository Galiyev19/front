import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


import "./TicketTheoryExam.css";


export default function TicketTheoryExam() {
  const reservTheoryData = useSelector((state) => state.data.data);
  const userData = useSelector((state) => state.userData.userData);
  const departmentlist = useSelector(state => state.departmentList.departmentList)

  // console.log(departmentlist)
  // console.log(reservTheoryData);
  //console.log(reservTheoryData?.departament)

  const [user,setUser]=useState(null)
  const [date, setDate] = useState(null)
  const [department,setDepartment] = useState(null)

  useEffect(() => {
    const user = sessionStorage.getItem("user")
    setUser(JSON.parse(user))
    const date = sessionStorage.getItem("date")
    setDate(JSON.parse(date))
    console.log(date)
    const obj = sessionStorage.getItem("department")
    const departament = JSON.parse(obj)
    setDepartment(departament[0])
  },[])

  return (
    <div className="offset_ticket_theory_exam">
      <div className="d-flex flex-column h-50 w-75 border rounded border-dark p-4">
        <h3 className="text-center">Цифровой талон № {user?.app_number}</h3>
        <label className="my-2">
          <span className="ticket_text_aside">
            ФИО клиента: <span className="fw-bold">{user?.fullname}</span>
          </span>
          <span>{}</span>
        </label>
        <label className="my-2">
          <span className="ticket_text_aside">
            ИИН: <span className="fw-bold">{user?.iin}</span>
          </span>
          <span>{}</span>
        </label>
        <label className="my-2">
          <span className="ticket_text_aside">
            Адрес СпеЦОНa:{" "}
            <span className="fw-bold">{department?.name}</span>
          </span>
          <span>{}</span>
        </label>
        <label className="my-2">
          <span className="ticket_text_aside">
            Тип услуги:
            <span className="fw-bold">{user?.service}</span>
          </span>
          <span className="ticket_text_aside">{}</span>
        </label>
        <div className="my-2 w-100">
          <span className="ticket_text_aside text-wrap">
            Дата и время для сдачи <br /> теоритического экзамена:
          </span>
          <span className="fw-bold mx-2">
            {new Date(date?.date).toLocaleDateString()},
            {date?.time}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
