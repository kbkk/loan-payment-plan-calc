import {expect} from "chai";
import BasicLoanCalculator from "../../BasicLoanCalculator";
import {DecimalMoney} from "../../DecimalMoney";
import FixedInterestRateCalculator from "../../FixedInterestRateCalculator";
import FixedInstallmentCalculator from "../../FixedInstallmentCalculator";
import {assertMoneySame} from "./utils";

describe('Application - Loans - BasicLoanCalculator', () => {
    const calculator = new BasicLoanCalculator(
        new FixedInterestRateCalculator('0.0035'),
        new FixedInstallmentCalculator()
    );

    describe('getPaymentPlan()', () => {
        it('should return an installment plan for each month', async () => {
            const plan = calculator.getPaymentPlan({
                loanAmount: new DecimalMoney(10000),
                loanTermInMonths: 6
            });

            expect(plan.installments).to.have.lengthOf(6);

            const expected = [
                {
                    interestPaid: new DecimalMoney(2.92),
                    principalPaid: new DecimalMoney(1665.45),
                    balance: new DecimalMoney(8334.55)
                },
                {
                    interestPaid: new DecimalMoney(2.43),
                    principalPaid: new DecimalMoney(1665.94),
                    balance: new DecimalMoney(6668.61)
                },
                {
                    interestPaid: new DecimalMoney(1.95),
                    principalPaid: new DecimalMoney(1666.42),
                    balance: new DecimalMoney(5002.19)
                },
                {
                    interestPaid: new DecimalMoney(1.46),
                    principalPaid: new DecimalMoney(1666.91),
                    balance: new DecimalMoney(3335.28)
                },
                {
                    interestPaid: new DecimalMoney(0.97),
                    principalPaid: new DecimalMoney(1667.40),
                    balance: new DecimalMoney(1667.88)
                },
                {
                    interestPaid: new DecimalMoney(0.49),
                    principalPaid: new DecimalMoney(1667.88),
                    balance: new DecimalMoney(0)
                }
            ];

            for(let month = 0; month < expected.length; month++) {
                assertMoneySame(plan.installments[month].interestPaid, expected[month].interestPaid);
                assertMoneySame(plan.installments[month].principalPaid, expected[month].principalPaid);
                assertMoneySame(plan.installments[month].balance, expected[month].balance);
            }
        });
    });
});

