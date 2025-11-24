import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
