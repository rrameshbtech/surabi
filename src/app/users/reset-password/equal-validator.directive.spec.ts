import { EqualValiadtorDirective } from './equal-validator.directive';

describe('EqualValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new EqualValiadtorDirective('test-control-to-be-replaced',true);
    expect(directive).toBeTruthy();
  });
});
