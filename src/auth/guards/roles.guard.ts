import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Rol } from '../../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Extraer los roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Si la ruta no tiene el decorador @Roles, se permite el acceso
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtener el usuario del request (inyectado previamente por el JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // 4. Verificar si el usuario existe y si su rol está en la lista de permitidos
    const hasRole = () => requiredRoles.includes(user.rol);

    if (!user || !hasRole()) {
      throw new ForbiddenException('Tu rango de usuario no tiene permiso para acceder a este recurso');
    }

    return true;
  }
}