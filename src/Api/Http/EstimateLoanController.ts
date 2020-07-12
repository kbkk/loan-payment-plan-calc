import * as fastify from 'fastify';
import LoanCalculatorFactory, {LoanTypes} from "../../Application/Loans/LoanCalculatorFactory";
import {ILoanPaymentPlan} from "../../Application/Loans/interfaces";

const bodyJsonSchema = {
    type: 'object',
    required: ['loanAmount', 'loanTermInMonths'],
    properties: {
        loanAmount: {type: 'number'},
        loanTermInMonths: {type: 'number'},
    }
};

interface ILoanInstallmentViewModel {
    interestPaid: string;
    principalPaid: string;
    balance: string;
}

interface ILoanPaymentPlanViewModel {
    installments: ILoanInstallmentViewModel[]
}

function mapPaymentPlanToViewModel(plan: ILoanPaymentPlan): ILoanPaymentPlanViewModel {
    return {
        installments: plan.installments.map(installment => ({
            balance: installment.balance.toFixed(2),
            interestPaid: installment.interestPaid.toFixed(2),
            principalPaid: installment.principalPaid.toFixed(2),
        }))
    };
}


class EstimateLoanController {
    public static METHOD = 'post';
    public static URL = '/loans/calculate/:loanType';
    public static SCHEMA = {body: bodyJsonSchema};

    public constructor(
        private _loanCalculatorFactory: LoanCalculatorFactory
    ) {
    }

    public execute(req: fastify.FastifyRequest<{
        Body: { loanAmount: number, loanTermInMonths: number },
        Params: { loanType: string }
    }>): ILoanPaymentPlanViewModel {
        const calculator = this._loanCalculatorFactory.fromLoanType(req.params.loanType as LoanTypes);

        const plan = calculator.getPaymentPlan({
            loanAmount: req.body.loanAmount,
            loanTermInMonths: req.body.loanTermInMonths
        });

        return mapPaymentPlanToViewModel(plan);
    }
}

export default EstimateLoanController;
