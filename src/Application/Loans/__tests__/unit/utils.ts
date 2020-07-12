import {DecimalMoney} from "../../DecimalMoney";
import {expect} from "chai";

export function assertMoneySame(value: DecimalMoney, expected: DecimalMoney): void {
    expect(
        value.toFixed(2)
    ).to.eql(
        expected.toFixed(2)
    );
}
