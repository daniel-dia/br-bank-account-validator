import BancoDoBrasilValidator from "../src/Validators/BancoDoBrasilValidator";
import BancoDoBrasilCheckNumberCalculator from "../src/Validators/CheckNumber/BancoDoBrasilCheckNumberCalculator";

describe("BancoDoBrasilCheckNumberCalculator", function () {
  var bankAccount;
  var agencyResultTen;
  var agencyResultEleven;
  var accountResultTen;
  var accountResultEleven;

  beforeEach(function () {
    bankAccount = {
      agencyNumber: "1584",
      agencyCheckNumber: "9",
      accountNumber: "00210169",
      accountCheckNumber: "6",
    };

    agencyResultTen = {
      agencyNumber: "1852",
      agencyCheckNumber: "X",
    };

    agencyResultEleven = {
      agencyNumber: "3494",
      agencyCheckNumber: "0",
    };

    accountResultTen = {
      accountNumber: "10089934",
      accountCheckNumber: "X",
    };

    accountResultEleven = {
      accountNumber: "10089939",
      accountCheckNumber: "0",
    };
  });

  describe("validate BancoDoBrasil agency number", function () {
    it("should correctly calculate the check number", function () {
      let checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.agencyCheckNumber);
    });

    it("should correctly calculate the check number when module equal ten", function () {
      let checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAgency(agencyResultTen.agencyNumber);
      expect(checkNumberCalculated).toEqual(agencyResultTen.agencyCheckNumber);
    });

    it("should correctly calculate the check number when module equal ten and lowercase", function () {
      agencyResultTen.agencyCheckNumber = "x";
      expect(new BancoDoBrasilValidator().agencyCheckNumberMatch(agencyResultTen)).toBeTruthy();
    });

    it("should correctly calculate the check number when module equal eleven", function () {
      let checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAgency(agencyResultEleven.agencyNumber);
      expect(checkNumberCalculated).toEqual(agencyResultEleven.agencyCheckNumber);
    });
  });

  describe("validate BancoDoBrasil account number", function () {
    it("should correctly calculate the check number", function () {
      let checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number when result equal ten", function () {
      let checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAccount(accountResultTen.accountNumber);
      expect(checkNumberCalculated).toEqual(accountResultTen.accountCheckNumber);
    });

    it("should correctly calculate the check number when result equal ten and lowercase", function () {
      accountResultTen.accountNumber = "x";
      expect(BancoDoBrasilCheckNumberCalculator.calculateAccount(accountResultTen.accountNumber)).toBeTruthy();
    });

    it("should correctly calculate the check number when result equal eleven", function () {
      let checkNumberCalculated = BancoDoBrasilCheckNumberCalculator.calculateAccount(accountResultEleven.accountNumber);
      expect(checkNumberCalculated).toEqual(accountResultEleven.accountCheckNumber);
    });
  });
});
