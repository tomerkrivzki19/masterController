import React from "react";
import { Helmet } from "react-helmet";

function MetaWrapper({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} | GanHishakim` : "GanHishakim"}</title>
      <meta
        name="description"
        content={description || "Welcome to GanHishakim!"}
      />
    </Helmet>
  );
}

export default MetaWrapper;
