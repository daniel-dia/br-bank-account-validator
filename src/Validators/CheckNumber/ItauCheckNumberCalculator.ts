export default class ItauCheckNumberCalculator {
  public static calculate(agencyNumber: string, accountNumber: string) {
    const numbers = (agencyNumber + accountNumber).split("");
    let sumSeq = 0;
    let sequence = 0;
    for (let i = 0; i < numbers.length; i++) {
      const n = parseInt(numbers[i]);
      sequence = this.multiplyAccordingParity(n, i);
      sequence = this.adjustAccordingLength(sequence);
      sumSeq += sequence;
    }
    return this.module(sumSeq);
  }

  private static multiplyAccordingParity(n: number, index: number) {
    return n * (index % 2 === 0 ? 2 : 1);
  }

  private static adjustAccordingLength(sequence: number) {
    if (sequence > 9) {
      const numbers = sequence.toString().split("");
      sequence = 0;
      for (const n of numbers) sequence += parseInt(n);
    }
    return sequence;
  }

  private static module(sumSeq: number) {
    const module = sumSeq % 10;
    if (module === 0) return "0";
    else return (10 - module).toString();
  }
}
