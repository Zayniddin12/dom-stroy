export default function checkIsMobile() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
        if (process.client) {
            if (window?.innerWidth < 320) {
                router.push('/mobile')
            }
        }
    })

    watch(() => route.path, () => {
        if (process.client) {
            if (window?.innerWidth < 320) {
                router.push('/mobile')
            }
        }
    }, {
        deep: true
    })
}
