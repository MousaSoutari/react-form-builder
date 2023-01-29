import React, { Component } from 'react';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';
import ComponentRight from './component-right';

class CustomElement extends Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const { bare } = this.props.data;
    const props = {};
    props.name = this.props.data.field_name;
    props.defaultValue = this.props.defaultValue;

    if (this.props.mutable && this.props.data.forwardRef) {
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    // Return if component is invalid.
    if (!this.props.data.component) return null;
    const Element = this.props.data.component;

    let containerClasses = 'ContainerItem rfb-item';
    if (this.props.data.pageBreakBefore) {
      containerClasses += ' alwaysbreak';
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) {
      baseClasses += ' alwaysbreak';
    }

    return (
      <div className={containerClasses}>
        <div className={baseClasses}>
          {(this.props.index || this.props.index === 0) && (
            <h3 className="sortableItem-sequence">{this.props.index + 1}</h3>
          )}
          {bare ? (
            <Element
              data={this.props.data}
              {...this.props.data.props}
              {...props}
            />
          ) : (
            <div className="form-group">
              <Element
                data={this.props.data}
                {...this.props.data.props}
                {...props}
              />
              <ComponentLabel className="form-label" {...this.props} />
            </div>
          )}
          <ComponentHeader {...this.props} />
        </div>
        {/* <ComponentRight {...this.props} /> */}
      </div>
    );
  }
}

CustomElement.propTypes = {};

export default CustomElement;
