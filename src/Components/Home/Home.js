import React, { useContext, useEffect } from "react";

import Menu from "./Menu/Menu";
import driver_license from "../../assets/images/driver_license.jpg";

import { MenuHoverContext } from "../../Context/Context";

import "./Home.css";
import { useTranslation } from "react-i18next";


export default function Home() {

  const { t } = useTranslation()

  // hover or not menu item for resize h1
  const { isHover, setIsHover } = useContext(MenuHoverContext);

  // console.log(t('title'))


  useEffect(() => {
    setIsHover(false);
  },[])

  return (
    <main className="main">
        <div className="header_text_block">
          <div className="header_text_block_item">
            <h1 className={!isHover ? "header_text" : "menu_item_text"}>
              {t("title")}
            </h1>
          </div>
          <div className="header_text_block_item">
            <img
              src={driver_license}
              className={isHover ? "driver_img_hidden" : "driver_img"}
              alt="водительское удостоверения"
            />
          </div>
        </div>
      <div className="menu">
        <Menu />
      </div>
    </main>
  );
}
