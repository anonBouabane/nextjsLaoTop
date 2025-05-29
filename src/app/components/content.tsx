"use client";

import React from "react";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        marginLeft: 10,
        marginTop: 10,
        marginRight: 20,
        backgroundColor: "white",
        padding: 24,
        minHeight: "calc(100vh - 70px - 20px)",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
