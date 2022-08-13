import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const config = await app.get(ConfigService);
    const configPort = config.get<number>('APP_PORT');
    const port = process.env.PORT || configPort || 5000;
    app.enableCors();
    await app.listen(port, () => console.log(`Server run on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
