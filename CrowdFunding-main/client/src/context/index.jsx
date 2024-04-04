import React, { useContext, createContext, useState, useEffect } from "react";

import {
  useAddress,
  useContract,
  useContractWrite,
  useDisconnect,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [masterCampaigns, setMasterCampaigns] = useState([]);
  const [masterUserCampaigns, setMasterUserCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const tab = localStorage.getItem("activeTab");
    if (tab) setActiveTab(tab);
  }, []);

  const { contract } = useContract(
    "0x2504f94b62871A2C1F24398dAE2c70fDD14A0144"
  );
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    setMasterCampaigns(parsedCampaigns);
    setCampaigns(parsedCampaigns);
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    setMasterUserCampaigns(filteredCampaigns);
    setUserCampaigns(filteredCampaigns);
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  // page is coming from where is the search being used
  const searchCampaign = (q, page) => {
    if (!q) {
      page === "Home"
        ? setCampaigns(masterCampaigns)
        : setUserCampaigns(masterUserCampaigns);
      setQuery("");
      return;
    }
    setQuery(q);
    let updatedCampaigns =
      page === "Home" ? [...masterCampaigns] : [...masterUserCampaigns];
    updatedCampaigns = updatedCampaigns.filter((item) => {
      return item?.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    page === "Home"
      ? setCampaigns(updatedCampaigns)
      : setUserCampaigns(updatedCampaigns);
  };

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const disconnect = useDisconnect();

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        searchCampaign,
        campaigns,
        userCampaigns,
        query,
        activeTab,
        handleActiveTab,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
