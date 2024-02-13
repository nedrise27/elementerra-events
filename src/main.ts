import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  await app.listen(port, () => {
    console.log(`Server started at port ${port}`);
    process?.send?.('ready');
  });
}
bootstrap();
