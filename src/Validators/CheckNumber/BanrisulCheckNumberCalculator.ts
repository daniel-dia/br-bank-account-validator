export default class BanrisulCheckNumberCalculator {
  public static calculate(accountNumber: string) {
    const numbers = accountNumber.split("");
    let sumSeq = 0;

    for (let i = 0; i < numbers.length; i++) {
      const n = parseInt(numbers[i]);
      sumSeq += this.multiplyAccordingWeight(n, i);
    }

    return this.moduleEleven(sumSeq).toString();
  }

  private static multiplyAccordingWeight(n: number, index: number) {
    const weight = [3, 2, 4, 7, 6, 5, 4, 3, 2];
    return n * weight[index];
  }

  private static moduleEleven(sumSeq: number) {
    const module = sumSeq % 11;
    if (module === 0) {
      return 0;
    } else if (module === 1) {
      return 6;
    }
    return 11 - module;
  }
}
