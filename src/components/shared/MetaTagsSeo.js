import React from "react";
import { Helmet } from "react-helmet-async";

function MetaTagsSeo({ description, keywords, title, OGDescription, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={OGDescription} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://api.waslaa.de/images/logo.png"
      />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}

export default MetaTagsSeo;
