import PropTypes from 'prop-types';
import Giscus from '@giscus/react';

const Comments = ({ identifier }) => {
  return (
      <Giscus
        repo="ptcgp-timeline/ptcgp-timeline.github.io"
        repoId="R_kgDONhy-LQ"
        category="General"
        categoryId="DIC_kwDONhy-Lc4CluJ-"
        mapping="specific"
        term={identifier}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="catppuccin_macchiato"
        lang="en"
        loading="lazy"
        strict="1"
        moderatorLabels="moderator,admin,owner"
      />
  );
};

Comments.propTypes = {
  identifier: PropTypes.string.isRequired,
};

export default Comments; 