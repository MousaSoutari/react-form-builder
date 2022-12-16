import React from 'react';

const ComponentRight = (props) => {
  if (props.mutable) {
    return null;
  }
  return (
    <div className="component-right">
      {props.data.pageBreakBefore && (
        <div className="preview-page-break">Page Break</div>
      )}
      {props.rightComponent}
    </div>
  );
};

export default ComponentRight;
