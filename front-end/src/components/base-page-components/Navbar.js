/* Ilana-Mahmea */

import React from "react";
import { useNavigate } from "react-router-dom";
import IconLinkButton from "./IconLinkButton.js";
import IconButtonDropdown from "./IconButtonDropdown.js";
import IconHouseOutline from "../icon-components/IconHouseOutline.js";
import IconHouseFilled from "../icon-components/IconHouseFilled.js";
import IconPlusSquareOutline from "../icon-components/IconPlusSquareOutline.js";
import IconPlusSquareFilled from "../icon-components/IconPlusSquareFilled.js";
import IconCalendarWeekOutline from "../icon-components/IconCalendarWeekOutline.js";
import IconCalendarWeekFilled from "../icon-components/IconCalendarWeekFilled.js";
import IconPersonOutline from "../icon-components/IconPersonOutline.js";
import IconPersonFilled from "../icon-components/IconPersonFilled.js";
import IconGear from "../icon-components/IconGear.js";
import IconLogoutArrow from "../icon-components/IconLogoutArrow.js";
import IconOnClickButton from "./IconOnClickButton.js";

function Navbar() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  async function isAuth() {
    try {
      const res = await (await fetch("/api/auth")).json();
      return res.auth;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async function handleLogout() {
    const res = await (
      await fetch("/logout", {
        method: "POST",
      })
    ).json();
    if (res.success) {
      navigate("/login", { replace: true });
    }
  }

  return (
    <nav className="row text-center Navbar">
      <IconLinkButton
        className={pathname === "/home" ? "nav-a col active" : "nav-a col"}
        aria-current="page"
        icon={
          pathname === "/home" ? (
            <IconHouseFilled color="blue" />
          ) : (
            <IconHouseOutline />
          )
        }
        descriptionText="Home"
        linkPath={isAuth() ? "/home" : "/"}
      ></IconLinkButton>

      <IconLinkButton
        className={
          pathname === "/create-event" ? "nav-a col active" : "nav-a col"
        }
        icon={
          pathname === "/create-event" ? (
            <IconPlusSquareFilled color="blue" />
          ) : (
            <IconPlusSquareOutline />
          )
        }
        descriptionText="Create"
        linkPath={"/create-event"}
      ></IconLinkButton>

      <IconLinkButton
        className={pathname === "/dashboard" ? "nav-a col active" : "nav-a col"}
        icon={
          pathname === "/dashboard" ? (
            <IconCalendarWeekFilled color="blue" />
          ) : (
            <IconCalendarWeekOutline />
          )
        }
        descriptionText="Dashboard"
        linkPath={"/dashboard"}
      ></IconLinkButton>

      <IconButtonDropdown
        className={pathname === "/settings" ? "col active" : "col"}
        icon={
          pathname === "/settings" ? (
            <IconPersonFilled color="blue" />
          ) : (
            <IconPersonOutline />
          )
        }
        descriptionText="Me"
        dropdownMenu={[
          <IconOnClickButton
            className="dropdown-item"
            // https://atomizedobjects.com/blog/react/how-to-redirect-in-reactjs/
            onClick={() => navigate("/settings", { replace: true })}
            icon={
              pathname === "/settings" ? (
                <IconGear color="blue" />
              ) : (
                <IconGear />
              )
            }
            descriptionText={" Settings"}
            inline={true}
          ></IconOnClickButton>,
          <IconOnClickButton
            className="dropdown-item"
            onClick={handleLogout}
            icon={<IconLogoutArrow />}
            descriptionText={" Log Out"}
            inline={true}
          ></IconOnClickButton>,
        ]}
      ></IconButtonDropdown>
    </nav>
  );
}

Navbar.propTypes = {};

export default Navbar;
