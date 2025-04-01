export interface Post {
    id: number;
    image?: string;
    video?: string;
    likes: number;
    dislikes: number;
    comments: string[];
  }
  
  export interface PostsState {
    posts: Post[];
  }
  