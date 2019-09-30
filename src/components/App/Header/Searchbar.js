import React from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ className }) => (
  <div className={className}>123</div>
  // <div className={styles.search}>
  //   <input
  //     type="text"
  //     onKeyPress={e => {
  //       if (e.key === 'Enter') {
  //         const newSearchQuery = e.target.value;
  //         onSubmit({ searchBy, searchQuery: newSearchQuery });
  //       }
  //     }}
  //     onChange={e => this.setState({ searchQuery: e.target.value })}
  //     value={searchQuery}
  //     placeholder={
  //       searchBy === 'company' ? 'ex: 台灣電機股份有限公司' : 'ex: 行銷企劃'
  //     }
  //   />
  //   <button
  //     className={styles.searchBtn}
  //     onClick={() => {
  //       onSubmit({ searchBy, searchQuery });
  //     }}
  //   >
  //     <Magnifiner />
  //   </button>
  //   <div className={styles.keywordGroup}>
  //     {(keywords || []).map(keyword => (
  //       <span
  //         key={keyword}
  //         className={styles.keyword}
  //         onClick={() => {
  //           onKeywordClick({ keyword, searchBy, searchQuery });
  //         }}
  //       >
  //         {keyword}
  //       </span>
  //     ))}
  //   </div>
  // </div>
);

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Searchbar;
