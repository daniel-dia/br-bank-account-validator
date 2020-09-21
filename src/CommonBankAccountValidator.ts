import IBankAccount from "./Interfaces/IBankAccount";
import IBankValidator from "./Interfaces/IBankValidator";

export default abstract class CommonBankAccountValidator implements IBankValidator {
  public accountCheckNumberMatch(bankAccount: IBankAccount): boolean {
    return true;
  }

  public agencyCheckNumberMatch(bankAccount: IBankAccount): boolean {
    return true;
  }

  public agencyNumberIsValid(agencyNumber: string): boolean {
    return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
  }

  public agencyCheckNumberIsValid(agencyCheckNumber: string): boolean {
    return /^[a-zA-Z0-9]{0,1}$/.test(agencyCheckNumber);
  }

  public accountNumberIsValid(accountNumber: string): boolean {
    return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
  }

  public accountCheckNumberIsValid(accountCheckNumber: string): boolean {
    return /^[a-zA-Z0-9]{1}$/.test(accountCheckNumber);
  }

  public agencyNumberMsgError(): string {
    return "A agência deve conter " + this.agencyNumberLength() + " números. Complete com zeros a esquerda se necessário.";
  }

  public agencyCheckNumberMsgError(): string {
    const length = this.agencyCheckNumberLength();

    if (!length) {
      return "Não insira dígito da agência";
    } else if (length === 1) {
      return "O dígito da agência deve conter 1 dígito";
    } else {
      return "O dígito da agência deve conter " + length + " números. Complete com zeros a esquerda se necessário.";
    }
  }

  public accountNumberMsgError(): string {
    return "A conta corrente deve conter " + this.accountNumberLength() + " números. Complete com zeros a esquerda se necessário.";
  }

  public agencyNumberLength() {
    return 4;
  }

  public agencyCheckNumberLength() {
    return 0;
  }

  public accountNumberLength() {
    return 0;
  }
}
