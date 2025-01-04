import logoSmall from '@/assets/images/logo-small.svg';
import PropTypes from 'prop-types';

const Watermark = () => (
  <div className="absolute bottom-0 right-0 flex items-center">
    <a 
      href="https://ptcgp-timeline.github.io"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all group"
    >
      <img src={logoSmall} alt="" className="h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="w-px h-3 bg-gray-700"></div>
      <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-body">
        ptcgp-timeline.github.io
      </span>
    </a>
  </div>
);

Watermark.propTypes = {
  identifier: PropTypes.string.isRequired,
};

export default Watermark; 