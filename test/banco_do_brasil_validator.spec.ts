import BankAccountValidator from "../src";

describe("BancoDoBrasilValidator", function () {
  var validBankAccountParams;

  beforeEach(function () {
    validBankAccountParams = {
      bankNumber: "001",
      agencyNumber: "1584",
      agencyCheckNumber: "9",
      accountNumber: "00210169",
      accountCheckNumber: "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency check number", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept agency check empty", function () {
      validBankAccountParams.agencyCheckNumber = "";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("O dígito da agência deve conter 1 dígito");
    });

    it("does NOT accept agency check greater than one digits", function () {
      validBankAccountParams.agencyCheckNumber = "12";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrow("O dígito da agência deve conter 1 dígito");
    });

    it("does NOT accept when calc agency check number invalid", function () {
      validBankAccountParams.agencyCheckNumber = "3";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrow("Dígito da agência não corresponde ao número da agência preenchido");
    });

    it("does NOT accept when calc account check number invalid", function () {
      validBankAccountParams.accountCheckNumber = "8";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrow("Dígito da conta não corresponde ao número da conta/agência preenchido");
    });
  });

  describe("validate agency number", function () {
    it("does NOT accept invalid agency", function () {
      validBankAccountParams.agencyNumber = "123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrow("A agência deve conter 4 números. Complete com zeros a esquerda se necessário.");
    });
  });
});
