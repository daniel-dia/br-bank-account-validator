import CommonBankAccountValidator from "../CommonBankAccountValidator";

export default class SantanderValidator extends CommonBankAccountValidator {
  public agencyCheckNumberIsValid(agencyCheckNumber: string) {
    return agencyCheckNumber === undefined || agencyCheckNumber === "";
  }

  public accountNumberIsValid(accountNumber: string) {
    return accountNumber.length === this.accountNumberLength() && super.accountNumberIsValid(accountNumber);
  }

  public accountNumberLength() {
    return 8;
  }
}
