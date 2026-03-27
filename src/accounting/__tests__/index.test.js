const {
  readBalance,
  writeBalance,
  creditAccount,
  debitAccount,
  resetBalance,
} = require('../index');

describe('Accounting app behavior', () => {
  beforeEach(() => {
    resetBalance(1000.0);
  });

  test('TC-001: View current balance (initial 1000.00)', () => {
    expect(readBalance()).toBe(1000.0);
  });

  test('TC-002: Credit amount updates balance correctly', () => {
    const newBalance = creditAccount(200.0);
    expect(newBalance).toBe(1200.0);
    expect(readBalance()).toBe(1200.0);
  });

  test('TC-003: Debit amount updates balance correctly when sufficient funds', () => {
    const result = debitAccount(300.0);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(700.0);
    expect(readBalance()).toBe(700.0);
  });

  test('TC-004: Debit fails when insufficient funds and balance remains unchanged', () => {
    const result = debitAccount(1200.0);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(result.balance).toBe(1000.0);
    expect(readBalance()).toBe(1000.0);
  });

  test('TC-005: Credit rejects negative amount', () => {
    expect(() => creditAccount(-100.0)).toThrow('Invalid credit amount');
    expect(readBalance()).toBe(1000.0);
  });

  test('TC-006: Debit rejects negative amount', () => {
    expect(() => debitAccount(-150.0)).toThrow('Invalid debit amount');
    expect(readBalance()).toBe(1000.0);
  });
});
