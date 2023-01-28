import React from 'react';
import HeaderBar from './header-bar';

const ComponentHeader = (props) => {
  if (props.mutable) {
    return null;
  }
  return (
    <div className="component-header">
      {props.data.pageBreakBefore && (
        <div className="preview-page-break">Page Break</div>
      )}
      <HeaderBar
        parent={props.parent}
        editModeOn={props.editModeOn}
        editPermissionModeOn={props.editPermissionModeOn}
        data={props.data}
        index={props.index}
        setAsChild={props.setAsChild}
        onDestroy={props._onDestroy}
        onCopy={props._onCopy}
        onInsertAbove={props._onInsertAbove}
        onEdit={props.onEdit}
        static={props.data.static}
        required={props.data.required}
      />
    </div>
  );
};

export default ComponentHeader;
