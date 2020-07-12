import {expect} from "chai";
import * as fastify from "fastify";
import fetch from 'node-fetch';
import createFastifyServer from "../createFastifyServer";

describe('Application - Loans - EstimateLoanCalculator', () => {
    let server: fastify.FastifyInstance;
    let serverUrl: string;

    beforeEach(async () => {
        server = createFastifyServer();

        serverUrl = await server.listen(0);
    });

    afterEach(async () => {
        await server.close();
    });

    describe('POST /loans/calculate/housing', () => {
        it('should return a payment plan for a housing loan', async () => {
            const response = await fetch(`${serverUrl}/loans/calculate/housing`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    loanTermInMonths: 12,
                    loanAmount: 10000
                })
            });

            const plan = await response.json();

            expect(response.status).to.eql(200);
            expect(plan).to.eql(
                {
                    installments: [
                        {
                            balance: '8345.44',
                            interestPaid: '29.17',
                            principalPaid: '1654.56'
                        },
                        {
                            balance: '6686.06',
                            interestPaid: '24.34',
                            principalPaid: '1659.38'
                        },
                        {
                            balance: '5021.84',
                            interestPaid: '19.50',
                            principalPaid: '1664.22'
                        },
                        {
                            balance: '3352.77',
                            interestPaid: '14.65',
                            principalPaid: '1669.07'
                        },
                        {
                            balance: '1678.83',
                            interestPaid: '9.78',
                            principalPaid: '1673.94'
                        },
                        {
                            balance: '0.00',
                            interestPaid: '4.90',
                            principalPaid: '1678.83'
                        }
                    ]
                }
            );
        });
    });
});
