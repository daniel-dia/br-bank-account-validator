import CommonBankAccountValidator from "../CommonBankAccountValidator";
import IBankAccount from "../Interfaces/IBankAccount";
import BanrisulCheckNumberCalculator from "./CheckNumber/BanrisulCheckNumberCalculator";

export default class BanrisulValidator extends CommonBankAccountValidator {
  public agencyCheckNumberIsValid(agencyCheckNumber: string) {
    return agencyCheckNumber === undefined || agencyCheckNumber === "";
  }

  public accountNumberIsValid(accountNumber: string) {
    return accountNumber.length == this.accountNumberLength() && super.accountNumberIsValid(accountNumber);
  }

  public accountCheckNumberMatch(bankAccount: IBankAccount) {
    var checkNumberCalculated = BanrisulCheckNumberCalculator.calculate(bankAccount.accountNumber);
    return checkNumberCalculated === bankAccount.accountCheckNumber;
  }

  public accountNumberLength() {
    return 9;
  }
}
