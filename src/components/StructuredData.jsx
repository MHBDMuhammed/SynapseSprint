import { Helmet } from 'react-helmet-async';

const StructuredData = ({ type, data }) => {
  let structuredData = {};

  switch (type) {
    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name || 'SynapseSprint',
        url: data.url || 'https://synapsesprint.vercel.app/',
        description: data.description || 'Enhance your English skills with adaptive quizzes tailored to your level',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${data.url || 'https://synapsesprint.vercel.app/'}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };
      break;

    case 'courseInstance':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CourseInstance',
        name: `${data.level || 'English'} Learning Quiz - SynapseSprint`,
        courseMode: 'online',
        description: `Adaptive English quiz for ${data.level || ''} level focused on ${data.topic || 'various topics'}.`,
        provider: {
          '@type': 'Organization',
          name: 'SynapseSprint',
          url: 'https://synapsesprint.vercel.app/'
        }
      };
      break;

    case 'quizAnswer':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: 'English Language Quiz',
        about: {
          '@type': 'Thing',
          name: 'English Language Learning'
        },
        educationalAlignment: {
          '@type': 'AlignmentObject',
          alignmentType: 'educationalLevel',
          targetName: data.level || 'All Levels'
        }
      };
      break;

    case 'learningResource':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'SynapseSprint English Learning',
        description: 'Adaptive quizzes to enhance English language skills',
        educationalLevel: 'Beginner to Advanced',
        learningResourceType: 'Quiz'
      };
      break;

    default:
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SynapseSprint',
        url: 'https://synapsesprint.vercel.app/',
        description: 'Enhance your English skills with adaptive quizzes tailored to your level'
      };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData; 