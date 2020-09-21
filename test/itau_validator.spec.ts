import BankAccountValidator from "../src";

describe("ItauValidator", function () {
  var bankAccount;

  beforeEach(function () {
    bankAccount = {
      bankNumber: "341",
      agencyNumber: "2545",
      agencyCheckNumber: "",
      accountNumber: "02366",
      accountCheckNumber: "1",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency number", function () {
    it("does NOT accept invalid agency", function () {
      bankAccount.agencyNumber = "333123";
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

    it("does NOT accept account less than five digits", function () {
      bankAccount.accountNumber = "1234";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept account greater than five digits", function () {
      bankAccount.accountNumber = "123456";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept when calc account check number invalid", function () {
      bankAccount.accountCheckNumber = "0";
      expect(() => BankAccountValidator.validate(bankAccount)).toThrowError("Dígito da conta não corresponde ao número da conta/agência preenchido");
    });
  });
});
