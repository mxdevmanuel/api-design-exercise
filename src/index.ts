import 'reflect-metadata';
import 'module-alias/register';
import { Container } from '@/modules';
import { container } from 'tsyringe';

Container.setup();

// eslint-disable-next-line sort-imports
import { API } from '@/api';

const api = container.resolve(API);

api.setup();
