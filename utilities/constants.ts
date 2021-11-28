export default {
  REQUIRESSN: "REQUIRESSN",
  NOACTION: "NOACTION",
  CALL_ADVOCATES: "CallAdvocates",
  CREDIT_FREEZE: "HasCreditFreeze",
  FRAUD_ALERT: "HasFraudAlert",
  TODAY: new Date(),
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 30,
  MAX_SUFFIX_LENGTH: 10,
  MIN_ANNUAL_INCOME: 4000,
  MAX_ANNUAL_INCOME: 9999999,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_EMAIL_LENGTH: 50,
  PHONE_LENGTH: 14,
  ALABAMA_REGEX: new RegExp(/AL/),
  EMAIL_REGEX: new RegExp(
    /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/
  ),
  PASSWORD_REGEX: new RegExp(
    /^(?=(?:[^A-Za-z]*[A-Za-z]){1})(?=(?:[^0-9!@#$%^&*()_+-=]*[0-9!@#$%^&*()_+-=]){1}).*$/
  ),
  PHONE_REGEX: new RegExp(/^[+]?[(]?[0-9]{3}[)]?[\s.]?[0-9]{3}[-.]?[0-9]{4,6}$/)
};
