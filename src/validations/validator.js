const availableRules = [
  {
    name: "required",
    handler: (attribute, payload) => {
      const value = payload[attribute];

      return value !== undefined && value !== null && value !== "";
    },
    message: (attribute) => `${attribute} is required.`,
  },
  {
    name: "lessThan",
    handler: (attribute, payload, ruleParams) => {
      const value = payload[attribute];
      const max = payload[ruleParams[0]];

      return value <= max;
    },
    message: (attribute, payload, ruleParams) => {
      const max = payload[ruleParams[0]];

      return `${attribute} must be less than ${max}.`;
    },
  },
];

const validate = (validations, payload) => {
  let errors;
  let stop = false;

  for (const validation of validations) {
    if (stop) break; // stop checking if one rule failed because only one error message is displayed

    const { input, rules } = validation;

    for (const rule of rules) {
      const [ruleName, params] = rule.split(":");
      const ruleParams = params ? params.split(",") : [];

      const selectedRule = availableRules.find(
        (rule) => rule.name === ruleName
      );

      if (!selectedRule.handler(input, payload, ruleParams)) {
        let message;

        if (validation.messages && validation.messages.length > 0) {
          const validationMessage = validation.messages.find(
            (validationMessage) => validationMessage.name === selectedRule.name
          );

          if (validationMessage !== undefined && validationMessage.message) {
            message = validationMessage.message;
          }
        }

        if (!message)
          message = selectedRule.message(input, payload, ruleParams);

        errors = message;
        stop = true;
      }
    }
  }

  return errors;
};

module.exports = {
  validate,
};
