<template>
   <div>
      <blogHeader />
      <b-container fluid class="p-4">
        <b-container>
        <div class="head">
        <span class="headline hl5">{{blog.title}}</span>
        <p><span class="headline hl6">Posted By <b><i>{{blog.postedBy.fields.username}}</i></b> on <i>{{blog.datePosted.slice(0 , 10)}}</i></span></p>
      </div>
      <figure class="figure">
           <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          img-width="1024"
          img-height="480"
          v-if="blog.images.length > 1"
        >
        <div v-for="(image , index) in blog.images" :key="index">
            <b-carousel-slide class="media"  :caption="image.fields.file.title" :img-src="image.fields.file.url" />
        </div>
        </b-carousel>
        <div v-if="blog.images.length < 2">
        <b-img fluid class="media" :src="blog.images[0].fields.file.url" alt="" />
        <figcaption class="figcaption">{{blog.images[0].fields.title}}</figcaption>
        </div>
      </figure>
       <p class="description" v-html="blog.description"></p>
        </b-container>
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
      slide: 0,
      sliding: null
    }
  },
  computed: {
    ...mapGetters('blog' , {
      blog: 'currentBlog'
    })
  },
  methods: {
    ...mapActions('blog' , {
      getBlogById: 'getBlogById',
      clearBlog: 'clearBlog'
    }),
    scrollToTop() {
      window.scrollTo(0,0);
    },
     onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
  },
  mounted(){
    this.getBlogById(this.$route.params.id)
    this.scrollToTop()
  },
  destroyed(){
    this.clearBlog()
  },
  watch: {
    'blog.title'(newVal){
      if(newVal){
       document.title = newVal
      }
    }
  }
}
</script>
<style scoped>
.headline{
    line-height: normal;
    font-family: 'Playfair Display', serif;
    display: block;
    margin: 0 auto;
}
.description{
  text-align: justify;
  word-wrap: normal;
}

.headline.hl5{
    font-weight: 400;
    font-size: 30px;
    text-transform: uppercase;
    font-style: italic;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
}
.headline.hl6{
    font-weight: 400;
    font-size: 18px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
}
.figure {
	  margin: 0 0 20px;
}
.figcaption{
	font-style: italic;
	font-size: 12px;
}
.span4 img {
    margin-right: 10px;
}
.span4 .img-left {
    float: left;
}
.media{
  mix-blend-mode: multiply;
  -webkit-filter: sepia(80%) contrast(1) opacity(0.8);
  filter: sepia(80%) grayscale(1) contrast(1) opacity(0.8);
  background-size: cover;
  width: 90%;
  background-repeat: no-repeat;
}
</style>

