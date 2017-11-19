/* import React from 'react';
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
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css
import userFragment from '../../apollo-client/fragments/user.graphql';
import planFragment from '../../apollo-client/fragments/plan.graphql';
import plansQuery from '../../apollo-client/queries/plans.graphql';
import subscribeCustomerMutation from '../../apollo-client/mutations/subscribe-customer.graphql';
import Loading from '../loading.jsx';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: props.curPlan || 'small',
      disabled: false,
      stripeError: '',
      stripeSuccess: '',
    };
    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePlanChange(evt) {
    this.setState({ plan: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    const { plan } = this.state;
    const { stripe, curUser, plans, subscribeCustomer } = this.props;

    // Disable submit button and clear messages if any
    this.setState({
      disabled: true,
      stripeError: '',
      stripeSuccess: '',
    });

    try {
      // Within the context of 'Elements', this call to createToken knows which
      // Element to tokenize, since there's only one in this group
      const { token } = await stripe.createToken({ name: curUser.profile.name });

      // Get selected plan data
      const { planId, price, label } = plans.find(p => p.planId === plan);

      // Subscribe user
      const subscribe = {
        planId,
        amount: price,
        currency: 'usd',
        description: label,
        source: token.id,
      };
      await subscribeCustomer({ variables: subscribe });

      // Display success message on UI
      this.setState({ stripeSuccess: 'Operation successful!' });
    } catch (exc) {
      // Display error on UI
      this.setState({ stripeError: exc.message });
    }
    // Re-enable submit button
    this.setState({ disabled: false });
  }

  render() {
    const { plan, disabled, stripeError, stripeSuccess } = this.state;
    const { hasErrors, plansLoading, plans } = this.props;

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
        {label} | &#36;{(price / 100).toFixed(0)} {/* cents to dollars /}
      </Radio>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <RadioGroup onChange={this.handlePlanChange} value={plan}>
            {radioBtns}
          </RadioGroup>
        </FormItem>
        <FormItem>
          <p>{'4242424242424242'}</p>
          <p>{'09/20'}</p>
          <p>{'381'}</p>
          <p>{'03802'}</p>
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
            Confirm order
          </Button>
          {stripeError && stripeError.length > 0 && (
            <Alert type="error" message={stripeError} className="mt1" banner />
          )}
          {stripeSuccess && stripeSuccess.length > 0 && (
            <Alert type="success" message={stripeSuccess} className="mt1" banner />
          )}
        </FormItem>
      </Form>
    );
  }
}

Subscribe.propTypes = {
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired,
  }).isRequired,
  curUser: propType(userFragment).isRequired,
  hasErrors: PropTypes.bool,
  plansLoading: PropTypes.bool,
  plans: PropTypes.arrayOf(propType(planFragment)).isRequired,
  curPlan: PropTypes.string,
  subscribeCustomer: PropTypes.func.isRequired,
};

Subscribe.defaultProps = {
  hasErrors: false,
  plansLoading: false,
  plans: [],
  curPlan: '',
};

//------------------------------------------------------------------------------
// APOLLO INTEGRATION:
//------------------------------------------------------------------------------
/*
 * We use the `graphql` higher order component to send the graphql query to our
 * server. See for more information: http://dev.apollodata.com/react/
 /
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
  graphql(subscribeCustomerMutation, { name: 'subscribeCustomer' }), // Apollo integration
  injectStripe, // Stripe library
  // Form.create(), // Antd HOC for error handling
);

export default enhance(Subscribe);
*/
