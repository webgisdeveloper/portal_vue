<!--

This handles editing an individual item

-->
<template>
  <div class="editItem">
    <b-btn v-b-modal.modalEditItem>Edit</b-btn>

    <!-- Modal Component -->
    <b-modal id="modalEditItem" title="Edit" hide-footer="true">
      <b-form class="modal-content animate" v-bind:action="item_url" method="post">
        <input type='hidden' name='csrfmiddlewaretoken' v-bind:value='csrftoken' />
        <div class="container box">
          <b-form-group v-for="field in fields"
            label="field.label"
            label-for="field.key">
            <b-form-input
              id="field.key">
              type="text"
            </b-form-input>
          </b-form-group>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    item_url: "",
    fields: Array
  }
}
</script>
