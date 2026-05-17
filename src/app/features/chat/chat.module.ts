import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [ChatWidgetComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [ChatWidgetComponent],
  providers: [ChatService],
})
export class ChatModule {}
