import BankAccountValidator from "../src";
describe("CitibankValidator", function () {
  var validBankAccountParams;

  beforeEach(function () {
    validBankAccountParams = {
      bankNumber: "745",
      agencyNumber: "1584",
      agencyCheckNumber: "",
      accountNumber: "1234567",
      accountCheckNumber: "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency number", function () {
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

  describe("validate account number", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept account less than eight digits", function () {
      validBankAccountParams.accountNumber = "123456";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.");
    });

    it("does NOT accept account greater than eight digits", function () {
      validBankAccountParams.accountNumber = "12345678";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.");
    });
  });
});
