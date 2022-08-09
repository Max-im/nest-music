import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './track/tack.module';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, 'static') }),
    TrackModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        port: config.get<number>('DB_PORT'),
        entities: [__dirname + 'dist/**/*.entity.{js,ts}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
  ],
})
export class AppModule {}
