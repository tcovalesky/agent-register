import { AuthGuard } from './auth.guard';

describe(AuthGuard.name, () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });

  it('should have canActivate method implemented', () => {
    const authGuard = new AuthGuard();
    expect(authGuard.canActivate).toBeDefined();
  });
});
