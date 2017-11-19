import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql, compose } from 'react-apollo';
import { injectStripe, CardElement } from 'react-stripe-elements';
import Form from 'antd/lib/form'; // for js
import 'antd/lib/form/style/css'; // for css
import Radio from 'antd/lib/radio'; // for js
import 'antd/lib/radio/style/css'; // for css
import Button from 'antd/lib/button'; // for js
import 'antd/lib/button/style/css'; // for css
import userFragment from '../../apollo-client/fragments/user.graphql';
import planFragment from './graphql/fragment-plan.graphql';
import plansQuery from './graphql/query-plans.graphql';
import createOneTimeChargeMutation from './graphql/mutation-create-one-time-charge.graphql';
import createSubscriptionMutation from './graphql/mutation-create-subscription.graphql';
import Loading from '../loading.jsx';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class StripePlanPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedPlanId: 'small' };
    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePlanChange(evt) {
    this.setState({ selectedPlanId: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    const { selectedPlanId } = this.state;
    const {
      view,
      stripe,
      curUser,
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSucessHook,
      createOneTimeCharge,
      createSubscription,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      // Within the context of 'Elements', this call to createToken knows which
      // Element to tokenize, since there's only one in this group
      const { token, error } = await stripe.createToken({ name: curUser.profile.name });

      // In case of errors, throw an error so that the flow is interrupted and
      // handled back to the client
      if (error) {
        throw new Error(error.message);
      }

      const payload = {
        planId: selectedPlanId,
        source: token.id,
      };

      switch (view) {
        case 'oneTimeCharge':
          await createOneTimeCharge({ variables: payload });
          break;
        case 'subscription':
          await createSubscription({ variables: payload });
          break;
        default:
          onClientErrorHook('Unknown view option!');
          break;
      }

      // In case no error was thrown, display success message on UI
      onSucessHook();
    } catch (exc) {
      onServerErrorHook(exc);
    }
  }

  render() {
    const { selectedPlanId } = this.state;
    const { btnText, disabled, hasErrors, plansLoading, plans } = this.props;

    if (hasErrors) {
      return <div>Something bad happend!</div>;
    }

    if (plansLoading) {
      return <Loading />;
    }

    const radioBtns = plans.map(({ planId, label, price }) => (
      <Radio
        key={planId}
        className="block full-width"
        value={planId}
      >
        {label} | &#36;{(price / 100).toFixed(0)} {/* cents to dollars */}
      </Radio>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <RadioGroup onChange={this.handlePlanChange} value={selectedPlanId}>
            {radioBtns}
          </RadioGroup>
        </FormItem>
        <FormItem>
          <div>
            <h3>Test card:</h3>
            <p>card n: {'4242424242424242'}</p>
            <p>cad date: {'09/20'}</p>
            <p>cvc: {'381'}</p>
            <p>post code: {'03802'}</p>
          </div>
          <CardElement />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={disabled}
            loading={disabled}
            size="large"
            className="full-width"
          >
            {btnText}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

StripePlanPicker.propTypes = {
  view: PropTypes.oneOf(['oneTimeCharge', 'subscription']).isRequired,
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired,
  }).isRequired,
  curUser: propType(userFragment).isRequired,
  btnText: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
  hasErrors: PropTypes.bool,
  plansLoading: PropTypes.bool,
  plans: PropTypes.arrayOf(propType(planFragment)).isRequired,
  createOneTimeCharge: PropTypes.func.isRequired,
  createSubscription: PropTypes.func.isRequired,
};

StripePlanPicker.defaultProps = {
  btnText: 'Submit Order',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
  hasErrors: false,
  plansLoading: false,
  plans: [],
};

//------------------------------------------------------------------------------
// APOLLO INTEGRATION:
//------------------------------------------------------------------------------
/*
 * We use the `graphql` higher order component to send the graphql query to our
 * server. See for more information: http://dev.apollodata.com/react/
 */
const withData = graphql(plansQuery, {
  // Destructure the default props to more explicit ones
  props: ({ data: { error, loading, plans, refetch } }) => {
    if (loading) {
      return { plansLoading: true };
    }

    if (error) {
      console.log(error);
      return { hasErrors: true };
    }

    return {
      plans,
      refetch,
    };
  },
});

//------------------------------------------------------------------------------

const enhance = compose(
  withData, // Apollo data (plans)
  graphql(createOneTimeChargeMutation, { name: 'createOneTimeCharge' }), // Apollo integration
  graphql(createSubscriptionMutation, { name: 'createSubscription' }), // Apollo integration
  injectStripe, // Stripe library
  // Form.create(), // Antd HOC for error handling
);

export default enhance(StripePlanPicker);
