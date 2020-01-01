<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p v-if="email">{{ email }}</p>
    <p v-else>You should only get here if you're authenticated!</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.$store.dispatch("Auth/fetchUser");
  },

  computed: {
    email() {
      let user = this.$store.getters["Auth/user"];
      return user ? user.email : false;
    }
  }
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}
p {
  color: red;
}
</style>
