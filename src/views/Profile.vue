<template>
  <div class="profile">
      <h1>Profile</h1>
      {{ user.username }}
      {{ user.firstname }}
      {{ user.lastname }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  computed: mapState([
    'user'
  ])
}
</script>
