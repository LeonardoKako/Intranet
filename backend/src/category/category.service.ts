import { Injectable, NotFoundException } from '@nestjs/common';
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
    return 'This action adds a new category';
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Categoria não encontrada');
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
