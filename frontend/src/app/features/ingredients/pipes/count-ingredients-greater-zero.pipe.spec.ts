import { CountIngredientsGreaterZeroPipe } from './count-ingredients-greater-zero.pipe';

describe('CountIngredientsGreaterZeroPipe', () => {
  it('create an instance', () => {
    const pipe = new CountIngredientsGreaterZeroPipe();
    expect(pipe).toBeTruthy();
  });
});
