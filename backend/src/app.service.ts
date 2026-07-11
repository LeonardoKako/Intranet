import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CategoryService } from './category/category.service';
import { LoginsService } from './logins/logins.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly loginsService: LoginsService,
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

      // 3. Seed de Logins
      const existingLogins = await this.loginsService.findAll();
      if (existingLogins.length === 0) {
        console.log('Nenhum login encontrado. Iniciando seeding de logins...');
        
        // Buscar todas as categorias criadas para obter seus IDs reais
        const categories = await this.categoryService.findAll();
        const categoryMap = new Map(categories.map((c) => [c.name, c.id]));

        const loginsToSeed = [
          {
            title: 'Gmail do atendimento.ti',
            username: 'atendimento.ti@unicesusc.edu.br',
            password: 'Cpd69@dmin',
            url: 'www.gmail.com',
            categoryName: 'Acessos',
          },
          {
            title: 'AWS Cloud Console',
            username: 'admin@unicesusc.edu.br',
            password: 'Aws99@dmin',
            url: 'aws.amazon.com',
            categoryName: 'Cloud',
          },
          {
            title: 'Controlador de Domínio AD',
            username: 'administrator',
            password: 'Ad69@dmin',
            url: '192.168.1.10',
            categoryName: 'Servidores',
          },
          {
            title: 'Switch Core HP',
            username: 'admin',
            password: 'Switch69@dmin',
            url: '192.168.1.1',
            categoryName: 'Rede',
          },
          {
            title: 'Firewall pfSense',
            username: 'admin',
            password: 'Pfsense99@dmin',
            url: '192.168.1.254',
            categoryName: 'Segurança',
          },
        ];

        for (const loginSeed of loginsToSeed) {
          const categoryId = categoryMap.get(loginSeed.categoryName);
          if (categoryId) {
            console.log(`Criando login "${loginSeed.title}" para a categoria "${loginSeed.categoryName}"...`);
            await this.loginsService.create({
              title: loginSeed.title,
              username: loginSeed.username,
              password: loginSeed.password,
              url: loginSeed.url,
              categoryId: categoryId,
            });
          }
        }
        console.log('Seeding de logins concluído!');
      } else {
        console.log('Logins já existem no banco de dados.');
      }
    } catch (error) {
      console.error('Erro durante o seeding do banco de dados:', error);
    }
  }
}
