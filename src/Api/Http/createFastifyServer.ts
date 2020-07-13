import * as fastify from "fastify";
import EstimateLoanController from "./EstimateLoanController";
import LoanCalculatorFactory from "../../Application/Loans/LoanCalculatorFactory";

export default function createFastifyServer(): fastify.FastifyInstance {
    const server = fastify.fastify({
        logger: {
            level: 'info'
        }
    });

    const estimateLoanController = new EstimateLoanController(
        new LoanCalculatorFactory()
    );

    server[EstimateLoanController.METHOD](
        EstimateLoanController.URL,
        {schema: EstimateLoanController.SCHEMA},
        estimateLoanController.execute.bind(estimateLoanController)
    );

    return server;
}
