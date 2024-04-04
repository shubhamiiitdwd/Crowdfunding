import React, { useState, useEffect } from "react";

import { DisplayCampaigns, Meta } from "../components";
import { useStateContext } from "../context";
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState("");

  const { address, contract, getCampaigns, campaigns, query } =
    useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    await getCampaigns();
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && !query) fetchCampaigns();
  }, [address, contract, query]);

  useEffect(() => {
    if (query && campaigns.length === 0) {
      const text = `No result found for query '${query}'`;
      setEmptyTitle(text);
    }
  }, [query]);

  return (
    <>
      <Meta
        title="Crowd Funding | Create A Campaign now"
        description="description"
        descriptionContent="Support the project for no reward, just because it speaks to you"
        src="https://crowd-funding-kautzar.vercel.app/"
        keywordsContent="crowdfunding, campaign, fund"
      />
      <DisplayCampaigns
        title="All Campaigns"
        emptyTitle={emptyTitle}
        isLoading={isLoading}
        campaigns={campaigns}
        address={address}
      />
    </>
  );
}

export default Home;
