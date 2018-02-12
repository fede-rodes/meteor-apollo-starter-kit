import React from 'react';
import {
  DisabledProps,
  MessageProps,
  SubmitProps,
} from './index';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
// Provides state fields and methods used across button components
const BtnProps = props => (
  <DisabledProps>
    {disabledProps => (
      <MessageProps>
        {messageProps => (
          <SubmitProps
            disabledProps={disabledProps}
            messageProps={messageProps}
          >
            {(submitProps) => {
              const api = {
                disabled: disabledProps.disabled,
                errorMsg: messageProps.errorMsg,
                successMsg: messageProps.successMsg,
                setSuccessMessage: messageProps.setSuccessMessage,
                handleBefore: submitProps.handleBefore,
                handleClientError: submitProps.handleClientError,
                handleServerError: submitProps.handleServerError,
                handleSuccess: submitProps.handleSuccess,
              };

              return props.children(api);
            }}
          </SubmitProps>
        )}
      </MessageProps>
    )}
  </DisabledProps>
);

export default BtnProps;
