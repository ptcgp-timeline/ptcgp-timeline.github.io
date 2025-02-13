import PropTypes from 'prop-types';

const Switch = ({ checked, onChange, className = '' }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-secondary ${
        checked ? 'bg-primary' : 'bg-gray-600'
      } ${className}`}
    >
      <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
      />
    </button>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Switch; 