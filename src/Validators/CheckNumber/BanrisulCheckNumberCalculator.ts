export default class BanrisulCheckNumberCalculator {
  public static calculate(accountNumber: string) {
    var numbers = accountNumber.split("");
    var sumSeq = 0;

    for (var i = 0; i < numbers.length; i++) {
      var number = parseInt(numbers[i]);
      sumSeq += this.multiplyAccordingWeight(number, i);
    }

    return this.moduleEleven(sumSeq).toString();
  }

  private static multiplyAccordingWeight(number: number, index: number) {
    var weight = [3, 2, 4, 7, 6, 5, 4, 3, 2];
    return number * weight[index];
  }

  private static moduleEleven(sumSeq: number) {
    var module = sumSeq % 11;
    if (module === 0) {
      return 0;
    } else if (module == 1) {
      return 6;
    }
    return 11 - module;
  }
}
