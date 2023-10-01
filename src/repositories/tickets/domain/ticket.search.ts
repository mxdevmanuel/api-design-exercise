import { Ticket } from '@/entities';
import isNil from 'lodash/isNil';

interface SearchStructure {
  openParenthesis?: boolean;
  closeParenthesis?: boolean;
  and?: boolean;
  or?: boolean;
}

export interface TicketSearch extends SearchStructure, Partial<Ticket> {
  title_like?: string;
}
export interface Query<T, TS> {
  table: string;
  alias: string;

  isSelect: boolean;
  isInsert: boolean;
  isUpdate: boolean;
  isDelete: boolean;

  as: (alias: string) => this;
  select: (columns: (keyof T)[]) => this;
  insert: () => this;
  update: (columns: (keyof T)[]) => this;
  delete: () => this;

  leftJoin: (table: string, on: string) => this;
  innerJoin: (table: string, on: string) => this;
  join: (table: string, on: string) => this;

  where: (q: TS) => this;
  whereRaw: (q: string) => this
  groupBy: (groups: (keyof T)[]) => this;

  limit: (limit: number) => this;
  offset: (offset: number) => this;

  execute: <Z>() => Z;
}

const objectHandler = (key: string, value: unknown): string => {
  const presence = Array.isArray(value) && value.length > 0;
  const isString = presence && typeof value[0] === 'string';
  let handle = '';
  if (isString) {
    const quoted = value.map((v) => `'${v}'`);
    handle = `${key} IN ${quoted}`;
  } else if (presence) {
    handle = `${key} IN ${value.join(',')}`;
  }
  return handle;
};

const stringHandler = (key: string, value: unknown): string => {
  const operator = key.endsWith('_like') ? 'LIKE' : '=';
  return `${key} ${operator} '${value}'`;
};

const defaultHandler = (key: string, value: number): string =>
  `${key} = ${value}`;

export const whereGenerator = (searchCriteria: TicketSearch) => {
  const props = Object.entries(searchCriteria);

  return props
    .filter((propPair) => !isNil(propPair[1]))
    .map((propPair) => {
      const value = propPair[1];
      switch (typeof value) {
        case 'string':
          return stringHandler(...propPair);
        case 'object':
          return objectHandler(...propPair);
        default:
          return defaultHandler(...propPair);
      }
    })
    .filter((condition) => condition !== '')
    .join(' AND ');
};
