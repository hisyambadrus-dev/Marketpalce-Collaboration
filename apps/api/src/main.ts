import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origin = process.env.WEB_ORIGIN || "http://localhost:3000";
  app.enableCors({ origin: [origin, "http://127.0.0.1:3000"], credentials: true });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  const port = Number(process.env.PORT || 4000);
  await app.listen(port, "0.0.0.0");
  console.log(`Kampus Konnect API ready at http://localhost:${port}/api`);
}
bootstrap();
