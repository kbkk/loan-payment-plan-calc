import FixedInstallmentCalculator from "../../FixedInstallmentCalculator";
import {ILoanCalculationContext} from "../../interfaces";
import {DecimalMoney} from "../../DecimalMoney";
import Decimal from "decimal.js";
import {assertMoneySame} from "./utils";

describe('Application - Loans - FixedInstallmentCalculator', () => {
    const calculator = new FixedInstallmentCalculator();

    describe('getInstallment()', () => {
        it('should calculate installment for 0% interest rate', async () => {
            const context: ILoanCalculationContext = {
                loanTermInMonths: 12,
                loanAmount: new DecimalMoney(12000),
                loanAmountLeft: new DecimalMoney(12000),
                currentMonthInterestRate: new Decimal(0)
            };

            const installment = calculator.getInstallment(context);

            assertMoneySame(installment, new DecimalMoney(1000));
        });

        it('should calculate installment for 3% (non-zero) interest rate', async () => {
            const context: ILoanCalculationContext = {
                loanTermInMonths: 1,
                loanAmount: new DecimalMoney(10000),
                loanAmountLeft: new DecimalMoney(10000),
                currentMonthInterestRate: new Decimal(0.03)
            };

            const installment = calculator.getInstallment(context);

            assertMoneySame(installment, new DecimalMoney(10300.00));
        });
    });
});
