import {IInstallmentCalculator, ILoanCalculationContext} from "./interfaces";
import {DecimalMoney} from "./DecimalMoney";

export class FixedInstallmentCalculator implements IInstallmentCalculator {
    public getInstallment(context: Readonly<ILoanCalculationContext>): DecimalMoney {
        const {currentMonthInterestRate: interestRate} = context;

        if (interestRate!.isZero()) {
            return context.loanAmount.div(context.loanTermInMonths);
        }

        // for the formula see: https://en.wikipedia.org/wiki/Amortization_calculator
        return context.loanAmount.mul(
            interestRate!.add(
                interestRate!.div(
                    interestRate!.add(1).pow(context.loanTermInMonths).sub(1)
                )
            )
        );
    }
}

export default FixedInstallmentCalculator;
