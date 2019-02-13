<!--

This component uses dropzone and vue2-dropzone libraries to
facilitate file uploading.

Documentation:
https://www.dropzonejs.com/
https://github.com/rowanwins/vue-dropzone

-->
<template>
  <div class="file-upload">
    <vue-dropzone id="drop1" :options="dzOptions" v-on:vdropzone-sending="sendingEvent"></vue-dropzone>
  </div>
</template>

<script>
import vueDropzone from 'vue2-dropzone'
export default {
  name: 'FileUpload',
  components: {
    vueDropzone
  },
  props: {
    filetype: '', // This is one of the following: animals, tags, locations
  },
  data () {
    return {
      api_callback: 'etagq.tasks.tasks.etagDataUpload',  // This is the full name of the upload task in cyberCommons
      dzOptions: {
        dictDefaultMessage: 'Drop file here or click to upload.',
        acceptedFiles: '.csv',
        withCredentials: true,
        headers: {'X-CSRFToken': this.getCookie('csrftoken')},
        url: '/api/etag/file-upload/'
      }
    }
  },
  methods: {
    getCookie (cname) {
      let name = cname + '='
      let decodedCookie = decodeURIComponent(document.cookie)
      let ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    },
    sendingEvent (file, xhr, formData) {
      formData.append('callback', this.api_callback)
      formData.append('filetype', this.filetype)
    }
  }
}
</script>