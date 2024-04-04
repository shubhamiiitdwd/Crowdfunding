import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Campaign, CreateCampaign, Profile } from "./pages";
import { Sidebar, Navbar } from "./components";

import { useStateContext } from "./context";

function App() {
  const { activeTab, handleActiveTab, disconnect, address } = useStateContext();
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleActiveTab}
          handleLogout={disconnect}
          address={address}
        />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleActiveTab}
          handleLogout={disconnect}
          address={address}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<Campaign />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
