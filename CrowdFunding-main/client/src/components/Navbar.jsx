import React, { Fragment, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

function Navbar({ activeTab, setActiveTab, handleLogout }) {
  const navigate = useNavigate();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { searchCampaign, address } = useStateContext();
  const location = useLocation();

  const handleClick = (link) => {
    if (!link.disabled) {
      if (link.name === "Logout") {
        handleLogout();
        setActiveTab("Home");
        setToggleDrawer(false);
        navigate(link.link);
      } else {
        setActiveTab(link.name);
        setToggleDrawer(false);
        navigate(link.link);
      }
    }
  };

  const isShowSearchBar =
    location?.pathname === "/" ||
    (location?.pathname === "/profile" && address);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div
        className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52] ${
          isShowSearchBar ? "bg-[#1c1c24]" : ""
        } `}
      >
        {isShowSearchBar ? (
          <>
            <input
              type="text"
              placeholder="Search  for campaigns"
              className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
              onChange={() => searchCampaign(event.target.value, activeTab)}
            />
            <div className="w-[72px] h-full rounded-[24px] bg-[#46cd8d] flex justify-center items-center cursor-pointer sm:p-1 p-1">
              <img
                src={search}
                alt="search"
                className="w-[15px h-[15px] object-contain"
              />
            </div>
          </>
        ) : (
          <div className="flex sm:text-lg text-sm text-[white] sm:hidden">
            {activeTab}
          </div>
        )}
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        {!address ? (
          <ConnectWallet />
        ) : (
          <CustomButton
            btnType="button"
            title="Create A Campaign"
            styles="bg-[#1dc071]"
            handleClick={() => navigate("create-campaign")}
          />
        )}

        <Link to="/profile" onClick={() => setActiveTab("Profile")}>
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Small Screen navigation*/}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <Fragment key={link.name}>
                {link.name === "Logout" && !address ? (
                  <li></li>
                ) : (
                  <li
                    key={link.name}
                    className={`flex p-4 ${
                      activeTab === link.name && "bg-[#3a3a43]"
                    }`}
                    onClick={() => handleClick(link)}
                  >
                    <img
                      src={link.imgUrl}
                      alt={link.name}
                      className={`w-[24px] h-[24px] object-contain ${
                        activeTab === link.name ? "grayscale-0" : "grayscale"
                      }`}
                    />
                    <p
                      className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                        activeTab === link.name
                          ? "text-[#1dc071]"
                          : "text-[#808191]"
                      }`}
                    >
                      {`${link.name} ${
                        link.disabled ? "    - Coming soon! " : ""
                      }`}
                    </p>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>

          <div className="flex mx-4">
            {!address ? (
              <ConnectWallet />
            ) : (
              <CustomButton
                btnType="button"
                title="Create A Campaign"
                styles="bg-[#1dc071]"
                handleClick={() => navigate("create-campaign")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
