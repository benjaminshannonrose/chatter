export class Post {
  constructor( public content: string, public title: string, public username: string, public timestamp: any) {}
}

export interface PostId extends Post {
  id: string;
}
