import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SUPPORTED_LANGUAGES } from '../../../constants';

const LanguageValidator = ({ event }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const newIssues = [];

    // Check missing translations
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (!event.name[lang]) {
        newIssues.push(`Missing ${lang.toUpperCase()} translation`);
      }
    });

    // Check URLs
    if (!event.urls?.en?.length) {
      newIssues.push('Missing English URLs');
    }

    // Check image
    if (!event.image) {
      newIssues.push('No image selected');
    }

    // Check dates
    if (!event.start || !event.end) {
      newIssues.push('Missing start or end date');
    }

    setIssues(newIssues);
  }, [event]);

  if (!issues.length) return null;

  return (
    <div className="mb-8 p-4 bg-red-100 rounded-xl">
      <h3 className="text-lg font-bold text-red-800 mb-2">Validation Issues</h3>
      <ul className="list-disc pl-4">
        {issues.map((issue, i) => (
          <li key={i} className="text-red-700">{issue}</li>
        ))}
      </ul>
    </div>
  );
};

LanguageValidator.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.objectOf(PropTypes.string),
    urls: PropTypes.shape({
      en: PropTypes.arrayOf(PropTypes.string)
    }),
    image: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string
  }).isRequired
};

export default LanguageValidator; 