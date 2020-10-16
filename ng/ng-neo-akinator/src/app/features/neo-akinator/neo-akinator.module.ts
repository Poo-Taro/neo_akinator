/**
 * ネオアキネーターモジュール.
 *
 * created on 2020/03/29
 * @author Taro Suzuki
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NeoAkinatorRoutingModule } from './neo-akinator-routing.module';
import { AkinatorAnswerComponent } from './akinator-answer/akinator-answer.component';
import { AkinatorThinkingComponent } from './akinator-thinking/akinator-thinking.component';
import { AkinatorTopComponent } from './akinator-top/akinator-top.component';
import { AkinatorThinkingMainComponent } from './akinator-thinking/akinator-thinking-main/akinator-thinking-main.component';
import { AkinatorHeaderComponent } from './akinator-header/akinator-header.component';
import { AkinatorFooterComponent } from './akinator-footer/akinator-footer.component';
import { AkinatorRootComponent } from './akinator-root/akinator-root.component';
import { BackgroundRhombusComponent } from './akinator-root/background-rhombus/background-rhombus.component';
import { BackgroundWindComponent } from './akinator-root/background-wind/background-wind.component';
import { AkinatorCommentComponent } from './akinator-comment/akinator-comment.component';
import { AkinatorButtonComponent } from './akinator-button/akinator-button.component';
import { AkinatorAddquestionComponent } from './akinator-addquestion/akinator-addquestion.component';
import { AkinatorNavigateComponent } from './akinator-navigate/akinator-navigate.component';
import { AddCharacterQuestionComponent } from './akinator-answer/add-character-question/add-character-question.component';



@NgModule({
  declarations: [
    AkinatorAnswerComponent,
    AkinatorThinkingComponent,
    AkinatorTopComponent,
    AkinatorThinkingMainComponent,
    AkinatorHeaderComponent,
    AkinatorFooterComponent,
    AkinatorRootComponent,
    BackgroundRhombusComponent,
    BackgroundWindComponent,
    AkinatorCommentComponent,
    AkinatorButtonComponent,
    AkinatorAddquestionComponent,
    AkinatorNavigateComponent,
    AddCharacterQuestionComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,
    HttpClientModule,
    NeoAkinatorRoutingModule
  ],
  exports: [
    NeoAkinatorRoutingModule,
    AkinatorAnswerComponent,
    AkinatorThinkingComponent,
    AkinatorTopComponent,
    AkinatorThinkingMainComponent,
    AkinatorButtonComponent
  ],
  entryComponents: [
    AddCharacterQuestionComponent
  ],
})
export class NeoAkinatorModule { }
