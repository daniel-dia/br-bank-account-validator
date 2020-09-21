import papaparse from "papaparse";
import BankAccountValidator from "./src";
import _ from "lodash";
import fs from "fs";

let falsePositive = [];
let falseNegative = [];
let truePositive = [];
let trueNegative = [];

const data = fs.readFileSync("./contas e status.csv", "utf-8");

const lvbbData = papaparse.parse(data, { header: true }).data as any[];

for (var r of lvbbData.filter((b) => b.bank != 0)) {
  try {
    BankAccountValidator.validate(
      {
        bankNumber: r.bank.toString(),
        accountNumber: r.account.split("-")[0],
        agencyNumber: r.agency.split("-")[0],
        accountCheckNumber: r.account.split("-")[1],
        agencyCheckNumber: r.agency.split("-")[1],
      },
      true
    );

    if (r.status != "failed") truePositive.push(r);
    if (r.status == "failed") falsePositive.push(r);
  } catch (e) {
    r.error = e.message;
    if (r.status == "completed") falseNegative.push(r);
    if (r.status == "failed") trueNegative.push(r);
  }
}

console.log("falsePositive", falsePositive.length);
console.log("falseNegative", falseNegative.length);
console.log("truePositive", truePositive.length);
console.log("trueNegative", trueNegative.length);

console.log(falseNegative.map((r) => r.bank + " " + r.agency + " " + r.account + " " + r.status + " " + r.errors + " " + r.error));
