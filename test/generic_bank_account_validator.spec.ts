import BankAccountValidator from "../src";

describe("GenericBankAccountValidator", function () {
  var validBankAccountParams;

  beforeEach(function () {
    validBankAccountParams = {
      bankNumber: "719",
      agencyNumber: "15849",
      agencyCheckNumber: "9",
      accountNumber: "0210169",
      accountCheckNumber: "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency", function () {
    it("accepts a agency starts with zero", function () {
      validBankAccountParams.agencyNumber = "0170";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts agency with one number", function () {
      validBankAccountParams.agencyNumber = "8";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts agency with five numbers", function () {
      validBankAccountParams.agencyNumber = "97817";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency with letters", function () {
      validBankAccountParams.agencyNumber = "AAAA";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Agência inválida", code: "INVALID_AGENCY_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency equal zero", function () {
      validBankAccountParams.agencyNumber = "0";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Agência inválida", code: "INVALID_AGENCY_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency with six numbers", function () {
      validBankAccountParams.agencyNumber = "197817";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Agência inválida", code: "INVALID_AGENCY_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe("validate agency check number", function () {
    it("accepts a valid agency check number", function () {
      validBankAccountParams.agencyCheckNumber = "9";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check with letters", function () {
      validBankAccountParams.agencyCheckNumber = "A";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check empty", function () {
      validBankAccountParams.agencyCheckNumber = "";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check equal zero", function () {
      validBankAccountParams.agencyCheckNumber = "0";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check with two digits", function () {
      validBankAccountParams.agencyCheckNumber = "22";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency greater than two digits", function () {
      validBankAccountParams.agencyCheckNumber = "123";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Dígito da agência inválido", code: "INVALID_AGENCY_CHECK_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe("validate account", function () {
    it("accepts a valid account number", function () {
      validBankAccountParams.accountNumber = "123456789012";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts account with one number", function () {
      validBankAccountParams.accountNumber = "8";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account with letters", function () {
      validBankAccountParams.accountNumber = "AAAAA";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Conta corrente inválida", code: "INVALID_ACCOUNT_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account equal zero", function () {
      validBankAccountParams.accountNumber = "0";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Conta corrente inválida", code: "INVALID_ACCOUNT_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than twelve numbers", function () {
      validBankAccountParams.accountNumber = "1234567890123";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Conta corrente inválida", code: "INVALID_ACCOUNT_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe("validate account check number", function () {
    it("accepts a valid account check number", function () {
      validBankAccountParams.accountCheckNumber = "9";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check with letters", function () {
      validBankAccountParams.accountCheckNumber = "A";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check empty", function () {
      validBankAccountParams.accountCheckNumber = "";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check equal zero", function () {
      validBankAccountParams.accountCheckNumber = "0";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check with two digits", function () {
      validBankAccountParams.accountCheckNumber = "22";
      BankAccountValidator.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account greater than two digits", function () {
      validBankAccountParams.accountCheckNumber = "123";
      BankAccountValidator.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: "Dígito da conta corrente inválido", code: "INVALID_ACCOUNT_CHECK_NUMBER" }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });
});
