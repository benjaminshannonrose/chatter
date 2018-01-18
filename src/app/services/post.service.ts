import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Post} from '../../models/post.model';
import * as firebase from 'firebase';

@Injectable()
export class PostService {
  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  constructor(private afs: AngularFirestore) { }

  doOrderPosts() {
    this.postsCol = this.afs.collection('posts', ref => {
      const postQuery = ref.orderBy('timestamp');
      return postQuery;
    });
    return this.postsCol;
  }

  doDisplayPosts() {
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
    return this.posts;
  }

  doAddPost(content: string, title: string, username: string, email: string) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.afs.collection('posts')
      .add({'content': content, 'title': title, 'username': username, 'email': email, 'timestamp': timestamp});
  }

  doGetPost(postId) {
    return this.afs.doc('posts/' + postId);
  }

  doDeletePost(postId) {
    this.afs.collection('posts').doc(postId)
      .delete()
      .then(function() {
        console.log('deleted successfully!');
      }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

}
