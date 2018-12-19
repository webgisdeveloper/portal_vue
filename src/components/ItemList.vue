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
        <b-pagination size="sm" align="center" :total-rows="100" v-model="currentPage" :per-page="10" />
        <div class="table-responsive">
          <table id="mytable" class="table table-bordered table-striped">
            <thead>
              <tr>
                <!--<th><input type="checkbox" id="checkall" /></th>-->
                <th v-for="header in colHeaders">{{ header }}</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items">
                <td v-for="attr in item">{{ attr }}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><b-button size="sm" variant="primary" ><font-awesome-icon icon="edit" size="xs" /></b-button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><b-button size="sm" variant="danger" ><font-awesome-icon icon="trash-alt" size="xs" /></b-button></p></td>
              </tr>
            <tr>
              <td v-for="attr in items[0]"><input type="text"></td>
              <td><p data-placement="top" data-toggle="tooltip" title="Add"><b-button size="sm" variant="primary" ><font-awesome-icon icon="plus-square" size="xs" /></b-button></p></td>
            </tr>
            </tbody>
          </table>
        </div>
        <b-pagination size="sm" align="center" :total-rows="100" v-model="currentPage" :per-page="10" />
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: Array,
    colHeaders: Array,
    title: 'items',
    currentPage: 0
  },
}
</script>
