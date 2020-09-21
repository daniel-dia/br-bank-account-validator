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
import BankAccountValidatorError from "./BankAccountValidatorException";
import { BankAccountError } from "./BankAccountError";
import { BankAccountErrorCodes as BankAccountErrors } from "./BankAccountErrorCodes";
import CommonBankAccountValidator from "./CommonBankAccountValidator";

export default class BankAccountValidator {
  public static validate(bankAccount: IBankAccount, normalize: boolean = false): IBankAccount {
    const errors: BankAccountError[] = [];
    const validator = this.validator(bankAccount.bankNumber);

    if (normalize) validator.normalize(bankAccount);

    if (!new GenericBankAccountValidator().bankNumberIsValid(bankAccount.bankNumber)) {
      errors.push({ message: "Banco inválido", code: BankAccountErrors.INVALID_BANK_NUMBER });
    }

    if (!validator.agencyNumberIsValid(bankAccount.agencyNumber)) {
      errors.push({ message: validator.agencyNumberMsgError(), code: BankAccountErrors.INVALID_AGENCY_NUMBER });
    }

    if (!validator.agencyCheckNumberIsValid(bankAccount.agencyCheckNumber)) {
      errors.push({ message: validator.agencyCheckNumberMsgError(), code: BankAccountErrors.INVALID_AGENCY_CHECK_NUMBER });
    }

    if (!validator.accountNumberIsValid(bankAccount.accountNumber)) {
      errors.push({ message: validator.accountNumberMsgError(), code: BankAccountErrors.INVALID_ACCOUNT_NUMBER });
    }

    if (!validator.accountCheckNumberIsValid(bankAccount.accountCheckNumber)) {
      errors.push({ message: "Dígito da conta corrente inválido", code: BankAccountErrors.INVALID_ACCOUNT_CHECK_NUMBER });
    }

    if (validator.agencyNumberIsValid(bankAccount.agencyNumber) && validator.agencyCheckNumberIsValid(bankAccount.agencyCheckNumber)) {
      if (!validator.agencyCheckNumberMatch(bankAccount)) {
        errors.push({ message: "Dígito da agência não corresponde ao número da agência preenchido", code: BankAccountErrors.AGENCY_CHECK_NUMBER_DONT_MATCH });
      }
    }

    if (validator.accountNumberIsValid(bankAccount.accountNumber) && validator.accountCheckNumberIsValid(bankAccount.accountCheckNumber)) {
      if (!validator.accountCheckNumberMatch(bankAccount)) {
        errors.push({ message: "Dígito da conta não corresponde ao número da conta/agência preenchido", code: BankAccountErrors.ACCOUNT_CHECK_NUMBER_DONT_MATCH });
      }
    }

    if (errors.length) throw new BankAccountValidatorError(errors);
    return bankAccount;
  }

  private static validator(bankNumber: string): CommonBankAccountValidator {
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
