import BankAccountValidator from "../src";
describe("BradescoValidator", function () {
  var validBankAccountParams;

  beforeEach(function () {
    validBankAccountParams = {
      bankNumber: "237",
      agencyNumber: "1584",
      agencyCheckNumber: "9",
      accountNumber: "0210169",
      accountCheckNumber: "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency check number", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid bank account when agency digit equals zero", function () {
      validBankAccountParams.agencyNumber = "8221";
      validBankAccountParams.agencyCheckNumber = "0";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid bank account when agency digit equals zero 2", function () {
      validBankAccountParams.agencyNumber = "0255";
      validBankAccountParams.agencyCheckNumber = "0";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    // it("does NOT accept agency check empty", function () {
    //   validBankAccountParams.agencyCheckNumber = "";
    //   expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("O dígito da agência deve conter 1 dígito");
    // }); THIS RULE IS NO LONGER ACCEPTED

    it("does NOT accept agency check greater than one digits", function () {
      validBankAccountParams.agencyCheckNumber = "12";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("O dígito da agência deve conter 1 dígito");
    });

    it("does NOT accept when calc agency check number invalid", function () {
      validBankAccountParams.agencyCheckNumber = "3";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Dígito da agência não corresponde ao número da agência preenchido");
    });
  });

  describe("validate account check number", function () {
    it("does NOT accept when calc account check number invalid", function () {
      validBankAccountParams.accountCheckNumber = "8";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Dígito da conta não corresponde ao número da conta/agência preenchido");
    });

    it("accepts a valid account when digit equals zero", function () {
      validBankAccountParams.accountNumber = "0500778";
      validBankAccountParams.accountCheckNumber = "0";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });
  });

  describe("validate agency number", function () {
    it("does NOT accept invalid agency", function () {
      validBankAccountParams.agencyNumber = "123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A agência deve conter 4 números. Complete com zeros a esquerda se necessário.");
    });
  });

  describe("validate account number", function () {
    it("does NOT accept invalid account", function () {
      validBankAccountParams.accountNumber = "123456";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.");
    });
  });
});
