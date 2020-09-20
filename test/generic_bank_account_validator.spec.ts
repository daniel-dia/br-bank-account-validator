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
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts agency with one number", function () {
      validBankAccountParams.agencyNumber = "8";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts agency with five numbers", function () {
      validBankAccountParams.agencyNumber = "97817";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept agency with letters", function () {
      validBankAccountParams.agencyNumber = "AAAA";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Agência inválida");
    });

    it("does NOT accept agency equal zero", function () {
      validBankAccountParams.agencyNumber = "0";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Agência inválida");
    });

    it("does NOT accept agency with six numbers", function () {
      validBankAccountParams.agencyNumber = "197817";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Agência inválida");
    });
  });

  describe("validate agency check number", function () {
    it("accepts a valid agency check number", function () {
      validBankAccountParams.agencyCheckNumber = "9";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid agency check with letters", function () {
      validBankAccountParams.agencyCheckNumber = "A";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid agency check empty", function () {
      validBankAccountParams.agencyCheckNumber = "";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid agency check equal zero", function () {
      validBankAccountParams.agencyCheckNumber = "0";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid agency check with two digits", function () {
      validBankAccountParams.agencyCheckNumber = "22";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept agency greater than two digits", function () {
      validBankAccountParams.agencyCheckNumber = "123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Dígito da agência inválido");
    });
  });

  describe("validate account", function () {
    it("accepts a valid account number", function () {
      validBankAccountParams.accountNumber = "123456789012";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts account with one number", function () {
      validBankAccountParams.accountNumber = "8";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept account with letters", function () {
      validBankAccountParams.accountNumber = "AAAAA";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Conta corrente inválida");
    });

    it("does NOT accept account equal zero", function () {
      validBankAccountParams.accountNumber = "0";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Conta corrente inválida");
    });

    it("does NOT accept account greater than twelve numbers", function () {
      validBankAccountParams.accountNumber = "1234567890123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Conta corrente inválida");
    });
  });

  describe("validate account check number", function () {
    it("accepts a valid account check number", function () {
      validBankAccountParams.accountCheckNumber = "9";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid account check with letters", function () {
      validBankAccountParams.accountCheckNumber = "A";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid account check empty", function () {
      validBankAccountParams.accountCheckNumber = "";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid account check equal zero", function () {
      validBankAccountParams.accountCheckNumber = "0";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("accepts a valid account check with two digits", function () {
      validBankAccountParams.accountCheckNumber = "22";
      expect(BankAccountValidator.validate(validBankAccountParams)).toBeTruthy();
    });

    it("does NOT accept account greater than two digits", function () {
      validBankAccountParams.accountCheckNumber = "123";
      expect(() => BankAccountValidator.validate(validBankAccountParams)).toThrowError("Dígito da conta corrente inválido");
    });
  });
});
