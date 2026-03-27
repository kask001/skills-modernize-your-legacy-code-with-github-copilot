#!/usr/bin/env node

const readline = require('readline');

let storageBalance = 1000.0;

function readBalance() {
  return storageBalance;
}

function writeBalance(newBalance) {
  storageBalance = newBalance;
  return storageBalance;
}

async function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) =>
    new Promise((resolve) => rl.question(prompt, (answer) => resolve(answer.trim())));

  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await question('Enter your choice (1-4): ');

    switch (choice) {
      case '1': {
        const currentBalance = readBalance();
        console.log(`Current balance: ${currentBalance.toFixed(2)}`);
        break;
      }
      case '2': {
        const input = await question('Enter credit amount: ');
        const amount = parseFloat(input);
        if (Number.isFinite(amount) && amount >= 0) {
          const currentBalance = readBalance();
          const updatedBalance = currentBalance + amount;
          writeBalance(updatedBalance);
          console.log(`Amount credited. New balance: ${updatedBalance.toFixed(2)}`);
        } else {
          console.log('Invalid credit amount. Please enter a numeric value >= 0.');
        }
        break;
      }
      case '3': {
        const input = await question('Enter debit amount: ');
        const amount = parseFloat(input);
        if (Number.isFinite(amount) && amount >= 0) {
          const currentBalance = readBalance();
          if (currentBalance >= amount) {
            const updatedBalance = currentBalance - amount;
            writeBalance(updatedBalance);
            console.log(`Amount debited. New balance: ${updatedBalance.toFixed(2)}`);
          } else {
            console.log('Insufficient funds for this debit.');
          }
        } else {
          console.log('Invalid debit amount. Please enter a numeric value >= 0.');
        }
        break;
      }
      case '4': {
        continueFlag = false;
        console.log('Exiting the program. Goodbye!');
        break;
      }
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }

    if (continueFlag) {
      console.log('');
    }
  }

  rl.close();
}

if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  readBalance,
  writeBalance,
  run,
  storageBalance,
};
