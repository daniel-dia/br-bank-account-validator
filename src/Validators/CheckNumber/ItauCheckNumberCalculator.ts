export default class ItauCheckNumberCalculator {
  public static calculate(agencyNumber: string, accountNumber: string) {
    var numbers = (agencyNumber + accountNumber).split("");
    var sumSeq = 0;
    var sequence = 0;
    for (var i = 0; i < numbers.length; i++) {
      var number = parseInt(numbers[i]);
      sequence = this.multiplyAccordingParity(number, i);
      sequence = this.adjustAccordingLength(sequence);
      sumSeq += sequence;
    }
    return this.module(sumSeq);
  }

  private static multiplyAccordingParity(number: number, index: number) {
    return number * (index % 2 === 0 ? 2 : 1);
  }

  private static adjustAccordingLength(sequence: number) {
    if (sequence > 9) {
      var numbers = sequence.toString().split("");
      sequence = 0;
      for (var i = 0; i < numbers.length; i++) sequence += parseInt(numbers[i]);
    }
    return sequence;
  }

  private static module(sumSeq: number) {
    var module = sumSeq % 10;
    if (module === 0) return "0";
    else return (10 - module).toString();
  }
}
