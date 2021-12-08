<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

export default {
  components: {
    AdminPostForm,
  },
  layout: 'admin',
  data() {
    return {
      loadedPost: {
        author: 'Stefan',
        title: 'A little post',
        content: 'A long time no see',
        thumbnailLink:
          'https://upload.wikimedia.org/wikipedia/commons/1/14/Big_Tech_companies.png',
      },
    }
  },
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
