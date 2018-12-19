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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'FileUpload',
  computed: mapState([
    'csrftoken'
  ]),
  components: {
    vueDropzone
  },
  props: {
    api_callback: 'etagq.tasks.tasks.etagDataUpload',  // This is the full name of the upload task in cyberCommons
    filetype: '', // This is one of the following: animals, tags, locations
  },
  data () {
    return {
      dzOptions: {
        dictDefaultMessage: 'Drop file here or click to upload.',
        acceptedFiles: '.csv',
        withCredentials: true,
        headers: {'X-CSRFToken': this.csrftoken},
        url: '/api/etag/file-upload/'
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_CSRF_TOKEN'
    ]),
    ...mapActions([
      'set_csrf_token'
    ]),
    sendingEvent (file, xhr, formData) {
      formData.append('callback', api_callback)
      formData.append('filetype', filetype)
    }
  }
}
</script>