import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();
        
        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Acesso Negado');
        }

        return true;
    }
    
}