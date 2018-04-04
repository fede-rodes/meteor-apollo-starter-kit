import React from 'react';
import {
  DisabledProps,
  disabledPropTypes,
  MessageProps,
  messagePropTypes,
  HookProps,
  hookPropTypes,
} from './index';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
// Provides state fields and methods used across all form components
const FormProps = props => (
  <DisabledProps>
    {disabledProps => (
      <MessageProps>
        {messageProps => (
          <HookProps
            disabledProps={disabledProps}
            messageProps={messageProps}
          >
            {(hookProps) => {
              const api = {
                disabled: disabledProps.disabled,
                errorMsg: messageProps.errorMsg,
                successMsg: messageProps.successMsg,
                setSuccessMessage: messageProps.setSuccessMessage,
                clearMessages: messageProps.clearMessages,
                handleBefore: hookProps.handleBefore,
                handleClientError: hookProps.handleClientError,
                handleServerError: hookProps.handleServerError,
                handleSuccess: hookProps.handleSuccess,
              };

              return props.children(api);
            }}
          </HookProps>
        )}
      </MessageProps>
    )}
  </DisabledProps>
);

export default FormProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const formPropTypes = {
  disabled: disabledPropTypes.disabled,
  errorMsg: messagePropTypes.errorMsg,
  successMsg: messagePropTypes.successMsg,
  setSuccessMessage: messagePropTypes.setSuccessMessage,
  clearMessages: messagePropTypes.clearMessages,
  ...hookPropTypes,
};
