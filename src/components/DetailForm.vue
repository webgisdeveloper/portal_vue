<!--

This handles displaying results from

-->
<template>
  <div class="detailForm">
    This is the detail form...
    <ul>
      <li v-for="(value, key) in formFields.item" :key="key">{{ key }}: {{ value}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DetailForm',
  props: {
    formFields: Array,
  },
  methods: {
  }
}
</script>
