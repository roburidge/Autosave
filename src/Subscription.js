import * as React from "react";
import warning from "react-final-form/warning";
import PropTypes from "prop-types";
import { formSubscriptionItems } from "final-form";
import diffSubscription from "react-final-form/diffSubscription";
import { all } from "react-final-form/ReactFinalForm";

export default class FormSpy extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let initialState;
    warning(
      context.reactFinalForm,
      "FormSpy must be used inside of a ReactFinalForm component"
    );
    if (this.context.reactFinalForm) {
      // avoid error, warning will alert developer to their mistake
      this.subscribe(props);
    }
    this.state = { state: initialState };
  }

  subscribe = ({ subscription, listener }) => {
    this.unsubscribe = this.context.reactFinalForm.subscribe(
      listener,
      subscription || all
    );
  };

  componentWillReceiveProps(nextProps) {
    const { subscription } = nextProps;
    if (
      diffSubscription(
        this.props.subscription,
        subscription,
        formSubscriptionItems
      )
    ) {
      if (this.context.reactFinalForm) {
        // avoid error, warning will alert developer to their mistake
        this.unsubscribe();
        this.subscribe(nextProps, this.notify);
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return null;
  }
}

FormSpy.contextTypes = {
  reactFinalForm: PropTypes.object
};
