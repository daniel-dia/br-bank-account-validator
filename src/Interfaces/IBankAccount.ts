export default interface IBankAccount {
  invalid: (arg0: { errors: { description: string; code: string }[] }) => void;
  valid: () => void;
  bankNumber: string;
  agencyNumber: string;
  accountNumber: string;
  accountCheckNumber: string;
  agencyCheckNumber: string;
}
