import IBankAccount from "./IBankAccount";

export default interface IBankValidator {
  accountNumberMsgError(): string;
  agencyCheckNumberMsgError(): string;
  agencyNumberMsgError(): string;

  accountCheckNumberIsValid(accountCheckNumber: string): boolean;
  accountNumberIsValid(accountNumber: string): boolean;
  agencyCheckNumberIsValid(agencyCheckNumber: string): boolean;
  agencyNumberIsValid(agencyNumber: string): boolean;

  accountCheckNumberMatch(bankAccount: IBankAccount): boolean;
  agencyCheckNumberMatch(bankAccount: IBankAccount): boolean;
}
