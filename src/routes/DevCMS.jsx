import  { useState, useRef } from 'react';
import EventEditor from '../components/cms/EventEditor';
import { LanguageProvider } from '../context';
import { FiFolder, FiChevronDown, FiChevronRight, FiMenu, FiAlertCircle, FiPlus } from 'react-icons/fi';
import ErrorBoundary from '../components/ErrorBoundary';
import dayjs from 'dayjs';
import FolderModal from '../components/cms/FolderModal';

// Import all event files
const eventFiles = import.meta.glob('../data/**/*.json', { eager: true });

// Helper function to get completion status
const getEventCompletion = (eventData) => {
  const sections = {
    titles: {
      fields: [
        { key: 'name.en', label: 'English Title', required: true },
        { key: 'name.ja', label: 'Japanese Title' },
        { key: 'name.ko', label: 'Korean Title' },
        { key: 'name.zh', label: 'Chinese Title' },
        { key: 'name.fr', label: 'French Title' },
        { key: 'name.de', label: 'German Title' },
        { key: 'name.es', label: 'Spanish Title' },
        { key: 'name.it', label: 'Italian Title' },
        { key: 'name.pt', label: 'Portuguese Title' }
      ],
      color: '#64ffda' // Emerald
    },
    core: {
      fields: [
        { key: 'image', label: 'Image', required: true },
        { key: 'start', label: 'Start Date', required: true },
        { key: 'end', label: 'End Date' }
      ],
      color: '#7c4dff' // Purple
    },
    urls: {
      fields: [
        { key: 'urls.en', label: 'English URLs' },
        { key: 'urls.ja', label: 'Japanese URLs' },
        { key: 'urls.ko', label: 'Korean URLs' },
        { key: 'urls.zh', label: 'Chinese URLs' },
        { key: 'urls.fr', label: 'French URLs' },
        { key: 'urls.de', label: 'German URLs' },
        { key: 'urls.es', label: 'Spanish URLs' },
        { key: 'urls.it', label: 'Italian URLs' },
        { key: 'urls.pt', label: 'Portuguese URLs' }
      ],
      color: '#ff7eb3' // Pink
    },
    descriptions: {
      fields: [
        { key: 'description.en', label: 'English Description' },
        { key: 'description.ja', label: 'Japanese Description' },
        { key: 'description.ko', label: 'Korean Description' },
        { key: 'description.zh', label: 'Chinese Description' },
        { key: 'description.fr', label: 'French Description' },
        { key: 'description.de', label: 'German Description' },
        { key: 'description.es', label: 'Spanish Description' },
        { key: 'description.it', label: 'Italian Description' },
        { key: 'description.pt', label: 'Portuguese Description' }
      ],
      color: '#ffb952' // Amber
    }
  };

  const getSectionCompletion = (section) => {
    const completed = section.fields.filter(field => {
      const [category, lang] = field.key.split('.');
      if (category === 'name') return eventData[category]?.[lang];
      if (category === 'urls') return eventData[category]?.[lang]?.length > 0;
      if (category === 'description') return eventData[category]?.[lang];
      return eventData[field.key];
    });

    const requiredCompleted = section.fields
      .filter(f => f.required)
      .every(field => {
        const [category, lang] = field.key.split('.');
        if (category === 'name') return eventData[category]?.[lang];
        return eventData[field.key];
      });

    const missing = section.fields.filter(field => {
      const [category, lang] = field.key.split('.');
      if (category === 'name') return !eventData[category]?.[lang];
      if (category === 'urls') return !eventData[category]?.[lang]?.length;
      if (category === 'description') return !eventData[category]?.[lang];
      return !eventData[field.key];
    });

    return {
      total: section.fields.length,
      completed: completed.length,
      requiredCompleted,
      missing,
      percentage: Math.round((completed.length / section.fields.length) * 100)
    };
  };

  const sectionResults = Object.entries(sections).reduce((acc, [key, section]) => {
    acc[key] = {
      ...getSectionCompletion(section),
      color: section.color
    };
    return acc;
  }, {});

  const allRequired = Object.values(sections)
    .flatMap(s => s.fields)
    .filter(f => f.required);

  const requiredCompleted = allRequired.every(field => {
    const [category, lang] = field.key.split('.');
    if (category === 'name') return eventData[category]?.[lang];
    return eventData[field.key];
  });

  return {
    sections: sectionResults,
    requiredCompleted,
    totalRequired: allRequired.length
  };
};

