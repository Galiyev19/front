import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MenuHoverProvider } from "./Context/Context";

import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import Reservation from "./Components/Reservation/Reservaton";
import ResultExam from "./Components/ResultExam/ResultExam";
import TrafficRulesInstructions from "./Components/TrafficRulesInstructions/TrafficRulesInstructions";
import TicketTheoryExam from "./Components/TicketTheoryExam/TicketTheoryExam";
import TheoryExamPage from "./Components/Reservation/TheoryExamPage/TheoryExamPage";
import SearchResultExam from "./Components/SearchResultExam/SearchResultExam";
import PracticeExamPage from "./Components/Reservation/PracticeExamPage/PracticeExamPage";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import TicketPracticeExam from "./Components/TicketPracticeExam/TicketPracticeExam";
import ErrorEnrollPage from "./Components/ErrorPage/ErrorEnrollPage";
import ErrorVerifyPage from "./Components/ErrorPage/ErrorVerifyPage";

import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <MenuHoverProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/application" element={<Application/>}/>
          <Route path="/reservation" element={<Reservation/>}/>
          <Route path="/reservation/practice-exam" element={<PracticeExamPage/>}/>
          <Route path="/reservation/practice-exam/ticket" element={<TicketPracticeExam/>}/>
          <Route path="/result-exam" element={<ResultExam/>}/>
          <Route path="/traffic-rules" element={<TrafficRulesInstructions/>}/>
          <Route path="/search-result-exam" element={<SearchResultExam/>}/>
          <Route path="/error-enroll-page" element={<ErrorEnrollPage/>}/>
          <Route path="/error-verify-page" element={<ErrorVerifyPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </MenuHoverProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
