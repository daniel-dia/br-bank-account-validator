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
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency check empty", function () {
      validBankAccountParams.agencyCheckNumber = "";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "O dígito da agência deve conter 1 dígito", code: "INVALID_AGENCY_CHECK_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency check greater than one digits", function () {
      validBankAccountParams.agencyCheckNumber = "12";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "O dígito da agência deve conter 1 dígito", code: "INVALID_AGENCY_CHECK_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc agency check number invalid", function () {
      validBankAccountParams.agencyCheckNumber = "3";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Dígito da agência não corresponde ao número da agência preenchido", code: "AGENCY_CHECK_NUMBER_DONT_MATCH" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc account check number invalid", function () {
      validBankAccountParams.accountCheckNumber = "8";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Dígito da conta não corresponde ao número da conta/agência preenchido", code: "ACCOUNT_CHECK_NUMBER_DONT_MATCH" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe("validate agency number", function () {
    it("does NOT accept invalid agency", function () {
      validBankAccountParams.agencyNumber = "123";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = {
        errors: [
          {
            description: "A agência deve conter 4 números. Complete com zeros a esquerda se necessário.",
            code: "INVALID_AGENCY_NUMBER",
          },
        ],
      };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });
});
