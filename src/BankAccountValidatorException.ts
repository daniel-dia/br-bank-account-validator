import { BankAccountError } from "./BankAccountError";

export default class BankAccountValidatorException {
  public readonly code: string;
  private readonly message: string;

  constructor(private readonly errors: BankAccountError[]) {
    this.code = errors.map((e) => e.code).join(",");
    this.message = errors.map((e) => e.description).join(" ");
  }

  public toString(): string {
    return this.code + this.message;
  }
}
