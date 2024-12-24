import PropTypes from 'prop-types';
import { FaTimes, FaGithub } from 'react-icons/fa';

const AboutPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-background-secondary p-6 rounded-xl max-w-lg w-full mx-4" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-xl">About</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-primary font-semibold mb-2">What&apos;s this?</h3>
            <p className="text-gray-300 leading-relaxed">
              This is a simple timeline viewer for Pokemon TCG Pocket events and stuff. 
              It helps you keep track of which events are happening in the game, whether it&apos;s 
               events, new pack release or other stuff.
            </p>
          </section>

          <section>
            <h3 className="text-primary font-semibold mb-2">Cool Features</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-1">
              <li>See events in your local time</li>
              <li>Switch between different languages</li>
              <li>Track ongoing and upcoming events</li>
            </ul>
          </section>

          <section>
            <h3 className="text-primary font-semibold mb-2">Want to Help?</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/as280093/ptcgp-timeline"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-xl" />
                <span>Check us out on GitHub</span>
              </a>
            </div>
          </section>

          <div className="text-gray-400 text-sm mt-6 pt-4 border-t border-gray-700">
            <p>
              Found a bug or have a suggestion? Feel free to open an issue on GitHub!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AboutPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AboutPopup; 