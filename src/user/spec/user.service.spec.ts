// src/user/spec/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateEmailDto } from '../dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('서비스가 정의되었는지 확인', () => {
    expect(service).toBeDefined();
  });

  it('유저 생성 테스트', async () => {
    const createUserDto: CreateUserDto = { name: 'John', age: 25, email: 'john@example.com' };
    const user = { id: 1, ...createUserDto };
    
    jest.spyOn(repository, 'create').mockReturnValue(user as any);
    jest.spyOn(repository, 'save').mockResolvedValue(user as any);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it('모든 유저 조회', async () => {
    const user = { id: 1, name: 'John', age: 25, email: 'john@example.com', isActive: true };
    
    jest.spyOn(repository, 'find').mockResolvedValue([user]);

    expect(await service.findAll()).toEqual([user]);
  });

  it('특정 유저 조회', async () => {
    const user = { id: 1, name: 'John', age: 25, email: 'john@example.com' };
    
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user as any);

    expect(await service.findOne(1)).toEqual(user);
  });

  it('유저 정보 업데이트', async () => {
    const updateUserDto: CreateUserDto = { name: 'John', age: 26, email: 'john@example.com' };
    const user = { id: 1, ...updateUserDto };
    
    jest.spyOn(repository, 'update').mockResolvedValue(user as any);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user as any);

    expect(await service.update(1, updateUserDto)).toEqual(user);
  });

  it('유저 삭제', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('유저 이메일 업데이트', async () => {
    const updateEmailDto: UpdateEmailDto = { email: 'newemail@example.com' };
    const user = { id: 1, name: 'John', age: 25, email: 'newemail@example.com' };

    jest.spyOn(repository, 'update').mockResolvedValue(user as any);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user as any);

    expect(await service.updateEmail(1, updateEmailDto)).toEqual(user);
  });

  // 새로운 테스트: 활성 상태 변경
  it('유저 활성 상태 변경', async () => {
    const user = { id: 1, name: 'John', age: 25, email: 'john@example.com', isActive: true };
    const updatedUser = { ...user, isActive: false };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user as any);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedUser as any);

    expect(await service.toggleActiveStatus(1)).toEqual(updatedUser);
  });
});
