import {Component} from '@angular/core';
import {IUser} from "../../../domain.model";
import {UserService} from "../../../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users =this.userService.getUsers();
  user = this.userService.currentUser();
  loading = false;


  constructor(private userService: UserService) {
  }

  update() {
    this.userService.update(this.user);
  }

  selectUser(user: IUser) {
    this.userService.updateUser(user);
    this.userService.select(user.penName);
  }

}
