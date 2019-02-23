export const SET_BLOG_LIST = (state, list) => {
    state.blogList = list
  };
  
  export const SET_CURRENT_BLOG = (state, blog) => {
    state.blog = blog
  };
  
  
  export const SET_BIG_STORY = (state, story) => {
    state.bigStory = story
  };
  
    
  export const CLEAR_CURRENT_BLOG = (state) => {
    state.blog = {}
  };
  