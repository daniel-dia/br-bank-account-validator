import BanrisulCheckNumberCalculator from "../src/Validators/CheckNumber/BanrisulCheckNumberCalculator";

describe("BanrisulCheckNumberCalculator", function () {
  var bankAccount;
  var bankAccountModuleOne;
  var bankAccountModuleZero;

  beforeEach(function () {
    bankAccount = {
      accountNumber: "358507671",
      accountCheckNumber: "8",
    };

    bankAccountModuleOne = {
      accountNumber: "358507670",
      accountCheckNumber: "6",
    };

    bankAccountModuleZero = {
      accountNumber: "358507675",
      accountCheckNumber: "0",
    };
  });

  describe("validate Banrisul account number", function () {
    it("should correctly calculate the check number", function () {
      let checkNumberCalculated = BanrisulCheckNumberCalculator.calculate(bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number with module one", function () {
      let checkNumberCalculated = BanrisulCheckNumberCalculator.calculate(bankAccountModuleOne.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOne.accountCheckNumber);
    });

    it("should correctly calculate the check number with module zero", function () {
      let checkNumberCalculated = BanrisulCheckNumberCalculator.calculate(bankAccountModuleZero.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleZero.accountCheckNumber);
    });
  });
});
