import {DecimalMoney} from "./DecimalMoney";
import {Decimal} from "decimal.js";

export type InterestRate = Decimal;

export interface ILoanCalculationInput {
    readonly loanAmount: DecimalMoney;
    readonly loanTermInMonths: number;
}

export interface ILoanCalculationContext {
    readonly loanAmount: DecimalMoney;
    readonly loanTermInMonths: number;
    loanAmountLeft: DecimalMoney;
    currentMonth?: number;
    currentMonthInterestRate?: InterestRate;
}

export interface ILoanInstallment {
    interestPaid: DecimalMoney;
    principalPaid: DecimalMoney;
    balance: DecimalMoney;
}

export interface ILoanPaymentPlan {
    installments: ILoanInstallment[];
}

export interface IInstallmentCalculator {
    getInstallment(context: Readonly<ILoanCalculationContext>): DecimalMoney;
}

export interface IInterestRateCalculator {
    getInterestRate(context: Readonly<ILoanCalculationContext>): InterestRate;
}

export interface ILoanCalculator {
    getPaymentPlan(context: ILoanCalculationInput): ILoanPaymentPlan;
}
