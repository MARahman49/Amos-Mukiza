<template>
  <div> 
    <div class="header">
     <div class="head">
    <div class="headerobjectswrapper">
        <div class="weatherforcastbox"><span style="font-style: italic;">Weatherforcast for the next 24 hours: Plenty of Sunshine</span><br><span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span></div>
        <header>The Truth</header>
        </div>
       <div class="subhead">
          <b-container>
          <b-row >
          <b-col>
           <div >York, MA - Thursday August 30, 1978 - Seven Pages</div>
          </b-col>
          <b-col class="col-xs-12-col col-sm-12 col-md-4 col-lg-4 xl-4 ">
          <b-form-input size="sm" class="bg-transparent" v-model="searchField" trim placeholder="Search A Blog"/>
          </b-col>
        </b-row>
        </b-container>
       </div>
    </div>
      </div>
      <b-container class="mt-5 ">
        <div v-if="bigStory">
        <b-card border-variant="danger" class="overflow-hidden  bg-transparent mb-5" v-if="showBigStory">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="bigStory.fields.images[0].fields.file.url" class="rounded-0 media-info" />
            </b-col>
            <b-col md="6">
              <b-card-body :title="bigStory.fields.title">
                <p class="description">{{bigStory.fields.description | descLimit}}<b-link :to="{name: 'blog' ,  params: {id: bigStory.sys.id }}">..Read More</b-link></p>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
        <div v-if="showList">
          <div v-for="(blog , index) in blogList" :key="index" class="row center" >
          <b-col class="col-xs-12-col col-sm-12 offset-md-3 col-md-6 col-lg-6 xl-6 collumn " v-show="blog.show">
            <b-card class=" bg-transparent">
              <div class="head">
              <b-link  class="headline hl5" :to="{name: 'blog' ,  params: {id: blog.sys.id }}">{{blog.fields.title}}</b-link >
              <p><span class="headline hl6">Posted By <b><i>{{blog.fields.postedBy.fields.username}}</i></b> on <i>{{blog.fields.datePosted.slice(0 , 10)}}</i></span></p>
            </div>
            <figure class="figure">
              <b-img fluid class="media" :src="blog.fields.images[0].fields.file.url" alt="" />
              <figcaption class="figcaption">{{blog.fields.images[0].fields.title}}</figcaption>
            </figure>
            <p class="description">{{blog.fields.description | descLimit}}<b-link :to="{name: 'blog' ,  params: {id: blog.sys.id }}">..Read More</b-link></p>
            </b-card>
      </b-col>
      </div> 
        </div>
         <div v-if="showFiltered">
          <h3 class="headline hl5  col-xs-12-col col-sm-12 offset-md-3 col-md-6 col-lg-6 xl-6 font-weight-bold text-info">Filtered List</h3>
          <div v-for="(blog , index) in filteredArr" :key="index" class="row center" >
          <b-col class="col-xs-12-col col-sm-12 offset-md-3 col-md-6 col-lg-6 xl-6 collumn " >
            <b-card class=" bg-transparent">
              <div class="head">
              <span class="headline hl5">{{blog.fields.title}}</span>
              <p><span class="headline hl6">Posted By <b><i>{{blog.fields.postedBy.fields.username}}</i></b> on <i>{{blog.fields.datePosted.slice(0 , 10)}}</i></span></p>
            </div>
            <figure class="figure">
              <b-img fluid class="media" :src="blog.fields.images[0].fields.file.url" alt="" />
              <figcaption class="figcaption">{{blog.fields.images[0].fields.title}}</figcaption>
            </figure>
            <p class="description">{{blog.fields.description | descLimit}}<b-link class="btn-danger" :to="{name: 'blog' ,  params: {id: blog.sys.id }}">..Read More</b-link></p>
            </b-card>
      </b-col>
      </div> 
        </div>
        <b-button class="mb-4 col-xs-12-col col-sm-12 offset-md-3 col-md-6 col-lg-6 xl-6" block variant="primary" @click="loadMore()">Load More</b-button>
      </b-container>
  </div>
</template>

<script>
import blogHeader from '@/components/header.vue'
import {mapActions , mapGetters} from 'vuex';

