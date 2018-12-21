<!--

This handles displaying results from

-->
<template>
  <div class="item-list">
    <p v-if="items.length===0">
      <b-alert show variant="warning">
        <strong>Please add or upload {{ title }}!</strong>
      </b-alert>
    </p>
    <div v-else>
      <b-container>
        <b-pagination size="sm" align="center" :total-rows="count" v-model="currentPage" :per-page="10" />
        <!-- TODO: Use b-table pagination and search -->
        <!--<b-table striped hover :items="items" :fields="displayFields" :small="true" :fixed="true"></b-table>-->
        <b-pagination size="sm" align="center" :total-rows="count" v-model="currentPage" :per-page="10" />
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: Array,
    displayFields: Array,
    title: 'items',
    count: 0,
    currentPage: 0
  },
}
</script>
