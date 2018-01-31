import React from 'react';
import {
  ServiceProps,
  DisabledProps,
  MessageProps,
  SubmitProps,
} from '../../render-props';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
// Provides state fields and methods used accross all auth pages
const AuthPageProps = props => (
  <ServiceProps>
    {serviceProps => (
      <DisabledProps>
        {disabledProps => (
          <MessageProps>
            {messageProps => (
              <SubmitProps
                serviceProps={serviceProps}
                disabledProps={disabledProps}
                messageProps={messageProps}
              >
                {(submitProps) => {
                  const ui = {
                    service: serviceProps.service,
                    disabled: disabledProps.disabled,
                    errorMsg: messageProps.errorMsg,
                    successMsg: messageProps.successMsg,
                    setSuccessMessage: messageProps.setSuccessMessage,
                    changeViewTo: submitProps.changeViewTo,
                    handleBefore: submitProps.handleBefore,
                    handleClientError: submitProps.handleClientError,
                    handleServerError: submitProps.handleServerError,
                    handleSuccess: submitProps.handleSuccess,
                  };

                  return props.children(ui);
                }}
              </SubmitProps>
            )}
          </MessageProps>
        )}
      </DisabledProps>
    )}
  </ServiceProps>
);

export default AuthPageProps;
