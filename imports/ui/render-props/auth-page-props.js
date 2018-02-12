import React from 'react';
import {
  ServiceProps,
  servicePropTypes,
  ChangeViewProps,
  changeViewPropTypes,
  BtnProps,
  btnPropTypes,
} from './index';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
// Provides state fields and methods used accross all auth pages
const AuthPageProps = props => (
  <ServiceProps>
    {serviceProps => (
      <ChangeViewProps>
        {changeViewProps => (
          <BtnProps>
            {(btnProps) => {
              const api = {
                service: serviceProps.service,
                changeViewTo: to => (
                  // Extend changeViewTo's default functionality by
                  // clearing any messages before redirecting the user
                  changeViewProps.changeViewTo(to, btnProps.clearMessages)
                ),
                // Pass all state values and methods from btnProps
                ...btnProps,
                // Overwrite btnProps.handleSuccess
                handleBefore: obj => (
                  // Extend bntProps.handleBefore's default functionality by
                  // keeping track of the auth service being used
                  btnProps.handleBefore(() => {
                    if (obj && obj.service) {
                      serviceProps.setService(obj.service);
                    }
                  })
                ),
              };

              return props.children(api);
            }}
          </BtnProps>
        )}
      </ChangeViewProps>
    )}
  </ServiceProps>
);

export default AuthPageProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const authPagePropTypes = {
  service: servicePropTypes.service,
  changeViewTo: changeViewPropTypes.changeViewTo,
  ...btnPropTypes,
};
