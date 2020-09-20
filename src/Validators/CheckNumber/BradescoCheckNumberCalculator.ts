export class BradescoCheckNumberCalculator {
  // Account validation
  public static calculateAccount(accountNumber: string) {
    const numbers = accountNumber.split("");
    let sumSeq = 0;
    const sequence = 0;
    for (let i = 0; i < numbers.length; i++) {
      const n = parseInt(numbers[i]);
      sumSeq += this.multiplyAccordingWeight(n, i);
    }
    return this.accountModule(sumSeq);
  }

  private static multiplyAccordingWeight(n: number, i: number) {
    const weight = [2, 7, 6, 5, 4, 3, 2];
    return n * weight[i];
  }

  private static accountModule(sumSeq: number) {
    const module = sumSeq % 11;
    if (module === 0) {
      return "0";
    } else {
      if (module === 1) {
        return "P";
      } else {
        return (11 - module).toString();
      }
    }
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
    return this.agencyModule(sumSeq);
  }

  private static agencyModule(sumSeq: number) {
    const result = 11 - (sumSeq % 11);
    if (result === 10) {
      return "P";
    } else {
      if (result === 11) {
        return "0";
      } else {
        return result.toString();
      }
    }
  }
}
