import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserDataView() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"))
    setUser(userData)
  }, []);

  return (
    <div className="d-flex flex-column my-2">
      <p className="ticket_text_aside">
        ФИО: <span className="fw-bold">{user?.fullname}</span>
      </p>
      <p className="ticket_text_aside">
        ИИН: <span className="fw-bold">{user?.iin}</span>
      </p>
      <p className="ticket_text_aside">
        Тип услуги: <span className="fw-bold">{user?.service}</span>
      </p>
      <p className="ticket_text_aside">
        КПП: <span className="fw-bold">{user?.kpp}</span>
      </p>
      {
      user?.statusT ?
      <p className="ticket_text_aside">
        Теоретический экзамен: <span className="fw-bold">Успешно сдан</span>
      </p> : null
      }
    </div>
  );
}
