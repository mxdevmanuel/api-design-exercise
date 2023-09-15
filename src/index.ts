import 'reflect-metadata';
import 'module-alias/register';
import { Container } from '@/modules';
import { User } from '@/entities/User';
import { UserService } from '@/services/UserService';
import { container } from 'tsyringe';
import shortid from 'shortid';

Container.setup()

const userServce = container.resolve(UserService);

userServce
  .addUser({ name: 'Diana', id: shortid.generate() })
  .then((user: User) => console.log(user))
  // .then(() => userServce.geAllUsers())
  // .then((users: User[]) => console.log('allUsers', users));