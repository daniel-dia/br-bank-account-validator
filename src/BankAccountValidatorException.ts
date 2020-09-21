import { BankAccountError } from "./BankAccountError";

export default class BankAccountValidatorError extends Error {
  public code: string;

  constructor(private readonly errors: BankAccountError[]) {
    super(errors.map((e) => e.message).join(" "));
    this.code = errors.map((e) => e.code).join(",");
  }

  public toString(): string {
    return this.code + this.message;
  }
}
