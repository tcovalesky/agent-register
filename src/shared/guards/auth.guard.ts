import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.validateRequest(context);
  }

  async validateRequest(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return true;
  }
}