export default {
  name: 'home',
  components: {
    blogHeader
  },
  data(){
    return {
      searchField: '',
      filteredArr: [],
      showList: true,
      showFiltered: false,
      showBigStory: true,
      limit: 5
    }
  },
  computed: {
    ...mapGetters('blog' , {
      blogList: 'blogList',
      bigStory: 'bigStory'
    })
  },
  methods: {
    ...mapActions('blog' , {
      getAllBlogs: 'getAllBlogs',
      getBlogById: 'getBlogById'
    }),
    viewBlog(name , id){
      this.getBlogById({id})
    },
    loadMore(){
    this.getAllBlogs(this.limit)
    this.limit *= 2
    }
  },
  mounted(){
    this.getAllBlogs(this.limit)
    this.limit *= 2
  },
  watch:{
    searchField(newVal , oldVal){
      let that = this
      let filteredArr = this.filteredArr
      if(newVal == ''){
        that.getAllBlogs()
          that.showList = true
          that.showFiltered = false
          that.showBigStory =  true
      }else{
        let new_filteredArr = []
        that.blogList.filter(function(el){
          if(el.fields.description.indexOf(newVal) !== -1 || el.fields.title.indexOf(newVal) !== -1 ) {
            new_filteredArr.push(el)
          }
        })
        that.showList = false
        that.showFiltered =true
        that.showBigStory =  false
        that.filteredArr = new_filteredArr
      }
    }
  }
}
</script>
<style scoped>
header{
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 80px;
    text-transform: uppercase;
    display: inline-block;
    line-height: 72px;
    margin-bottom: 20px;

}

p{
    margin-top: 0;
    margin-bottom: 20px;
}

.head{
    text-align: center;
    position: relative;
}

.subhead{
    text-transform: uppercase;
    border-bottom: 2px solid #2f2f2f;
    border-top: 2px solid #2f2f2f;
    padding: 12px 0 12px 0;

}
.weatherforcastbox{
    position: relative;
    width: 12%;
    left: 10px;
    border: 3px double #2f2f2f;
    padding: 12px 18px 12px 18px;
    line-height: 20px;
    display: inline-block;
    margin: 0 50px 20px -360px;
}
@media only all and (max-width: 1300px) {
    .weatherforcastbox{
        display: none;
    }
}
@media only all and (max-width: 600px) {
  header{
    max-width: 320px;
    font-size: 60px;
    line-height: 54px;
    overflow: hidden;
  }
}
.collumn{
  align-self: auto;
    font-size: 14px;
    line-height: 20px;
    padding: 0 1% 0 1%;
    margin-bottom: 50px;
    transition: all .7s;
}
.collumn .headline{
    text-align: center;
    line-height: normal;
    font-family: 'Playfair Display', serif;
    display: block;
    margin: 0 auto;
}
.description{
  text-align: justify;
  word-wrap: normal;
}

.collumn .headline.hl5{
    font-weight: 400;
    font-size: 30px;
    text-transform: uppercase;
    font-style: italic;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
}
.collumn .headline.hl6{
    font-weight: 400;
    font-size: 18px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
}
.collumn .headline.hl6:before{
    border-top: 1px solid #2f2f2f;
    content: '';
    width: 100px;
    height: 7px;
    display: block;
    margin: 0 auto;
}
.collumn .headline.hl6:after{
    border-bottom: 1px solid #2f2f2f;
    content: '';
    width: 100px;
    height: 10px;
    display: block;
    margin: 0 auto;

}
.collumn .figure {
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    align-content: center;
}
.collumn .figcaption{
	font-style: italic;
	font-size: 12px;
}
.media{
    -webkit-filter: sepia(80%) contrast(1) opacity(0.8);
    filter: sepia(80%) grayscale(1) contrast(1) opacity(0.8);
    mix-blend-mode: multiply;
    width: 100%;
    height: 32vh;
    align-self: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.media-info{
    -webkit-filter: sepia(80%) contrast(1) opacity(0.8);
    filter: sepia(80%) grayscale(1) contrast(1) opacity(0.8);
    mix-blend-mode: multiply;
    width: 80%;
    height: 50vh;
    align-self: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>

