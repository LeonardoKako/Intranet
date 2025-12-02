import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { validate } from 'uuid';

@Injectable()
export class LoginsService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const { categoryId } = createLoginDto;
    if (!validate(categoryId)) {
      throw new NotFoundException('ID inválido');
    }
    const category = await this.categoryService.findOne(categoryId);

    if (!category) throw new NotFoundException('Categoria não encontrada');

    const loginData = {
      title: createLoginDto.title,
      username: createLoginDto.username,
      description: createLoginDto.description,
      url: createLoginDto.url,
      password: createLoginDto.password,
      category,
    };

    const login = this.loginRepository.create(loginData);
    return this.loginRepository.save(login);
  }

  findAll() {
    return this.loginRepository.find({
      relations: ['category'],
      select: {
        category: { id: true, name: true, description: true },
      },
    });
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new NotFoundException('ID inválido');
    }
    const login = await this.loginRepository.findOneBy({ id });

    if (!login) throw new NotFoundException('Login não encontrado');

    return login;
  }

  async update(id: string, updateLoginDto: UpdateLoginDto) {
    if (!validate(id)) {
      throw new NotFoundException('ID inválido');
    }
    const loginData = {
      title: updateLoginDto?.title,
      username: updateLoginDto?.username,
      description: updateLoginDto?.description,
      url: updateLoginDto?.url,
      password: updateLoginDto?.password,
    };

    const loginModified = {
      id,
      ...loginData,
    };

    if (!loginModified) {
      throw new NotFoundException('Login não encontrado');
    }

    return this.loginRepository.save(loginModified);
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new NotFoundException('ID inválido');
    }
    const login = await this.loginRepository.findOneBy({ id });

    if (!login) throw new NotFoundException('Login não encontrado');

    return this.loginRepository.remove(login);
  }
}
