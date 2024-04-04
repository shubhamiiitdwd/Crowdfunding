import React from "react";
import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";
import { loader } from "../assets";

function DisplayCampaigns({
  title,
  isLoading,
  campaigns,
  emptyTitle,
  address,
}) {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      {isLoading && (
        <>
          <div className="h-[70vh] flex justify-center items-center">
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
        </>
      )}
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {address && emptyTitle
              ? emptyTitle
              : !address
              ? "Please connect your wallet to see your campaigns"
              : "You have not created any campaigns yet"}
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default DisplayCampaigns;
