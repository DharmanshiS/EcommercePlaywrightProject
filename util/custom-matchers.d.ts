// custom-matchers.d.ts
declare namespace PlaywrightTest {
    interface Matchers<R> {
      toMatchDiscount(expected: number): R;
      toMatchTotal(expected: number): R;
    }
  }
  