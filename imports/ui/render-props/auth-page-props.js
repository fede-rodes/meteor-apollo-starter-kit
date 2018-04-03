import React from 'react';
import {
  ServiceProps,
  servicePropTypes,
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
      <BtnProps>
        {(btnProps) => {
          const api = {
            service: serviceProps.service,
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
  </ServiceProps>
);

export default AuthPageProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const authPagePropTypes = {
  service: servicePropTypes.service,
  ...btnPropTypes,
};
