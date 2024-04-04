import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";
function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState("");

  const { address, contract, getUserCampaigns, userCampaigns, query } =
    useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    await getUserCampaigns();
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && !query) fetchCampaigns();
  }, [address, contract, query]);

  useEffect(() => {
    if (query && userCampaigns.length === 0) {
      const text = `No result found for query '${query}'`;
      setEmptyTitle(text);
    }
  }, [query]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      emptyTitle={emptyTitle}
      isLoading={isLoading}
      campaigns={userCampaigns}
      address={address}
    />
  );
}

export default Profile;
