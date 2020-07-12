import {expect} from "chai";
import Decimal from "decimal.js";
import FixedInterestRateCalculator from "../../FixedInterestRateCalculator";
import {ILoanCalculationContext} from "../../interfaces";
import {DecimalMoney} from "../../DecimalMoney";
import {assertMoneySame} from "./utils";

describe('Application - Loans - FixedInterestRateCalculator', () => {
    const context: ILoanCalculationContext = {
        loanTermInMonths: 12,
        loanAmount: new DecimalMoney(12000),
        loanAmountLeft: new DecimalMoney(12000),
        currentMonthInterestRate: new Decimal(0)
    };

    describe('getInterestRate()', () => {
        it('should return yearly interest rate divided by 12', async () => {
            const calculator = new FixedInterestRateCalculator(0.12);

            const val1 = calculator.getInterestRate(context);

            assertMoneySame(val1, new Decimal(0.01));
        });

        it('should cache Decimal instance', async () => {
            const calculator = new FixedInterestRateCalculator(0.0035);

            const val1 = calculator.getInterestRate(context);
            const val2 = calculator.getInterestRate(context);

            expect(val1).to.eq(val2);
        });
    });
});
