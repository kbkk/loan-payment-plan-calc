import {DecimalMoney} from "./DecimalMoney";
import {
    ILoanCalculationContext,
    ILoanCalculationInput,
    ILoanCalculator,
    ILoanInstallment,
    ILoanPaymentPlan,
    IInstallmentCalculator,
    IInterestRateCalculator
} from "./interfaces";

class BasicLoanCalculator implements ILoanCalculator {
    public constructor(
        private _interestRateProvider: IInterestRateCalculator,
        private _installmentCalculator: IInstallmentCalculator
    ) {
    }

    public getPaymentPlan(input: ILoanCalculationInput): ILoanPaymentPlan {
        const context: ILoanCalculationContext = {
            loanAmount: new DecimalMoney(input.loanAmount),
            loanAmountLeft: new DecimalMoney(input.loanAmount),
            loanTermInMonths: input.loanTermInMonths
        };
        const loanTerm = context.loanTermInMonths;

        const installments: ILoanInstallment[] = [];

        for (let month = 1; month <= loanTerm; month++) {
            const rate = context.currentMonthInterestRate = this._interestRateProvider.getInterestRate(context);
            const installment = this._installmentCalculator.getInstallment(context);

            const interestPaid = context.loanAmountLeft.mul(rate);
            const principalPaid = installment.sub(interestPaid);

            context.loanAmountLeft = context.loanAmountLeft.sub(principalPaid);

            installments.push({
                interestPaid,
                principalPaid,
                balance: context.loanAmountLeft
            });
        }

        return {
            installments
        };
    }
}

export default BasicLoanCalculator;
