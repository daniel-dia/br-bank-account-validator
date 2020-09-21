import BankAccountValidator from "../src";
describe("BanrisulValidator", function () {
  var bankAccount;

  beforeEach(function () {
    bankAccount = {
      bankNumber: "041",
      agencyNumber: "1234",
      agencyCheckNumber: "",
      accountNumber: "358507671",
      accountCheckNumber: "8",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency number", function () {
    it("does NOT accept invalid agency", function () {
      bankAccount.agencyNumber = "333123";
      bankAccount.accountCheckNumber = "1";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("A agência deve conter 4 números. Complete com zeros a esquerda se necessário. Dígito da conta não corresponde ao número da conta/agência preenchido");
    });
  });

  describe("validate agency check number", function () {
    it("does NOT accept agency check number", function () {
      bankAccount.agencyCheckNumber = "1";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("Não insira dígito da agência");
    });
  });

  describe("validate account number", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(bankAccount)).toBeTruthy();
    });

    it("does NOT accept account less than nine digits", function () {
      bankAccount.accountNumber = "1234";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("A conta corrente deve conter 9 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept account greater than nine digits", function () {
      bankAccount.accountNumber = "1234567890";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("A conta corrente deve conter 9 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept when calc account check number invalid", function () {
      bankAccount.accountCheckNumber = "0";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("Dígito da conta não corresponde ao número da conta/agência preenchido");
    });
  });
});
