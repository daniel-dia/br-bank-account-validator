import CommonBankAccountValidator from "../CommonBankAccountValidator";

export default class HSBCValidator extends CommonBankAccountValidator {
  public agencyCheckNumberIsValid(agencyCheckNumber: string): boolean {
    return agencyCheckNumber === undefined || agencyCheckNumber === "";
  }

  public accountNumberIsValid(accountNumber: string): boolean {
    return accountNumber.length === this.accountNumberLength() && super.accountNumberIsValid(accountNumber);
  }

  public accountCheckNumberIsValid(accountCheckNumber: string): boolean {
    return true;
  }

  public accountNumberLength() {
    return 6;
  }
}
