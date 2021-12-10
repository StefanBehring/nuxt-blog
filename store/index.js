import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: { loadedPosts: [] },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        try {
          const res = await axios.get(
            'https://nuxt-blog-5f7a5-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
          )
          const postsArray = []
          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key })
          }
          vuexContext.commit('setPosts', postsArray)
        } catch (e) {
          return context.error(e)
        }
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      async addPost(vuexContext, newPost) {
        const createdPost = { ...newPost, updatedDate: new Date() }
        try {
          const res = await axios.post(
            'https://nuxt-blog-5f7a5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            createdPost
          )
          vuexContext.commit('addPost', { ...createdPost, id: res.data.name })
        } catch (e) {
          return console.log(e)
        }
      },
      async editPost(vuexContext, editedPost) {
        try {
          await axios.put(
            'https://nuxt-blog-5f7a5-default-rtdb.europe-west1.firebasedatabase.app/posts/' +
              editedPost.id +
              '.json',
            editedPost
          )
          return vuexContext.commit('editPost', editedPost)
        } catch (e) {
          return console.log(e)
        }
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
