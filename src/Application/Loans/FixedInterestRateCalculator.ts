import {IInterestRateCalculator, ILoanCalculationContext, InterestRate} from "./interfaces";
import {Decimal} from "decimal.js";

export class FixedInterestRateCalculator implements IInterestRateCalculator {
    private _cachedInterestRate: InterestRate;

    public constructor(interestRate: number | string) {
        this._cachedInterestRate = new Decimal(interestRate).div(12);
    }

    public getInterestRate(context: Readonly<ILoanCalculationContext>): InterestRate {
        return this._cachedInterestRate;
    }
}

export default FixedInterestRateCalculator;
