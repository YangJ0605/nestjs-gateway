import { Module, CacheModule, CacheStore } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { redisStore } from 'cache-manager-redis-store';

const redisConfig = getConfig('REDIS_CONFIG');

@Module({
  imports: [
    // 全局的cacheModule
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: redisConfig.host,
            port: +redisConfig.port,
          },
          password: redisConfig.auth,
          ttl: 60 * 60 * 64 * 7,
        });
        return {
          store: {
            create: () => store as unknown as CacheStore,
          },
        };
      },
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
