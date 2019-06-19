<!--

This handles displaying results from

-->
<template>
  <div class="item-list">
    <p v-if="items.length===0">
      <b-alert show variant="warning">
        <strong>Please add or upload {{ title }}!</strong>
        <button type="button" class="btn btn-primary" @click="downloadTemplate()">Download Template</button>
      </b-alert>
    </p>
    <div v-else>
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort" class="mb-0">
              <b-input-group>
                <b-form-select v-model="sortBy" :options="sortOptions">
                  <option slot="first" :value="null">-- none --</option>
                </b-form-select>
                <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort direction" class="mb-0">
              <b-input-group>
                <b-form-select v-model="sortDirection" slot="append">
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                  <option value="last">Last</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table show-empty
                 stacked="md"
                 :items="items"
                 :fields="displayFields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 :filter="filter"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :sort-direction="sortDirection"
                 @filtered="onFiltered"
                 striped="true"
        >
          <!--<template slot="name" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>-->
          <!--<template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>-->
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button size="sm" @click.stop="edit(row.item, row.index, $event.target)" class="mr-1">
              Edit
            </b-button>
            <b-button size="sm" @click.stop="row.toggleDetails" class="mr-1">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
            <b-button size="sm" @click.stop="remove(row.item)" class="mr-1">
              Remove
            </b-button>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
              </ul>
            </b-card>
          </template>
        </b-table>

        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>

        <!-- Edit modal -->
        <b-modal id="modalEdit" @hide="resetModal" :title="modalEdit.title" ok-only>
          <b-form class="modal-content animate" v-bind:action="modalEdit.url" method="post">
            <b-form-group v-for="(value, key) in modalEdit.content" v-if="key !== 'url'">
              <label>{{ key }}</label>
              {{ value }}
            </b-form-group>
          </b-form>
        </b-modal>
        <button type="button" class="btn btn-primary" @click="downloadData()">Download Data</button>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    filetype: '',
    items: Array,
    displayFields: Array,
    title: 'items'
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.displayFields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
    totalRows: function () {
      // a computed getter for number of records
      // this is used by the pagination
      return this.items.length
    }
  },
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      // TODO: Fix me - the page numbers are not updating in the pagination
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    edit (item, index, button) {
      console.log(item)
      this.modalEdit.title = `Item: ${item}`
      this.modalEdit.url = item.url
      this.modalEdit.content = []
      for (var field in this.displayFields) {
        this.modalEdit.content.push({key: field.key, label: field.label, value:item[field.key]})
      }
      console.log(this.modalEdit.content)
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    remove (item, index, button) {
        // TODO: get confirmation from user prior to removal - add logic to call api for removal - update items object
        console.log("remove: " + item.url)
    },
    resetModal () {
      // TODO: fix me - empty modal is displayed when switching between myetag sections after clicking edit in ui
      this.modalEdit.title = ''
      this.modalEdit.url = ''
      this.modalEdit.content = []
    },
    downloadTemplate () {
        location.href='api/etag/file-template/?filetype=' + this.filetype
    },
    downloadData () {
        location.href='api/etag/file-download/?format=csv&filetype=' + this.filetype
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalEdit: {title: '', url: '', content: []}
    }
  }
}
</script>
