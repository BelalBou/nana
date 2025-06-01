import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AidModule } from './aid/aid.module';
import { ConditionModule } from './condition/condition.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AidModule, ConditionModule, EligibilityModule, AuthModule, QuestionModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}