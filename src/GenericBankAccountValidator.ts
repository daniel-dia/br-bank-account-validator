import CommonBankAccountValidator from "./CommonBankAccountValidator";

export default class GenericBankAccountValidator extends CommonBankAccountValidator {
  public bankNumberIsValid(bankNumber: string): boolean {
    return /^([0-9A-Za-x]{3,5})$/.test(bankNumber);
  }

  public agencyNumberIsValid(agencyNumber: string): boolean {
    return /^[0-9]{1,5}$/.test(agencyNumber) && parseInt(agencyNumber) > 0;
  }

  public agencyCheckNumberIsValid(agencyCheckNumber: string): boolean {
    if (!agencyCheckNumber) agencyCheckNumber = "";
    return /^[a-zA-Z0-9]{0,2}$/.test(agencyCheckNumber);
  }

  public accountNumberIsValid(accountNumber: string): boolean {
    return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
  }

  public accountCheckNumberIsValid(accountCheckNumber: string): boolean {
    if (!accountCheckNumber) accountCheckNumber = "";
    return /^[a-zA-Z0-9]{0,2}$/.test(accountCheckNumber);
  }

  public agencyNumberMsgError(length?: number): string {
    return "Agência inválida";
  }

  public agencyCheckNumberMsgError(length?: number): string {
    return "Dígito da agência inválido";
  }

  public accountNumberMsgError(length?: number): string {
    return "Conta corrente inválida";
  }
}
