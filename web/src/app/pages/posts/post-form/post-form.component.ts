import { Post } from './../../../resources/interfaces/post';
import { PreviewComponent } from './preview/preview.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from './../../../components/boss-snack/snack.service';
import { PostsComponent } from './../posts.component';
import { PostService } from './../../../resources/services/post.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RequestStatus } from 'src/app/resources/enums/request-status';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  form!: FormGroup;
  get image(): AbstractControl { return this.form.get('image')!; }
  imageStateMatcher!: ImageStateMatcher;
  files: File[] = [];
  isLoading = false;
  formSubmitAttempt = false;
  post: Post = {} as Post;

  constructor(
    private postService: PostService,
    private snackService: SnackService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.post?.title, Validators.required),
      subtitle: new FormControl(this.post?.subtitle),
      description: new FormControl(this.post?.description, Validators.required),
      image: new FormControl(this.post?.image),
    });

    this.imageStateMatcher = new ImageStateMatcher(this.image);
  }

  onInputFileChange(event: Event): void {
    console.log(this.form);

    const files = <FileList>(event.target as HTMLInputElement).files;
    for (let index = 0; index < files.length; index++) {
      this.files.push(files[index]);
    }
    this.post.image = this.files[0];
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.postService.save(this.form.value).subscribe(
        data => {
          this.snackService.openSnackBar('Salvo com sucesso!', RequestStatus.Success);
        },
        err => {
          this.snackService.openSnackBar('Erro ao salvar!', RequestStatus.Error);
        }
      );
    }
    this.formSubmitAttempt = false;
  }

  previewCard(): void {
    this.post.title = this.form.value.title;
    this.post.subtitle = this.form.value.subtitle;
    this.post.description = this.form.value.description;
    this.dialog.open(PreviewComponent, {
      width: '100vw',
      height: '100vh',
      data: this.post
    });
  }
}

class ImageStateMatcher implements ErrorStateMatcher {
  image!: AbstractControl;

  constructor(image: AbstractControl) {
    this.image = image;
  }

  public isErrorState(control: FormControl, _: NgForm | FormGroupDirective): boolean {
    const hasError = (control && control.value && control.value._fileNames
      && !(
        control.value._fileNames.toLowerCase().endsWith('png')
        || control.value._fileNames.toLowerCase().endsWith('jpeg')
        || control.value._fileNames.toLowerCase().endsWith('jpg')
        || control.value._fileNames.toLowerCase().endsWith('jfif')
        || control.value._fileNames.toLowerCase().endsWith('pjpeg')
        || control.value._fileNames.toLowerCase().endsWith('pjp')
      )
    );

    if (hasError) {
      this.image.setErrors({ unacceptedFile: true });
    } else {
      this.image.setErrors(null);
    }
    return hasError;
  }
}
