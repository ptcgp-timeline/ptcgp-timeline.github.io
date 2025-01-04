import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FaWhatsapp, FaFacebook, FaXTwitter, FaTelegram, 
  FaLinkedin, FaPinterest, FaReddit, 
  FaTumblr, FaViber, FaLine, FaEnvelope 
} from 'react-icons/fa6';
import { MdContentCopy, MdCheck, MdClose} from 'react-icons/md';

const SharePopup = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: '#1877F2'
    },
    {
      icon: <FaXTwitter className="w-5 h-5" />,
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      color: '#000000'
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      label: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      color: '#25D366'
    },
    {
      icon: <FaTelegram className="w-5 h-5" />,
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      color: '#0088cc'
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: '#0A66C2'
    },
    {
      icon: <FaReddit className="w-5 h-5" />,
      label: 'Reddit',
      href: `https://reddit.com/submit?url=${encodeURIComponent(url)}`,
      color: '#FF4500'
    },
    {
      icon: <FaPinterest className="w-5 h-5" />,
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
      color: '#E60023'
    },
    {
      icon: <FaTumblr className="w-5 h-5" />,
      label: 'Tumblr',
      href: `https://www.tumblr.com/share/link?url=${encodeURIComponent(url)}`,
      color: '#36465D'
    },
    {
      icon: <FaViber className="w-5 h-5" />,
      label: 'Viber',
      href: `viber://forward?text=${encodeURIComponent(url)}`,
      color: '#7360F2'
    },
    {
      icon: <FaLine className="w-5 h-5" />,
      label: 'Line',
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
      color: '#00B900'
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      label: 'Email',
      href: `mailto:?body=${encodeURIComponent(url)}`,
      color: '#7C7C7C'
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-background-secondary p-6 rounded-xl max-w-lg w-full mx-4 shadow-lg" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-xl font-display">Share</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-primary font-semibold mb-2">Share via link</h3>
            <div className="flex items-center gap-2 p-3 bg-item rounded-xl border border-gray-700">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white font-body"
              />
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  copied 
                    ? 'bg-primary text-white' 
                    : 'bg-button text-gray-400 hover:text-white hover:bg-button/80'
                }`}
              >
                {copied ? (
                  <MdCheck className="w-5 h-5" />
                ) : (
                  <MdContentCopy className="w-5 h-5" />
                )}
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-primary font-semibold mb-3">Share via social media</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {shareButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                  style={{
                    backgroundColor: button.color
                  }}
                >
                  <span className="text-white">
                    {button.icon}
                  </span>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {button.label}
                  </span>
                </a>
              ))}
            </div>
          </section>

          <div className="text-gray-400 text-sm mt-6 pt-4 border-t border-gray-700">
            <p>
              Share this timeline with your friends!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SharePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default SharePopup; 