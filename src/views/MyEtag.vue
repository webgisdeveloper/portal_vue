<template>
  <div class="myetag">
    This is from My Etag
    <ItemList v-bind:items="[[1,2,3],[4,5,6]]" v-bind:colHeaders="['first','second','third']"/>
    <FileUpload filetype="readers"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import ItemList from '@/components/ItemList.vue'
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'myetag',
  components: {
      FileUpload,
    ItemList
  },
  computed: mapState([
    'user'
  ]),
}
</script>
