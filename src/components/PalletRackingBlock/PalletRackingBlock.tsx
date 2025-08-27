"use client";

import PalletRackingView from "./PalletRackingView";
import React from "react";

const PalletRackingBlock = () => {
  return (
    <section className="pallet-racking-block flex flex-col gap-10 overflow-hidden p-5 pt-14 md:p-10 h-screen">
      <PalletRackingView />
    </section>
  );
};

export default PalletRackingBlock;
