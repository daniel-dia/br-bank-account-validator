import CommonBankAccountValidator from "../CommonBankAccountValidator";
import IBankAccount from "../Interfaces/IBankAccount";
import { BradescoCheckNumberCalculator } from "./CheckNumber/BradescoCheckNumberCalculator";

export default class BradescoValidator extends CommonBankAccountValidator {
  public agencyCheckNumberIsValid(agencyCheckNumber: string) {
    return agencyCheckNumber.length === this.agencyCheckNumberLength() && super.agencyCheckNumberIsValid(agencyCheckNumber);
  }

  public accountNumberIsValid(accountNumber: string) {
    return accountNumber.length === this.accountNumberLength() && super.accountNumberIsValid(accountNumber);
  }

  public agencyCheckNumberMatch(bankAccount: IBankAccount) {
    const checkNumberCalculated = BradescoCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
    const checkNumberInformed = bankAccount.agencyCheckNumber.toUpperCase();
    if (checkNumberInformed === "0") {
      return checkNumberCalculated === checkNumberInformed || checkNumberCalculated === "P";
    }
    return checkNumberCalculated === checkNumberInformed;
  }

  public accountCheckNumberMatch(bankAccount: IBankAccount) {
    const checkNumberCalculated = BradescoCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
    const checkNumberInformed = bankAccount.accountCheckNumber.toUpperCase();
    if (checkNumberInformed === "0") {
      return checkNumberCalculated === checkNumberInformed || checkNumberCalculated === "P";
    }
    return checkNumberCalculated === checkNumberInformed;
  }

  public agencyCheckNumberLength() {
    return 1;
  }

  public accountNumberLength() {
    return 7;
  }
}
