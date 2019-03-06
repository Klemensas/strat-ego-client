import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  @Output() sendMessage = new EventEmitter<any>();

  messageForm = this.fb.group({
    target: ['', Validators.required],
    title: ['', Validators.minLength(1)],
    body: ['', Validators.minLength(4)]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.messageForm.valid) { return; }

    this.sendMessage.emit(this.messageForm.value);
  }
}
