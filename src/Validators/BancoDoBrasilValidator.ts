import BancoDoBrasilCheckNumberCalculator from "./CheckNumber/BancoDoBrasilCheckNumberCalculator";
import CommonBankAccountValidator from "../CommonBankAccountValidator";
import IBankAccount from "../Interfaces/IBankAccount";

export default class BancoDoBrasilValidator extends CommonBankAccountValidator {
  public agencyCheckNumberIsValid(agencyCheckNumber: string) {
    return agencyCheckNumber.length == this.agencyCheckNumberLength() && super.agencyCheckNumberIsValid(agencyCheckNumber);
  }

  public accountNumberIsValid(accountNumber: string) {
    return accountNumber.length == this.accountNumberLength() && super.accountNumberIsValid(accountNumber);
  }

  public agencyCheckNumberMatch(bankAccount: IBankAccount) {
    var checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
    return checkNumberCalculated === bankAccount.agencyCheckNumber.toUpperCase();
  }

  public accountCheckNumberMatch(bankAccount: IBankAccount) {
    var checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
    return checkNumberCalculated === bankAccount.accountCheckNumber.toUpperCase();
  }

  public agencyCheckNumberLength() {
    return 1;
  }

  public accountNumberLength() {
    return 8;
  }

  public agencyNumberMsgError() {
    return super.agencyNumberMsgError();
  }
}
