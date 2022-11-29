import { User } from './user.mongo.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (AppDataSource) => {
      const res = await AppDataSource.getRepository(User);
      return res;
    },
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
