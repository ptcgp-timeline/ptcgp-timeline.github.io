import { useState } from 'react';
import { FiFolder, FiPlus, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

const FolderModal = ({ folders, onSelect, onClose, onCreateFolder }) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    
    // Convert to kebab case for folder idk which one is better just choosed this one
    const kebabName = newFolderName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    onCreateFolder(kebabName);
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-item rounded-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Select Folder</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-2">
          {Object.values(folders).map(folder => (
            <button
              key={folder.id}
              onClick={() => onSelect(folder.id)}
              className="w-full px-4 py-3 rounded-lg bg-background hover:bg-gray-700 transition-colors flex items-center gap-3"
            >
              <FiFolder className="text-primary" />
              <span className="font-medium">{folder.name}</span>
            </button>
          ))}
        </div>

        {showNewFolderInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <button
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim()}
              className="px-4 py-2 bg-primary rounded-lg font-semibold hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewFolderInput(true)}
            className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-700 hover:border-primary transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-primary"
          >
            <FiPlus />
            Create New Folder
          </button>
        )}
      </div>
    </div>
  );
};

FolderModal.propTypes = {
  folders: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateFolder: PropTypes.func.isRequired
};

export default FolderModal; 