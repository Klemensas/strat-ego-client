import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Subject } from 'rxjs/Subject';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ProfileUpdate } from 'strat-ego-common';

import { UpdateProfile as updateAllianceProfile, RemoveAvatar as removeAllianceAvatar } from '../../alliance.actions';
import { UpdateProfile as updatePlayerProfile, RemoveAvatar as removePlayerAvatar } from '../../../player/player.actions';
import { GameModuleState } from '../../../reducers';

export interface ProfileData extends ProfileUpdate {
  type: 'player' | 'alliance';
}

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent  {
  public uploader: FileUploader = new FileUploader({
    url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
    autoUpload: false,
    isHTML5: true,
    removeAfterUpload: true,
  });
  imagePreview: string;
  upload: any = new Subject();
  description = '';

  constructor(
    private cloudinary: Cloudinary,
    private store: Store<GameModuleState>,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileData,
  ) {
    this.description = this.data.description;
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      if (status !== 200) {
        this.upload.thrownError(status);
        return;
      }
      this.upload.next(JSON.parse(response));
    };
  }

  fileSelected(fileList: FileList) {
    const file = fileList[0];
    this.getBase64(file)
      .then((base64: string) => this.imagePreview = base64);
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  removeAvatar() {
    if (this.data.avatarUrl) {
      this.store.dispatch(this.data.type === 'alliance' ? new removeAllianceAvatar() : new removePlayerAvatar());
    } else if (this.uploader.queue.length) {
      this.uploader.clearQueue();
      this.imagePreview = null;
    }
  }

  saveProfile() {
    this.upload.pipe(first()).subscribe((response) => {
      const profilePayload: ProfileUpdate = {};
      if (response) { profilePayload.avatarUrl = response.secure_url; }
      if (this.description !== this.data.description) { profilePayload.description = this.description; }

      if (Object.keys(profilePayload).length) {
        this.store.dispatch(this.data.type === 'alliance' ? new updateAllianceProfile(profilePayload) : new updatePlayerProfile(profilePayload));
      }
    });
    this.uploadFile();
  }

  uploadFile() {
    if (!this.uploader.queue.length) {
      this.upload.next(null);
      return;
    }

    const file = this.uploader.queue[this.uploader.queue.length - 1];
    file.withCredentials = false;
    file.onBuildForm = (form: FormData) => {
      form.append('folder', this.data.type);
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      return form;
    };
    file.upload();
  }
}
