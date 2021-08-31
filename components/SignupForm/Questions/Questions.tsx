/* eslint-disable no-console */

// Vendor
// import { object, shape, number, integer, string } from 'yup';
import { ref, addMethod, mixed, test, object, string, bool, date } from "yup";

// Local
import Static from "../../../utilities/staticData";
import constants from "../../../utilities/constants";
import Alert from "../../Alerts";
import { GetPreQualified } from "./GetPreQualified";
import { PersonalInfo } from "./PersonalInfo";
import { DateOfBirth } from "./DateOfBirth";
import { HomeAddress } from "./HomeAddress";
import { YearlyIncome } from "./YearlyIncome";
import { Account } from "./Account";

import { toShortDateZeroFill } from "../../../utilities/DateHelpers";

// const SignupSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   address: Yup.object().shape({
//     line1: Yup.string().required("Required")
//   }),
//   dob: Yup.object().shape({
//     day: Yup.number()
//       .positive()
//       .integer()
//       .min(1, "Invalid.")
//       .max(31, "Invalid.")
//   })
// });

const today = new Date();

const equalTo = (reference, msg) => {
  return mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || `Password must be the same as ${reference}`,
    params: {
      reference: reference.path
    },
    test(value) {
      return value === this.resolve(reference);
    }
  });
};

addMethod(string, "equalTo", equalTo);

export const Questions = [
  {
    id: "get-prequalified",
    component: GetPreQualified,
    actionLabel: "Get Pre-Qualified"
  },
  {
    id: "personal-info",
    component: PersonalInfo,
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: ""
    },
    validationSchema: object().shape({
      firstName: string().required(Static.errors.isRequired),
      middleName: string(),
      lastName: string().required(Static.errors.isRequired),
      suffix: string()
    }),
    actionLabel: "Next",
    onAction: () => {
      // window.scrollTo(0,0);
      console.log("action taken");
    }
  },
  {
    id: "date-of-birth",
    component: DateOfBirth,
    initialValues: {
      dateOfBirth: ""
    },
    validationSchema: object().shape({
      dateOfBirth: date()
        .transform((currentValue, originalValue) =>
          toShortDateZeroFill(currentValue) === originalValue ||
          toShortDateZeroFill(currentValue) === toShortDateZeroFill(originalValue)
            ? currentValue
            : new Date("")
        )
        .required(Static.errors.isRequired)
        .typeError("Invalid date")
        .min(new Date("1/1/1900"), Static.errors.minDateOfBirth)
        .max(
          new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()),
          Static.errors.maxDateOfBirth
        )
      // .when('state', {
      //   is: 'AL',
      //   then: date()
      //     .transform((currentValue, originalValue) =>
      //       toShortDateZeroFill(currentValue) === originalValue ||
      //       toShortDateZeroFill(currentValue) ===
      //         toShortDateZeroFill(originalValue)
      //         ? currentValue
      //         : new Date('')
      //     )
      //     .required(Static.errors.isRequired)
      //     .typeError('Invalid date')
      //     .min(new Date('1/1/1900'), Static.errors.minDateOfBirth)
      //     .max(
      //       new Date(
      //         today.getFullYear() - 19,
      //         today.getMonth(),
      //         today.getDate()
      //       ),
      //       'You must be 19 to purchase in Alabama'
      //     )
      // })
    }),
    actionLabel: "Next",
    onAction: (sectionValues) => {
      window.scrollTo(0, 0);
      // if (sectionValues.dateOfBirth === '1 infinite loop') {
      //   throw new Error('You old enough?')
      // }
    }
  },
  {
    id: "home-address",
    component: HomeAddress,
    initialValues: {
      homeAddress: "",
      unitNumber: ""
    },
    validationSchema: object().shape({
      homeAddress: string().required(Static.errors.isRequired),
      unitNumber: string()
    }),
    actionLabel: "Next",
    onAction: (sectionValues) => {
      window.scrollTo(0, 0);
      // console.log('ADDRESS ACTION VALS: ', sectionValues);
      if (sectionValues.homeAddress === "1 infinite loop") {
        throw new Error("Please reformat address");
      }
    }
  },
  {
    id: "yearly-income",
    component: YearlyIncome,
    initialValues: {
      yearlyIncome: ""
    },
    validationSchema: object().shape({
      yearlyIncome: string().required(Static.errors.isRequired)
    }),
    // validationSchema: object().shape({
    //   // eslint-disable-next-line no-restricted-globals
    //   yearlyIncome: number().transform(value => (isNaN(value) ? parseInt(value, 10) : value))
    //     .required(Static.errors.isRequired)
    //     .min(constants.MIN_ANNUAL_INCOME, Static.errors.annualIncomeMin
    //     )
    //     .max(constants.MAX_ANNUAL_INCOME, Static.errors.annualIncomeMax),
    // }),
    actionLabel: "Next",
    onAction: (sectionValues) => {
      window.scrollTo(0, 0);
      const incomeNumber = parseFloat(sectionValues.yearlyIncome.replace(/\$|,/g, ""));
      // console.log("THE MONEY: ", incomeNumber);
      if (incomeNumber < 4000) {
        Alert.fire({
          icon: "info",
          title: "Hold on!",
          text: Static.errors.annualIncomeMin,
          confirmButtonText: "I understand"
        });
        throw new Error(Static.errors.annualIncomeMin);
      } else if (incomeNumber > 9999999) {
        Alert.fire({
          icon: "info",
          title: "Hold on!",
          text: Static.errors.annualIncomeMax,
          confirmButtonText: "I understand"
        });
        throw new Error(Static.errors.annualIncomeMax);
      }
    }
  },
  {
    id: "account-details",
    component: Account,
    initialValues: {
      phoneNumber: "",
      email: "",
      password: "",
      passwordConfirm: "",
      acceptSignatureTerms: false,
      acceptPrivacyTerms: false,
      acceptReportingTerms: false,
      acceptAuthorizeTerms: false
    },
    validationSchema: object().shape({
      phoneNumber: string()
        .required(Static.errors.isRequired)
        .min(constants.PHONE_LENGTH, Static.errors.phoneNumberValid)
        .max(constants.PHONE_LENGTH, Static.errors.phoneNumberValid)
        .matches(constants.PHONE_REGEX, Static.errors.phoneNumberValid),
      email: string().required(Static.errors.isRequired),
      password: string()
        .required(Static.errors.isRequired)
        .matches(constants.PASSWORD_REGEX, Static.errors.passwordValid),
      passwordConfirm: string()
        .required(Static.errors.isRequired)
        .equalTo(ref("password"), Static.errors.passwordMatch),
      acceptSignatureTerms: bool().oneOf([true], "Accept Terms & Conditions is required"),
      acceptPrivacyTerms: bool().oneOf([true], "Accept Terms & Conditions is required"),
      acceptReportingTerms: bool().oneOf([true], "Accept Terms & Conditions is required"),
      acceptAuthorizeTerms: bool().oneOf([true], "Accept Terms & Conditions is required")
    }),
    actionLabel: "Get Terms",
    onAction: (sectionValues) => {
      window.scrollTo(0, 0);
      const phone = parseFloat(sectionValues.phoneNumber.replace(/\$|,/g, ""));
      console.log("PHONE: ", phone);
      if (phone < 15000) {
        throw new Error("Something is wrong with your account details.");
      }
    }
  }
];
