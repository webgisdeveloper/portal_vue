<!--

This view uses the ItemList component to display results for the
corresponding sections: Tags, Animals, Locations


-->
<template>
  <div class="myetag">
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Tags" active>
          <ItemList v-bind:items="tags.results" v-bind:colHeaders="['url','tag_id', 'description']"/>
          <FileUpload filetype="tags"/>
        </b-tab>
        <b-tab title="Animals">
          <ItemList v-bind:items="animals.results" v-bind:colHeaders="['url', 'animal_id', 'species', 'field_data']"/>
          <FileUpload filetype="animals"/>
        </b-tab>
        <b-tab title="Locations">
          <ItemList v-bind:items="locations" v-bind:colHeaders="['url', 'location_id', 'name', 'latitude', 'longitude', 'active']"/>
          <FileUpload filetype="locations"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations, mapActions } from 'vuex'
import ItemList from '@/components/ItemList.vue'
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'myetag',
  components: {
    FileUpload,
    ItemList
  },
  computed: mapState([
    'user',
    'animals',
    'locations',
    'tags'
  ]),
}
</script>
