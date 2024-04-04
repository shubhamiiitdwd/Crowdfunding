import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Tooltip from "./Tooltip";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";

function Sidebar({ activeTab, setActiveTab, handleLogout, address }) {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (!link.disabled) {
      if (link.name === "Logout") {
        handleLogout();
        setActiveTab("Home");
        navigate(link.link);
      } else {
        setActiveTab(link.name);
        navigate(link.link);
      }
    }
  };

  const Icon = ({ styles, imgUrl, name, activeTab, disabled, handleClick }) => (
    <Tooltip
      message={disabled ? "✨ Coming soon!" : name}
      isHide={activeTab === name}
    >
      {name === "Logout" && !address ? (
        <></>
      ) : (
        <div
          className={`w-[48px] h-[48px] rounded-[10px]  ${
            activeTab === name && "bg-[#2c2f32]"
          } flex justify-center items-center ${
            !disabled && "cursor-pointer"
          } ${styles}`}
          onClick={handleClick}
        >
          {!activeTab ? (
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
          ) : (
            <img
              src={imgUrl}
              alt="fund_logo"
              className={`w-1/2 h-1/2 ${activeTab !== name && "grayscale"}`}
            />
          )}
        </div>
      )}
    </Tooltip>
  );
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/" onClick={() => setActiveTab("Home")}>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[24px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              activeTab={activeTab}
              handleClick={() => handleClick(link)}
            />
          ))}
        </div>
        <Tooltip message="✨ Coming soon!">
          <Icon
            styles="bg-[#1c1c24] shadow-secondary cursor-default"
            imgUrl={sun}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default Sidebar;
