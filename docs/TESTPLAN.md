# COBOL 账户管理系统测试计划

本文档提供当前 COBOL 应用的业务逻辑测试案例，供业务主管验收及后续 Node.js 单元/集成测试转换使用。

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|------------------|---------------|--------------------|----------|
| TC-001 | 查看当前余额 | 程序已启动；默认余额为 `1000.00` | 1. 运行程序 2. 选择 `1`（View Balance） | 显示 `Current balance: 1000.00` | | | |
| TC-002 | 存入金额成功 | 程序已启动；余额初始 `1000.00` | 1. 运行程序 2. 选择 `2`（Credit Account） 3. 输入 `200.00` | 显示 `Amount credited. New balance: 1200.00` | | | |
| TC-003 | 扣款成功 | 程序已启动；余额初始 `1000.00` | 1. 运行程序 2. 选择 `3`（Debit Account） 3. 输入 `300.00` | 显示 `Amount debited. New balance: 700.00` | | | |
| TC-004 | 扣款失败 - 余额不足 | 程序已启动；余额初始 `1000.00` | 1. 运行程序 2. 选择 `3`（Debit Account） 3. 输入 `1200.00` | 显示 `Insufficient funds for this debit.`；余额保持 `1000.00` | | | |
| TC-005 | 无效菜单选项处理 | 程序已启动 | 1. 运行程序 2. 输入 `9`（无效） | 显示 `Invalid choice, please select 1-4.`，继续循环 | | | |
| TC-006 | 退出程序 | 程序已启动 | 1. 运行程序 2. 选择 `4`（Exit） | 显示 `Exiting the program. Goodbye!`，程序停止 | | | |

## 覆盖的业务规则

- 初始账户余额：`1000.00`。
- 总余额查询：调用 `TOTAL` 读取并显示当前余额。
- 充值操作：余额加上输入金额并写回；返回新余额。
- 扣款操作：若余额充足则扣减并写回；若不足则拒绝并提示，不改变余额。
- 非法菜单输入：提示重新输入。
- 退出操作：停止程序。