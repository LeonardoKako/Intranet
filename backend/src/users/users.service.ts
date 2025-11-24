import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const userData = {
        fullName: createUserDto.fullName,
        nickname: createUserDto.nickname,
        passwordHash: createUserDto.password,
        email: createUserDto.email,
      };

      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      return { ...newUser, status: 'Adicionado' };
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.code === '23505') {
        throw new ConflictException('Email já cadastrado');
      }

      throw e;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userData = {
      fullName: updateUserDto?.fullName,
      nickname: updateUserDto?.nickname,
      passwordHash: updateUserDto?.password,
      email: updateUserDto?.email,
    };

    const userModified = {
      id,
      ...userData,
    };

    if (!userModified) throw new NotFoundException('Usuário não encontrado');

    await this.userRepository.save(userModified);

    return { ...userModified, status: 'Atualizado' };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    await this.userRepository.remove(user);
    return { ...user, status: 'Removido' };
  }
}
