import { BankAccountErrorCodes } from "./BankAccountErrorCodes";

export interface BankAccountError {
  code: BankAccountErrorCodes;
  message: string;
}
