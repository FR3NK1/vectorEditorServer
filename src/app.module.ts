import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Shape } from './entities/shape.entity';
import { User } from './entities/user.entity';
import { Work } from './entities/work.entity';
import { GoogleFontsModule } from './google-fonts/google-fonts.module';
import { UserModule } from './user/user.module';
import { VectorImageModule } from './vector-image/vector-image.module';

@Module({
  imports: [
    VectorImageModule,
    GoogleFontsModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'database_vectorEditor.db',
      entities: [User, Shape, Work],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Shape, Work]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
