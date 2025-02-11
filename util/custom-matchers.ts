import { expect } from '@playwright/test';

expect.extend({
  toMatchDiscount(actualDiscount: number, expectedDiscount: number) {
    const pass = actualDiscount === expectedDiscount;
    if (pass) {
      return {
        message: () =>
          `Expected the discount ${actualDiscount} not to match the expected discount ${expectedDiscount}.`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected the discount ${actualDiscount} to match the expected discount ${expectedDiscount}.`,
        pass: false,
      };
    }
  },
  toMatchTotal(actualTotal: number, expectedTotal: number) {
    const pass = actualTotal === expectedTotal;
    if (pass) {
      return {
        message: () =>
          `Expected the total ${actualTotal} not to match the expected total ${expectedTotal}.`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected the total ${actualTotal} to match the expected total ${expectedTotal}.`,
        pass: false,
      };
    }
  },
});
