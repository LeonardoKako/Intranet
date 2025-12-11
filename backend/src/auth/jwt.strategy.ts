/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'seu-segredo-super-secreto', // Mesmo segredo do JwtModule
    });
  }

  async validate(payload: any) {
    // Payload contém os dados do token (sub, email, etc)
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}
