"use client";

import React from "react";
import PalletRackingViewWithoutGyro from "./PalletRackingViewWithoutGyro";

const PalletRackingBlockWithoutGyro = () => {
  return (
    <section className="pallet-racking-block flex flex-col gap-10 overflow-hidden p-5 pt-14 md:p-10 h-screen">
      <PalletRackingViewWithoutGyro />
    </section>
  );
};

export default PalletRackingBlockWithoutGyro;
