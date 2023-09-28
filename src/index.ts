import 'reflect-metadata';
import 'module-alias/register';
import { Container } from '@/modules';
// eslint-disable-next-line sort-imports
import { API } from '@/api';

const container = Container.setup();

const api = container.resolve(API);
api.setup();
