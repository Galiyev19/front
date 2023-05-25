import i18n  from "i18next";
import { initReactI18next, i } from 'react-i18next'


import booking from '../assets/images/booking.jpeg'
import res_exam from '../assets/images/res_exam.jpeg'
import pdd from '../assets/images/pdd.jpeg'

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        translation: {
            title: "Получение водительского удостоверения",
            test: {id: 1},
            menu: [
                {
                    id: 1,
                    menu_name: "Электронное бронирование",
                    menu_img: booking,
                    menu_bg_color: "#FEFEFE",
                    link: "reservation"
                  },
                  {
                    id: 2,
                    menu_name: "Результаты экзаменов",
                    menu_img: res_exam,
                    menu_bg_color: "#6cb883",
                    color_text: "#FFFFFF",
                    link: "result-exam"
                  },
                  {
                    id: 3,
                    menu_name: "Инструкция ПДД",
                    menu_img: pdd,
                    menu_bg_color: "#deebec",
                    link: "traffic-rules"
                  },
                ],
                btn_title_reservation_theory_exam: "Онлайн бронирование для сдачи теоретического экзамена",
                btn_title_reservation_practce_exam: "Онлайн бронирование для сдачи практического экзамена",
                titlePageTheoryExam: "БРОНИРОВАТЬ ОЧЕРЕДЬ ДЛЯ СДАЧИ ТЕОРЕТИЧЕСКОГО ЭКЗАМЕНА",
                titlePagePracticeExam: "БРОНИРОВАТЬ ОЧЕРЕДЬ ДЛЯ СДАЧИ ПРАКТИЧЕСКОГО ЭКЗАМЕНА",
                btn_title_reservation: "Авторизоваться",
                head_text_input: "Введите ИИН"
        },
      },
      kz: {
        translation: {
            title: "Жүргізуші куәлігін алу",
            menu: [
                {
                    id: 1,
                    menu_name: "Электрондық брондау",
                    menu_img: booking,
                    menu_bg_color: "#FEFEFE",
                    link: "reservation"
                  },
                  {
                    id: 2,
                    menu_name: "Eмтихан нәтижелері",
                    menu_img: res_exam,
                    menu_bg_color: "#6cb883",
                    color_text: "#FFFFFF",
                    link: "result-exam"
                  },
                  {
                    id: 3,
                    menu_name: "ЖҚЕ нұсқауы",
                    menu_img: pdd,
                    menu_bg_color: "#deebec",
                    link: "traffic-rules"
                  },
            ],
            btn_title_reservation_theory_exam: "Теориялық емтиханға онлайн тіркелу",
            btn_title_reservation_practce_exam: "Практикалық емтиханға онлайн тіркелу",
            titlePageTheoryExam: "ТЕОРИЯЛЫҚ ЕМТИХАН ӨТУ ҮШІН КЕЗЕГІН БРОНДАУ",
            titlePagePracticeExam: "ПРАКТИКАЛЫҚ ЕМТИХАН ӨТУ ҮШІН КЕЗЕГІН БРОНДАУ",
            btn_title_reservation: "Брондау",
            head_text_input: "ЖСН-ді енгізіңіз"
        },
      },
    },
  });

export default i18n;

