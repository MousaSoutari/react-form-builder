import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const PLACE_HOLDER = 'header-Form-place-holder';
const PLACE_HOLDER_HIDDEN = 'form-place-holder-hidden';

class HeaderPlaceHolder extends React.Component {
  render() {
    const { intl } = this.props;
    const placeHolderClass = this.props.show
      ? PLACE_HOLDER
      : PLACE_HOLDER_HIDDEN;
    // eslint-disable-next-line no-nested-ternary
    const headerPlaceHolder = this.props.show
      ? this.props.text === 'Dropzone'
        ? intl.formatMessage({ id: 'drop-zone' })
        : this.props.text
      : '';

    return (
      <div className={placeHolderClass}>
        <div>{headerPlaceHolder}</div>
      </div>
    );
  }
}

export default injectIntl(HeaderPlaceHolder);
HeaderPlaceHolder.propTypes = {
  text: PropTypes.object,
  show: PropTypes.bool,
};

HeaderPlaceHolder.defaultProps = {
  text: 'Dropzone',
  show: false,
};
