import { TokenStorageService } from './../../auth/token-storage.service';
import { BasePage } from './../../resources/interfaces/base-page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { startWith, switchMap, map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SnackService } from 'src/app/components/boss-snack/snack.service';
import { RequestStatus } from 'src/app/resources/enums/request-status';
import { User } from 'src/app/resources/interfaces/user';
import { UserService } from 'src/app/resources/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { UserFormComponent } from '../user/user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchForm!: FormGroup;

  users: User[] = [];

  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackService: SnackService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

  ngAfterViewInit(): void {
    this.handleUsers();
    this.handleSearchInput();
    this.loadUsers();
  }

  checkUserPermission(): boolean {
    return this.tokenStorageService.isADMIN();
  }

  handleUsers(): void {
    const res = this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => this.loadUsers()),
        map((data: BasePage<User>) => data),
        catchError(() => [])
      );

    res.subscribe(
      data => {
        this.users = [...data.content];
        this.totalElements = data.totalElements;
      },
      error => {
        this.users = [];
        this.totalElements = 0;
        console.error(error);
        this.snackService.openSnackBar('Erro ao carregar usuários!', RequestStatus.Error);
      }
    );
    this.loadUsers();
  }

  loadUsers(): Observable<BasePage<User>> {
    return this.userService.getAllPaged(
      this.paginator.pageIndex, this.paginator.pageSize
    );
  }

  handleSearchInput(): void {
    this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.userService.search(value, this.paginator.pageIndex, this.paginator.pageSize))
      ).subscribe(
        data => {
          this.users = [...data.content];
          this.totalElements = data.totalElements;
        },
        error => {
          console.error(error);
          this.users = [];
          this.totalElements = 0;
        }
      );
  }

  refreshUsers(): void {
    this.handleUsers();
  }

  openDialogForm(user?: User): void {
    user = user || ({} as User);
    const dialogForm = this.dialog.open(UserFormComponent, {
      width: '95vw'
    });
    dialogForm.componentInstance.user = user;
    dialogForm.afterClosed().subscribe(_ => this.refreshUsers());
  }

  deleteUser(item: User): void {
    if (item) {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent);
      confirmDialog.componentInstance.confirmMessage = `Deseja excluir ${item.name}?`;
      confirmDialog.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.userService.delete(item.id).subscribe(
            data => {
              this.snackService.openSnackBar(`Usuário ${item.name} deletado com sucesso!`, RequestStatus.Success);
              this.refreshUsers();
            },
            error => {
              this.snackService.openSnackBar(`Erro ao deletar!`, RequestStatus.Error); console.error(error);
            }
          );
        }
      });
    }
  }

}
