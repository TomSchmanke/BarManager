import { ReduceIngredientsAmountPipe } from './reduce-ingredients-amount.pipe';

describe('ReduceIngredientsAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new ReduceIngredientsAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
