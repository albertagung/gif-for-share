// Vue components register
Vue.component('vue-article', {
  props: ['title','url','like'],
  template: `
  <article class="white-panel"><img :src="url" alt="">
    <h4>{{title}}</h4>
    <div class="row">
      <div class="col-lg-6">
        <button type="button" class="btn btn-success">Download</button>
      </div>
      <div class="col-lg-6">
        <button type="button" class="btn btn-success">Liked: {{like}} times</button>
      </div>
    </div>
  </article>`
})

// Vue instance
new Vue({
  el:"#app",
  data:{
    photos:null,
    imageFile:null,
    imagePreview:null,
    inputTitle:null,
    host:"http://tomybudiman.cf:3000/"
  },
  created:function(){
    this.getPostFromDB();
  },
  methods:{
    getPostFromDB:function(){
      axios.get(this.host+"api/gif/getAll").then(function({data}){
        console.log(data);
      }).catch(function(err){
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
        console.log(data);
      }).catch(function(err){
        console.log(err);
      });
    },
    removeImage:function(){
      this.imageFile=null;
      this.imagePreview=null;
    }
  }
})
