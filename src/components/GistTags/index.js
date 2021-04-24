import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const GistTags = (props) => {
  const files = props.fileList;
  const tags = [];
  const unique = (value, index, self) => self.indexOf(value) === index;

  for (const file in files) {
    if (files.hasOwnProperty(file)) {
      tags.push(files[file].language);
    }
  }
  return (
    <section className="gist-tags">
      <h3 className='tags-title'>Tags</h3>
      <div className="tags-wrapper">
        {tags.filter(unique).map((tag) => (
          <div className="tag" key={tag}>
            {tag || 'Raw'}
          </div>
        ))}
      </div>
    </section>
  );
};

GistTags.propTypes = {
  fileList: PropTypes.object.isRequired,
};

export default GistTags;
