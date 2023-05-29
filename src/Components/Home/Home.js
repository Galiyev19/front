import React, { useContext, useEffect, useRef, useState } from "react";

import Menu from "./Menu/Menu";
import MenuNewDesign from "../MenuNewDesign/MenuNewDesign";

import driver_license from "../../assets/images/driver_license.jpg";

import { useTranslation } from "react-i18next";
import { MenuHoverContext } from "../../Context/Context";

import "./Home.css";
import { Container } from "react-bootstrap";

export default function Home() {
  const { t } = useTranslation();

  // hover or not menu item for resize h1
  const { isHover, setIsHover } = useContext(MenuHoverContext);
 

  return (
    <main className="main">
      <div className="header_text_block">
        <div className="header_text_block_item w-100">
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
        {/* <MenuNewDesign/> */}
      </div>
    </main>
  );
}


