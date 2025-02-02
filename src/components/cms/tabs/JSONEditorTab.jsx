import { useState } from 'react';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

const JSONEditorTab = ({ event, setEvent, onSave }) => {
  const [jsonError, setJsonError] = useState(null);
  const [jsonValue, setJsonValue] = useState(JSON.stringify(event, null, 2));

  const handleJsonChange = (value) => {
    setJsonValue(value);
    try {
      const parsed = JSON.parse(value);
      setEvent(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError('Invalid JSON format');
    }
  };

  const handleJsonSave = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      setEvent(parsed);
      setJsonError(null);
      onSave();
    } catch (error) {
      setJsonError('Invalid JSON format');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">JSON Editor</h2>
        <div className="flex items-center gap-4">
          {jsonError && (
            <div className="text-red-500 text-sm flex items-center gap-2">
              <FiAlertCircle />
              {jsonError}
            </div>
          )}
          <button
            onClick={handleJsonSave}
            disabled={!!jsonError}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              jsonError ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
            }`}
          >
            <FiCheck />
            Save Changes
          </button>
        </div>
      </div>

      <CodeMirror
        value={jsonValue}
        height="500px"
        theme={oneDark}
        extensions={[json()]}
        onChange={handleJsonChange}
        className="rounded-lg overflow-hidden border border-gray-700"
      />
    </div>
  );
};

JSONEditorTab.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default JSONEditorTab; 