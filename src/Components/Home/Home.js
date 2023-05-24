import React, { useContext, useEffect, useRef, useState } from "react";

import Menu from "./Menu/Menu";
import MenuNewDesign from "../MenuNewDesign/MenuNewDesign";

import driver_license from "../../assets/images/driver_license.jpg";

import { useTranslation } from "react-i18next";
import { MenuHoverContext } from "../../Context/Context";

import "./Home.css";

export default function Home() {
  const { t } = useTranslation();

  // hover or not menu item for resize h1
  const { isHover, setIsHover } = useContext(MenuHoverContext);
  const [test,setTest] = useState(false)
  const ref = useRef()

  // console.log(t('title'))
  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }

  useEffect(() => {
    setIsHover(false);
    
 
}, []);
useOnClickOutside(ref, () => setTest(false));

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
        {/* <Menu /> */}
        <MenuNewDesign/>
      </div>
    </main>
  );
}


