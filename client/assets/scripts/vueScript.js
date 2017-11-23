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
  el: '#v',
  data: {
    photos: [
      {
        title: 'gambar1',
        url: 'http://i.imgur.com/sDLIAZD.png',
        like: 20
      },
      {
        title: 'gamabr2',
        url: 'http://i.imgur.com/8lhFhc1.gif',
        like: 30
      },
      {
        title: 'gambar3',
        url: 'http://i.imgur.com/xOIMvAe.jpg',
        like: 10
      }
    ],
    image: ''
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  }
})
