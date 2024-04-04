import React from "react";
import { Helmet } from "react-helmet";

function Meta({
  title = "Crowdfunding",
  descriptionContent,
  keywordsContent,
  source,
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={descriptionContent} />
        <meta name="keywords" content={keywordsContent} />
        <link rel="canonical" href={source} />
      </Helmet>
    </>
  );
}

export default Meta;
