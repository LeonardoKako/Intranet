import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CategoryService } from './category/category.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    console.log('Iniciando seeding do banco de dados...');
    try {
      // 1. Seed de Usuário
      const email = 'apoio03.ti@unicesusc.edu.br';
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        console.log(`Usuário ${email} não encontrado. Criando...`);
        await this.usersService.create({
          fullName: 'Leonardo João Fleith',
          nickname: 'Leo',
          email: email,
          password: 'senhaLeo',
        });
        console.log('Usuário padrão criado com sucesso!');
      } else {
        console.log('Usuário padrão já existe.');
      }

      // 2. Seed de Categorias
      const categoriesToSeed = [
        { name: 'Acessos', description: 'Gerenciamento de logins e senhas' },
        { name: 'Usuários', description: 'Controle de usuários' },
        { name: 'Servidores', description: 'Servidores da rede' },
        { name: 'Cloud', description: 'Serviços na nuvem' },
        { name: 'Rede', description: 'Equipamentos e estrutura de rede' },
        { name: 'Segurança', description: 'Políticas e logs de segurança' },
        { name: 'Documentação', description: 'Manuais e arquivos de documentação' },
      ];

      const existingCategories = await this.categoryService.findAll();
      const existingNames = existingCategories.map((c) => c.name);

      for (const cat of categoriesToSeed) {
        if (!existingNames.includes(cat.name)) {
          console.log(`Categoria ${cat.name} não encontrada. Criando...`);
          await this.categoryService.create(cat);
          console.log(`Categoria ${cat.name} criada!`);
        }
      }
      console.log('Seeding de categorias concluído!');
    } catch (error) {
      console.error('Erro durante o seeding do banco de dados:', error);
    }
  }
}
