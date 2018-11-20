<template>
  <div class="item-list">
    <p v-if="items.length===0">
      <b-alert show variant="warning">
        <strong>Please add or upload {{ title }}!</strong>
      </b-alert>
    </p>
    <div v-else>
      <table class="table">
        <thead>
        <tr>
          <th scope="col" v-for="header in colHeaders">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
          <td v-for="attr in item">{{ attr }}</td>
          <td><button>Edit</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: Array,
    colHeaders: Array,
    title: 'items'
  },
}
</script>
