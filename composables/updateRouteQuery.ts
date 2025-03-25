export default function useUpdateRouteQuery(key: string, value?: string) {
  const router = useRouter()
  const routeQuery = { ...router.currentRoute.value.query }

  if (!value) {
    delete routeQuery[key]
  } else {
    routeQuery[key] = value
  }

  router.push({ query: routeQuery })
}
