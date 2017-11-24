// Vue components register
Vue.component('vue-article', {
  props: ["post"],
  template:`
  <article class="white-panel"><img :src="post.imgUrl" :alt="post.title">
    <h4>{{post.title}}</h4>
    <div class="row">
      <div class="col-lg-6">
        <button type="button" class="btn btn-success">Download</button>
      </div>
      <div class="col-lg-6">
        <button type="button" class="btn btn-success" @click="likePost">Liked: {{post.likes}} times</button>
      </div>
    </div>
  </article>`,
  methods:{
    likePost:function(){
      this.$emit("addlike",{
        postId:this.post._id
      });
    }
  }
})

// Vue instance
new Vue({
  el:"#app",
  data:{
    photos:null,
    imageFile:null,
    imagePreview:null,
    inputTitle:null,
    likeStatus:[],
    host:"http://tomybudiman.cf:3000/"
  },
  created:function(){
    this.getPostFromDB();
  },
  methods:{
    getPostFromDB:function(){
      axios.get(this.host+"api/gif/getAll").then(function({data}){
        this.photos=data.posts;
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    readFile:function(){
      var inputFile=event.target.files || event.dataTransfer.files;
      if(!inputFile.length){
        return;
      }else{
        var reader=new FileReader();
        reader.addEventListener("load",function(e){
          this.imagePreview = e.target.result;
        }.bind(this));
        reader.readAsDataURL(inputFile[0]);
        this.imageFile=inputFile[0];
      }
    },
    uploadImage:function(){
      var image=new FormData();
      image.append("image",this.imageFile);
      image.append("title",this.inputTitle);
      axios.post(this.host+"api/gif/upload",image).then(function({data}){
        if(data.status){
          this.imageFile=null;
          this.imagePreview=null;
          this.getPostFromDB();
          $('#uploadModal').modal('toggle');
        }else{
          console.log(data.msg);
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    addLike:function(fromChild){
      if(this.likeStatus.indexOf(fromChild.postId) == -1){
        this.likeStatus.push(fromChild.postId);
        axios.post(this.host+`api/gif/like/${fromChild.postId}`).then(function({data}){
          if(data.status){
            for(var i=0;i < this.photos.length;i++){
              if(this.photos[i]._id == fromChild.postId){
                this.photos[i].likes+=1;
                return;
              }
            }
          }else{
            console.log(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }
    },
    removeImage:function(){
      this.imageFile=null;
      this.imagePreview=null;
    }
  }
})
