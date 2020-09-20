import BankAccountValidator from "../src";

describe("BankAccount", function () {
  var validBankAccountParams;
  var invalidBankAccountParams;

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

    invalidBankAccountParams = {
      bankNumber: "001",
      agencyNumber: "1",
      agencyCheckNumber: "",
      accountNumber: "000",
      accountCheckNumber: "",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe(".validate", function () {
    it("accepts a valid bank account", function () {
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept a invalid bank account", function () {
      expect(() => BankAccountValidator.validate(invalidBankAccountParams)).toThrow();
    });

    it("accepts a valid bank number", function () {
      validBankAccountParams.bankNumber = "999";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept a invalid bank number", function () {
      validBankAccountParams.bankNumber = "1";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Banco inválido");
    });
  });
});
