import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'SynapseSprint', 
  description = 'Enhance your English skills with adaptive quizzes tailored to your level',
  canonicalUrl = '',
  ogType = 'website',
  ogImage = '/logo512.svg',
  keywords = 'english quiz, language learning, adaptive learning, vocabulary, grammar practice',
  locale = 'en_US'
}) => {
  // Full website URL - Ideal to replace with actual domain name in production
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${siteUrl}${canonicalUrl}`;
  const fullOgImageUrl = `${siteUrl}${ogImage}`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* Open Graph / Facebook metadata */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="SynapseSprint" />
      <meta property="og:locale" content={locale} />

      {/* Twitter metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* Additional metadata for better SEO */}
      <meta name="author" content="SynapseSprint Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO; 