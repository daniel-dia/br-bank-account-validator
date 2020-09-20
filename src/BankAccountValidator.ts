import BancoDoBrasilValidator from "./Validators/BancoDoBrasilValidator";
import BanrisulValidator from "./Validators/BanrisulValidator";
import BradescoValidator from "./Validators/BradescoValidator";
import CitibankValidator from "./Validators/CitibankValidator";
import GenericBankAccountValidator from "./GenericBankAccountValidator";
import HSBCValidator from "./Validators/HSBCValidator";
import ItauValidator from "./Validators/ItauValidator";
import SantanderValidator from "./Validators/SantanderValidator";
import IBankValidator from "./Interfaces/IBankValidator";
import IBankAccount from "./Interfaces/IBankAccount";

export default class BankAccountValidator {
  public static validate(params: IBankAccount) {
    var errors = [];
    var validator = this.validator(params.bankNumber);

    if (!new GenericBankAccountValidator().bankNumberIsValid(params.bankNumber)) {
      errors.push({ description: "Banco inválido", code: "INVALID_BANK_NUMBER" });
    }

    if (!validator.agencyNumberIsValid(params.agencyNumber)) {
      errors.push({ description: validator.agencyNumberMsgError(), code: "INVALID_AGENCY_NUMBER" });
    }

    if (!validator.agencyCheckNumberIsValid(params.agencyCheckNumber)) {
      errors.push({ description: validator.agencyCheckNumberMsgError(), code: "INVALID_AGENCY_CHECK_NUMBER" });
    }

    if (!validator.accountNumberIsValid(params.accountNumber)) {
      errors.push({ description: validator.accountNumberMsgError(), code: "INVALID_ACCOUNT_NUMBER" });
    }

    if (!validator.accountCheckNumberIsValid(params.accountCheckNumber)) {
      errors.push({ description: "Dígito da conta corrente inválido", code: "INVALID_ACCOUNT_CHECK_NUMBER" });
    }

    if (validator.agencyNumberIsValid(params.agencyNumber) && validator.agencyCheckNumberIsValid(params.agencyCheckNumber)) {
      if (!validator.agencyCheckNumberMatch(params)) {
        errors.push({ description: "Dígito da agência não corresponde ao número da agência preenchido", code: "AGENCY_CHECK_NUMBER_DONT_MATCH" });
      }
    }

    if (validator.accountNumberIsValid(params.accountNumber) && validator.accountCheckNumberIsValid(params.accountCheckNumber)) {
      if (!validator.accountCheckNumberMatch(params)) {
        errors.push({ description: "Dígito da conta não corresponde ao número da conta/agência preenchido", code: "ACCOUNT_CHECK_NUMBER_DONT_MATCH" });
      }
    }

    if (errors.length === 0) {
      params.valid();
    } else {
      params.invalid({ errors: errors });
    }
  }

  private static validator(bankNumber: string): IBankValidator {
    switch (bankNumber) {
      case "001":
        return new BancoDoBrasilValidator();
      case "237":
        return new BradescoValidator();
      case "341":
        return new ItauValidator();
      case "033":
        return new SantanderValidator();
      case "745":
        return new CitibankValidator();
      case "399":
        return new HSBCValidator();
      case "041":
        return new BanrisulValidator();
      default:
        return new GenericBankAccountValidator();
    }
  }
}
