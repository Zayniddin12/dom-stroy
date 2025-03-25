import type { TParams } from '~/types/params'
import type { TComment, TComments } from '~/types/comments'
export const useCommentsStore = defineStore('commentsStore', {
  state: () => ({
    comments: [] as TComment[],
    commentsLoading: true,
    productComment: [] as TComment[],
    productCommentLoading: true,
  }),
  actions: {
    fetchComments(params?: TParams) {
      return new Promise((resolve, reject) => {
        useFetcher<TComments>('products/top-comments/', {
          method: 'GET',
          params,
        })
          .then((res) => {
            this.comments = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err?.data?.detail)
          })
          .finally(() => (this.commentsLoading = false))
      })
    },
  },
})
