<!--

This view uses the ItemList component to display results for the
corresponding sections: Tags, Animals, Locations


-->
<template>
  <div class="myetag">
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Tag Reads" active>
          <ItemList
                  filetype="tags"
                  v-bind:items="tags.results"
                  v-bind:displayFields="[
                    {key: 'tag_id', label: 'Tag ID', sortable: true},
                    {key: 'description', label: 'Description', sortable: true},
                    {key: 'actions', label: 'Actions'}
                  ]"
          />
          <FileUpload filetype="tags"/>
        </b-tab>
        <b-tab title="Tagged Animals">
          <ItemList
                  filetype="animals"
                  v-bind:items="animals.results"
                  v-bind:displayFields="[
                    {key: 'animal_id', label: 'Animal ID', sortable: true},
                    {key: 'species', label: 'Species', sortable: true},
                    {key: 'field_data', label: 'Field Data'},
                    {key: 'actions', label: 'Actions'}
                  ]"
          />
          <FileUpload filetype="animals"/>
        </b-tab>
        <b-tab title="Locations">
          <ItemList
                  filetype="locations"
                  v-bind:items="locations"
                  v-bind:displayFields="[
                    {key: 'location_id', label: 'Location ID', sortable: true},
                    {key: 'name', label: 'Name', sortable: true},
                    {key: 'latitude', label: 'Latitude'},
                    {key: 'longitude', label: 'Longitude'},
                    {key: 'active', label: 'Active'},
                    {key: 'actions', label: 'Actions'}
                  ]"
          />
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
