export default class BancoDoBrasilCheckNumberCalculator {
  // Account validation
  public static calculateAccount(accountNumber: string) {
    var numbers = accountNumber.split("");
    var sumSeq = 0;
    var sequence = 0;
    for (var i = 0; i < numbers.length; i++) {
      let seq = 9 - i;
      sumSeq += parseInt(numbers[i]) * seq;
    }
    return this.module(sumSeq);
  }

  // Agency validation
  public static calculateAgency(agencyNumber: string) {
    var numbers = agencyNumber.split("");
    var sumSeq = 0;
    var sequence = 0;
    for (var i = 0; i < numbers.length; i++) {
      let seq = 5 - i;
      sumSeq += parseInt(numbers[i]) * seq;
    }
    return this.module(sumSeq);
  }

  private static module(sumSeq: number) {
    var result = 11 - (sumSeq % 11);
    if (result === 10) {
      return "X";
    } else {
      if (result === 11) {
        return "0";
      } else {
        return result.toString();
      }
    }
  }
}
