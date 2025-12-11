/* eslint-disable @typescript-eslint/no-unused-vars */
// users.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Hash da senha
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // Comparar senha com hash
  private async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Remover passwordHash da resposta
  private removePasswordHash(user: User): Partial<User> {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // Verificar se email já existe
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email já cadastrado');
      }

      // Criar hash da senha
      const passwordHash = await this.hashPassword(createUserDto.password);

      const userData = {
        fullName: createUserDto.fullName,
        nickname: createUserDto.nickname,
        passwordHash, // SALVA O HASH, NÃO A SENHA EM TEXTO!
        email: createUserDto.email,
      };

      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);

      // Retornar SEM o passwordHash
      return { ...this.removePasswordHash(newUser), status: 'Adicionado' };
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.code === '23505') {
        throw new ConflictException('Email já cadastrado');
      }

      throw e;
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    // Remover passwordHash de TODOS os usuários
    return users.map((user) => this.removePasswordHash(user));
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new NotFoundException('ID inválido');
    }
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Retornar SEM o passwordHash
    return this.removePasswordHash(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new NotFoundException('ID inválido');
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Se estiver atualizando a senha, precisa do oldPassword
    if (updateUserDto.password) {
      if (!updateUserDto.oldPassword) {
        throw new UnauthorizedException(
          'Senha antiga é necessária para alterar a senha',
        );
      }

      // Verificar se a senha antiga está correta
      const isPasswordValid = await this.comparePassword(
        updateUserDto.oldPassword,
        user.passwordHash,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Senha antiga incorreta');
      }

      // Atualizar o hash da nova senha
      user.passwordHash = await this.hashPassword(updateUserDto.password);
    }

    // Atualizar outros campos se fornecidos
    if (updateUserDto.fullName) user.fullName = updateUserDto.fullName;
    if (updateUserDto.nickname) user.nickname = updateUserDto.nickname;
    if (updateUserDto.email) user.email = updateUserDto.email;

    await this.userRepository.save(user);

    // Retornar SEM o passwordHash
    return { ...this.removePasswordHash(user), status: 'Atualizado' };
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new NotFoundException('ID inválido');
    }
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    await this.userRepository.remove(user);

    // Retornar SEM o passwordHash
    return { ...this.removePasswordHash(user), status: 'Removido' };
  }

  // MÉTODO ESPECIAL PARA LOGIN (não exposto via controller)
  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'fullName', 'nickname', 'passwordHash'],
    });

    if (!user) {
      return null;
    }

    // Comparar senha com hash
    const isPasswordValid = await this.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return null;
    }

    // Retornar usuário SEM o passwordHash
    return this.removePasswordHash(user);
  }

  // Buscar usuário por email (para login)
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
