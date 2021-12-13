import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: { loadedPosts: [], token: null },
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
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      },
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        try {
          const res = await context.app.$axios.$get('/posts.json')
          const postsArray = []
          for (const key in res) {
            postsArray.push({ ...res[key], id: key })
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
          const res = await this.$axios.$post(
            '/posts.json?auth=' + vuexContext.state.token,
            createdPost
          )
          vuexContext.commit('addPost', { ...createdPost, id: res.name })
        } catch (e) {
          return console.error(e)
        }
      },
      async editPost(vuexContext, editedPost) {
        try {
          await this.$axios.$put(
            '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token,
            editedPost
          )
          return vuexContext.commit('editPost', editedPost)
        } catch (e) {
          return console.error(e)
        }
      },
      authenticateUser(vuexContext, authData) {
        let authURL =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        if (!authData.isLogin) {
          authURL =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        }
        return this.$axios
          .$post(authURL + process.env.fbAPIKey, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            const token = result.idToken
            const expiresIn = Number.parseInt(result.expiresIn) * 1000
            vuexContext.commit('setToken', token)
            localStorage.setItem('token', token)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + expiresIn
            )
            Cookie.set('jwt', token)
            Cookie.set('expirationDate', new Date().getTime() + expiresIn)
          })
          .catch((e) => console.error(e))
      },
      initAuth(vuexContext, req) {
        let token = null
        let expirationDate = null
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || token === null) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        vuexContext.commit('clearToken')
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      },
    },
  })
}

export default createStore
