import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const categoryData = {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        icon: createCategoryDto.icon,
      };

      const newCategory = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(newCategory);
      return { ...newCategory, status: 'Adicionado' };
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.code === '23505') {
        throw new ConflictException('Categoria já cadastrado');
      }

      throw e;
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Categoria não encontrada');
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryData = {
      name: updateCategoryDto?.name,
      description: updateCategoryDto?.description,
      icon: updateCategoryDto?.icon,
    };

    const categoryModified = {
      id,
      ...categoryData,
    };

    if (!categoryModified) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.categoryRepository.save(categoryModified);

    return { ...categoryModified, status: 'Atualizado' };
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Categoria não encontrada');

    return this.categoryRepository.remove(category);
  }
}
