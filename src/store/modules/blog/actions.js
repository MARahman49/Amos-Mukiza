import Api from '@/utils/Api'

export const getAllBlogs = ({commit, dispatch} , data) => {
console.log(data)
  Api.getEntries({'content_type': 'listings' , limit: data}).then(res => {
    console.log(res.items)
    let bigStory_Arr = []
    res.items.forEach(story => {
      if(story.fields.category.fields.title == 'Big Story'){
        bigStory_Arr.push(story)
      }
    });
    if(bigStory_Arr.length > 0){
      res.bigSTory = bigStory_Arr[0]
    }
    res.items.forEach(story => {
      if(story.sys.id == res.bigSTory.sys.id){
       story.show = false
      }else{
        story.show = true
      }
    });
    commit('SET_BLOG_LIST', res.items)
    commit('SET_BIG_STORY', res.bigSTory)
  }).catch(error => {
    console.log(error.message)
  })
};

export const getBlogById = ({commit, dispatch} , data) => {
  Api.getEntry(data).then(res => {
    console.log(res)
    commit('SET_CURRENT_BLOG', res.fields)
  }).catch(error => {
    console.log(error.message)
  })
};


export const clearBlog = ({commit, dispatch} , data) => {
    commit('CLEAR_CURRENT_BLOG')
};