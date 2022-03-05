import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.validateRequest(context);
  }

  async validateRequest(context: ExecutionContext): Promise<boolean> {
    const query = context.switchToHttp().getRequest().query;

    if (query.login && query.login === process.env.AUTH_TOKEN) {
      return true;
    } else {
      throw new HttpException('Usuário não autenticado.', 401);
    }
  }
}
