import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserDataView() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"))
    setUser(userData)
  
  }, []);

  return (
    <div className="d-flex w-100 flex-column my-2">
      <p className="ticket_text_aside">
        ИИН: <span className="fw-bold">{user?.iin}</span>
      </p>
      <p className="ticket_text_aside">
        Город: <span className="fw-bold">{user?.city}</span>
      </p>
      <p className="ticket_text_aside">
        Отделение: <span className="fw-bold">{user?.department}</span>
      </p>
      <p className="ticket_text_aside">
        Категория: <span className="fw-bold">{user?.category}</span>
      </p>
    </div>
  );
}
