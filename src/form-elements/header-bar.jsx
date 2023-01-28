/**
 * <HeaderBar />
 */

import React from 'react';
// import Grip from '../multi-column/grip';
import DragHandle from './component-drag-handle';

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div className="toolbar-header">
        {/* <span className="badge badge-secondary">{this.props.data.text}</span> */}
        <div className="toolbar-header-buttons">
          <div
            className="btn is-isolated"
            onClick={this.props.onCopy.bind(this, this.props.data)}
          >
            <i className="is-isolated fa-thin fas fa-copy"></i>
          </div>

          <div
            className="btn is-isolated"
            onClick={this.props.onDestroy.bind(this, this.props.data)}
          >
            <i className="is-isolated fa-sharp fa-solid fas fa-x"></i>
          </div>
          <div
            className="btn is-isolated"
            onClick={this.props.onInsertAbove.bind(this, this.props.data)}
          >
            <i className="is-isolated fas fa-plus"></i>
          </div>

          {this.props.data.element !== 'LineBreak' && (
            <div
              className="btn is-isolated"
              onClick={this.props.editModeOn.bind(
                this.props.parent,
                this.props.data
              )}
            >
              <i className="is-isolated fas fa-edit"></i>
            </div>
          )}
          {this.props.data.element !== 'LineBreak' && (
            <div
              className="btn is-isolated"
              onClick={this.props.editPermissionModeOn.bind(
                this.props.parent,
                this.props.data
              )}
            >
              <i className="is-isolated fas fa-signature"></i>
            </div>
          )}
          {/* {!this.props.data.isContainer &&
            <DragHandle data={this.props.data} index={this.props.index} onDestroy={this.props.onDestroy} setAsChild={this.props.setAsChild} />
          } */}

          <DragHandle
            data={this.props.data}
            index={this.props.index}
            onDestroy={this.props.onDestroy}
            onCopy={this.props.onCopy}
            onInsertAbove={this.props.onInsertAbove}
            setAsChild={this.props.setAsChild}
          />
        </div>
      </div>
    );
  }
}
