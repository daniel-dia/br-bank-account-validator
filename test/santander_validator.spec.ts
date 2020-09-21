import BankAccountValidator from "../src";

describe("SantanderValidator", function () {
  var validBankAccountParams;

  beforeEach(function () {
    validBankAccountParams = {
      bankNumber: "033",
      agencyNumber: "1584",
      agencyCheckNumber: "",
      accountNumber: "01789012",
      accountCheckNumber: "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency check number", function () {
    it("does NOT accept agency check number", function () {
      validBankAccountParams.agencyCheckNumber = "1";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Não insira dígito da agência");
    });
  });

  describe("validate account number", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept account less than twelve digits", function () {
      validBankAccountParams.accountNumber = "5678901";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept account greater than twelve digits", function () {
      validBankAccountParams.accountNumber = "067890123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.");
    });
  });
});
