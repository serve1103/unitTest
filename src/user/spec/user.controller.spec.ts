// src/user/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateEmailDto } from '../dto/user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('컨트롤러가 정의되어 있는지', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('새로운 유저를 생성', async () => {
      const createUserDto: CreateUserDto = { name: 'John', age: 25, email: 'john@example.com' };
      const user = { id: 1, ...createUserDto };

      jest.spyOn(service, 'create').mockResolvedValue(user as any);

      expect(await controller.create(createUserDto)).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('모든 유저를 조회', async () => {
      const user = { id: 1, name: 'John', age: 25, email: 'john@example.com' };

      jest.spyOn(service, 'findAll').mockResolvedValue([user]);

      expect(await controller.findAll()).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('특정 유저를 조회', async () => {
      const user = { id: 1, name: 'John', age: 25, email: 'john@example.com' };

      jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

      expect(await controller.findOne('1')).toEqual(user);
    });
  });

  describe('update', () => {
    it('특정 유저를 업데이트하는', async () => {
      const updateUserDto: CreateUserDto = { name: 'John', age: 26, email: 'john@example.com' };
      const user = { id: 1, ...updateUserDto };

      jest.spyOn(service, 'update').mockResolvedValue(user as any);

      expect(await controller.update('1', updateUserDto)).toEqual(user);
    });
  });

  describe('remove', () => {
    it('특정 유저를 삭제하는', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('updateEmail', () => {
    it('특정 유저의 이메일을 업데이트하는', async () => {
      const updateEmailDto: UpdateEmailDto = { email: 'newemail@example.com' };
      const user = { id: 1, name: 'John', age: 25, email: 'newemail@example.com' };

      jest.spyOn(service, 'updateEmail').mockResolvedValue(user as any);

      expect(await controller.updateEmail('1', updateEmailDto)).toEqual(user);
    });
  });
});
