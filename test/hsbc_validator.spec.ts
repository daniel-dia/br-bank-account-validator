import BankAccountValidator from "../src";
describe("HSBCValidator", function () {
  var validBankAccountParams;
  var validBankAccount;

  beforeEach(function () {
    validBankAccountParams = {
      bankNumber: "399",
      agencyNumber: "1584",
      agencyCheckNumber: "",
      accountNumber: "678901",
      accountCheckNumber: "",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency number 1", function () {
    it("does NOT accept invalid agency", function () {
      validBankAccountParams.agencyNumber = "123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A agência deve conter 4 números. Complete com zeros a esquerda se necessário.");
    });
  });

  describe("validate agency check number", function () {
    it("does NOT accept agency check number", function () {
      validBankAccountParams.agencyCheckNumber = "1";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Não insira dígito da agência");
    });
  });

  describe("validate account check number", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept account less than eleven digits", function () {
      validBankAccountParams.accountNumber = "67890";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 6 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept account greater than eleven digits", function () {
      validBankAccountParams.accountNumber = "6789012";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 6 números. Complete com zeros a esquerda se necessário.");
    });
  });

  describe("validate agency number", function () {
    it("does NOT accept invalid agency", function () {
      validBankAccountParams.agencyNumber = "123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A agência deve conter 4 números. Complete com zeros a esquerda se necessário.");
    });
  });
});
