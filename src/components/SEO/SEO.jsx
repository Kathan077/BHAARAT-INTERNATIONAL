import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image, url }) {
  // Using favicon as fallback image
  const defaultImage = "/favicon.png";

  return (
    <Helmet>
      {/* Title */}
      {title && <title>{title} | Bhaarat International</title>}
      
      {/* Standard Meta Tags */}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      {title && <meta property="og:title" content={`${title} | Bhaarat International`} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image || defaultImage} />
      
      {/* Twitter */}
      {title && <meta name="twitter:title" content={`${title} | Bhaarat International`} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
