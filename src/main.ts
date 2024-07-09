import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as nunjucks from 'nunjucks';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Get the underlying Express instance
  const express = app.getHttpAdapter().getInstance();

  // Define the directory containing your template files (views)
  const views = join(__dirname, '..', 'views');

  // Configure Nunjucks with Express
  nunjucks.configure(views, {
    express: express,
    autoescape: true,  // Optional: Enable autoescaping of HTML characters
    noCache: true      // Optional: Disable caching of templates (for development)
  });

  // Serve static assets from the 'static' folder
  const staticAssets = join(__dirname, '..', 'static');
  app.useStaticAssets(staticAssets);

  // Set the 'views' directory for template rendering
  app.setBaseViewsDir(views);

  // Start the Nest application
  await app.listen(3000);
}

bootstrap();
