import React from 'react';
import {
  ServiceProps,
  DisabledProps,
  MessageProps,
  ChangeViewProps,
  SubmitProps,
} from './index';

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
              <ChangeViewProps>
                {changeViewProps => (
                  <SubmitProps
                    serviceProps={serviceProps}
                    disabledProps={disabledProps}
                    messageProps={messageProps}
                  >
                    {(submitProps) => {
                      const api = {
                        service: serviceProps.service,
                        disabled: disabledProps.disabled,
                        errorMsg: messageProps.errorMsg,
                        successMsg: messageProps.successMsg,
                        setSuccessMessage: messageProps.setSuccessMessage,
                        changeViewTo: to => (
                          // Extend changeViewTo's default functionality by
                          // clearing any messages before redirecting the user
                          changeViewProps.changeViewTo(to, messageProps.clearMessages)
                        ),
                        handleBefore: submitProps.handleBefore,
                        handleClientError: submitProps.handleClientError,
                        handleServerError: submitProps.handleServerError,
                        handleSuccess: submitProps.handleSuccess,
                      };

                      return props.children(api);
                    }}
                  </SubmitProps>
                )}
              </ChangeViewProps>
            )}
          </MessageProps>
        )}
      </DisabledProps>
    )}
  </ServiceProps>
);

export default AuthPageProps;
