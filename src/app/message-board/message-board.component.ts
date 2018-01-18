import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Post, PostId} from '../../models/post.model';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {
  postsCol: any;
  posts: any;
  content: string;
  title: string;
  singlePost: Observable<any>;
  isLoggedIn: boolean;
  userDisplayName: string;
  userEmail: string;

  constructor(private afs: AngularFirestore,
              private postService: PostService,
              private userService: UserService) {}

  ngOnInit() {
    //order posts
    this.postsCol = this.postService.doOrderPosts();
    //display posts
    this.posts = this.postService.doDisplayPosts();
    //get auth state
    const authObject = this;
    this.userService.afAuth.auth.onAuthStateChanged(function(user) {
      if (user == null) {
        authObject.isLoggedIn = false;
        authObject.userDisplayName = '';
        authObject.userEmail = '';
      } else if (user != null) {
        authObject.isLoggedIn = true;
        authObject.userDisplayName = user.displayName;
        authObject.userEmail = user.email;
      }
    });
  }

  onAddPost() {
    const user = this.userService.doGetCurrentUser();
    this.postService.doAddPost(this.content, this.title, user.displayName, user.email);
    this.content = '';
    this.title = '';
  }

  onGetPost(postId) {
    this.singlePost = this.postService.doGetPost(postId).valueChanges();
  }

  onDeletePost(postId) {
    this.postService.doDeletePost(postId);
  }
}
