import CommonBankAccountValidator from "../CommonBankAccountValidator";
import IBankAccount from "../Interfaces/IBankAccount";
import ItauCheckNumberCalculator from "./CheckNumber/ItauCheckNumberCalculator";

export default class ItauValidator extends CommonBankAccountValidator {
  public agencyCheckNumberIsValid(agencyCheckNumber: string): boolean {
    return agencyCheckNumber === undefined || agencyCheckNumber === "" || agencyCheckNumber === "0";
  }

  public accountNumberIsValid(accountNumber: string): boolean {
    return accountNumber.length === this.accountNumberLength() && super.accountNumberIsValid(accountNumber);
  }

  public accountCheckNumberMatch(bankAccount: IBankAccount) {
    const checkNumberCalculated = ItauCheckNumberCalculator.calculate(bankAccount.agencyNumber, bankAccount.accountNumber);
    return checkNumberCalculated === bankAccount.accountCheckNumber;
  }

  public accountNumberLength(): number {
    return 5;
  }
}
