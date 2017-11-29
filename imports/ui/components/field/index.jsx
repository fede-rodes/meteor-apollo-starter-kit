import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/index.jsx';
import Input from '../input/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Field extends React.Component {
  constructor(props) {
    super(props);
    this.triggerUpdate = this.triggerUpdate.bind(this);
  }

  componentDidMount() {
    // Trigger an onChange on inital load to support browser prefilled values
    this.triggerUpdate();
  }

  /* componentDidUpdate(prevProps) {
    // Re-mount component so that we don't expose browser prefilled passwords if
    // the component was a password before and now something else
    if (prevProps.id !== this.props.id) {
      this.setState({ mount: false });
    }
    else if (!this.state.mount) {
      this.setState({mount: true});
      this.triggerUpdate();
    }
  } */

  triggerUpdate() {
    const { onChange } = this.props;
    if (this.input && onChange) {
      onChange({ target: { value: this.input.value } });
    }
  }

  render() {
    const {
      id,
      placeholder,
      label,
      type,
      onChange,
      required,
      className,
      defaultValue,
      message,
    } = this.props;

    return (
      <div className={className}>
        <Label
          htmlFor={id}
          required={required}
        >
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {/* message && (
          <span className={['message', message.type].join(' ').trim()}>
            {message.message}
          </span>
        ) */}
      </div>
    );
  }
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    null,
  ]),
  message: PropTypes.string,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  placeholder: '',
  label: '',
  type: 'text',
  required: false,
  className: '',
  defaultValue: null,
  message: '',
  onChange: () => {},
};

export default Field;
