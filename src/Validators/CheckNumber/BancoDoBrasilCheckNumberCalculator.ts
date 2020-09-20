export default class BancoDoBrasilCheckNumberCalculator {
  // Account validation
  public static calculateAccount(accountNumber: string) {
    const numbers = accountNumber.split("");
    let sumSeq = 0;
    const sequence = 0;
    for (let i = 0; i < numbers.length; i++) {
      const seq = 9 - i;
      sumSeq += parseInt(numbers[i]) * seq;
    }
    return this.module(sumSeq);
  }

  // Agency validation
  public static calculateAgency(agencyNumber: string) {
    const numbers = agencyNumber.split("");
    let sumSeq = 0;
    const sequence = 0;
    for (let i = 0; i < numbers.length; i++) {
      const seq = 5 - i;
      sumSeq += parseInt(numbers[i]) * seq;
    }
    return this.module(sumSeq);
  }

  private static module(sumSeq: number) {
    const result = 11 - (sumSeq % 11);
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