const DevCMS = () => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  //const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'name' | 'completion'
  const [filterText, setFilterText] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const sidebarRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [showFolderModal, setShowFolderModal] = useState(false);

  // Group and sort files by their folders
  const folders = Object.entries(eventFiles).reduce((acc, [path, module]) => {
    const pathParts = path.split('/');
    const folderName = pathParts[pathParts.length - 2];
    const fileName = pathParts[pathParts.length - 1];

    if (pathParts.length <= 3) return acc;

    if (!acc[folderName]) {
      acc[folderName] = {
        id: folderName,
        name: folderName.replace(/-/g, ' '),
        files: []
      };
    }

    const eventData = module.default || module;
    const completion = getEventCompletion(eventData);

    acc[folderName].files.push({
      id: fileName.replace('.json', ''),
      name: fileName,
      enTitle: eventData.name?.en || fileName.replace('.json', '').split('-').slice(1).join(' '),
      completion,
      startDate: eventData.start ? dayjs(eventData.start) : null
    });

    // Sort files by start date
    acc[folderName].files.sort((a, b) => {
      if (!a.startDate && !b.startDate) return 0;
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;
      return a.startDate.isBefore(b.startDate) ? -1 : 1;
    });

    return acc;
  }, {});

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleCreateNewEvent = () => {
    setShowFolderModal(true);
  };

  const handleFolderSelect = async (folderId) => {
    setSelectedFolder(folderId);
    setSelectedEventId(null);
    setIsCreatingEvent(true);
    //setShowJsonEditor(false);
    setShowFolderModal(false);
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const response = await fetch('/api/dev/create-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderName })
      });

      if (!response.ok) {
        throw new Error('Failed to create folder');
      }

      // Refresh the page to update the folder list
      window.location.reload();
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId);
    setIsCreatingEvent(false);
    //setShowJsonEditor(false);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const newWidth = e.clientX;
    if (newWidth >= 300 && newWidth <= 800) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-white">
        <header className="bg-item border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Event CMS</h1>
                <p className="text-gray-400 text-sm">Development Mode Only</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCreateNewEvent}
                  className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
                >
                  <FiPlus />
                  Create New Event
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Exit CMS
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex h-[calc(100vh-76px)]">
          {/* Sidebar */}
          <div 
            ref={sidebarRef}
            style={{ width: sidebarWidth }}
            className="relative flex-none bg-item border-r border-gray-700"
          >
            <div className="h-full overflow-y-auto scrollbar-custom">
              <div className="p-4 space-y-4">
                {/* Search and Sort Controls */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full px-3 py-2 bg-background border border-gray-700 rounded-lg"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                  />
                  <select
                    className="w-full px-3 py-2 bg-background border border-gray-700 rounded-lg"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="completion">Sort by Completion</option>
                  </select>
                </div>

                {/* Folders */}
                <div className="space-y-2">
                  {Object.values(folders)
                    .filter(folder => 
                      folder.name.toLowerCase().includes(filterText.toLowerCase()) ||
                      folder.files.some(f => f.enTitle.toLowerCase().includes(filterText.toLowerCase()))
                    )
                    .map(folder => (
                      <div key={folder.id} className="rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFolder(folder.id)}
                          className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-700 transition-colors ${
                            selectedFolder === folder.id ? 'bg-primary/20 text-primary' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FiFolder className="text-primary" />
                            <span className="font-medium">{folder.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                              {folder.files.length}
                            </span>
                            {expandedFolders[folder.id] ? <FiChevronDown /> : <FiChevronRight />}
                          </div>
                        </button>
                        
                        {expandedFolders[folder.id] && (
                          <div className="pl-4">
                            {folder.files
                              .filter(file => file.enTitle.toLowerCase().includes(filterText.toLowerCase()))
                              .sort((a, b) => {
                                if (sortBy === 'date') {
                                  if (!a.startDate && !b.startDate) return 0;
                                  if (!a.startDate) return 1;
                                  if (!b.startDate) return -1;
                                  return a.startDate.isBefore(b.startDate) ? -1 : 1;
                                }
                                if (sortBy === 'name') {
                                  return a.enTitle.localeCompare(b.enTitle);
                                }
                                // Sort by completion
                                return b.completion.percentage - a.completion.percentage;
                              })
                              .map(file => (
                                <button
                                  key={file.id}
                                  onClick={() => handleSelectEvent(file.id)}
                                  className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 group ${
                                    selectedEventId === file.id ? 'bg-primary/20 text-primary' : ''
                                  }`}
                                >
                                  <FiMenu className="text-gray-400 group-hover:text-primary transition-colors" />
                                  <span className="flex-1 text-left truncate">
                                    {file.enTitle}
                                  </span>
                                  <div 
                                    className="flex items-center gap-1"
                                    title={Object.entries(file.completion.sections)
                                      .map(([name, section]) => 
                                        `${name}: ${section.completed}/${section.total}\n${
                                          section.missing.length > 0 
                                            ? `Missing: ${section.missing.map(f => f.label).join(', ')}`
                                            : 'All fields completed'
                                        }`
                                      )
                                      .join('\n\n')}
                                  >
                                    {Object.entries(file.completion.sections).map(([key, section]) => (
                                      <span
                                        key={key}
                                        className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1"
                                        style={{ 
                                          backgroundColor: `${section.color}20`,
                                          color: section.color
                                        }}
                                      >
                                        {section.completed}/{section.total}
                                      </span>
                                    ))}
                                    {!file.completion.requiredCompleted && (
                                      <FiAlertCircle className="text-red-400" />
                                    )}
                                  </div>
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* Resize handle */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 transition-colors"
              onMouseDown={handleMouseDown}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto scrollbar-custom p-8">
            <ErrorBoundary>
              {isCreatingEvent || selectedEventId ? (
                <EventEditor 
                  targetFolder={selectedFolder} 
                  eventId={selectedEventId}
                />
              ) : (
                <div className="bg-item rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-400">
                    Select an event to edit or create a new one
                  </h3>
                </div>
              )}
            </ErrorBoundary>
          </div>
        </main>

        {/* Folder Selection Modal */}
        {showFolderModal && (
          <FolderModal
            folders={folders}
            onSelect={handleFolderSelect}
            onClose={() => setShowFolderModal(false)}
            onCreateFolder={handleCreateFolder}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default DevCMS; 