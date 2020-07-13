import {ILoanCalculator} from "./interfaces";
import BasicLoanCalculator from "./BasicLoanCalculator";
import FixedInterestRateCalculator from "./FixedInterestRateCalculator";
import FixedInstallmentCalculator from "./FixedInstallmentCalculator";

export type LoanTypes = 'housing';

class LoanCalculatorFactory {
    public fromLoanType(loanType: LoanTypes): ILoanCalculator {
        if(loanType === 'housing') {
            return new BasicLoanCalculator(
                new FixedInterestRateCalculator(0.035),
                new FixedInstallmentCalculator()
            );
        }

        throw new Error('Unknown loan type');
    }
}

export default LoanCalculatorFactory;
