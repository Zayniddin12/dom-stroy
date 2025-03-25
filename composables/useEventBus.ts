// composables/useEventBus.ts
import mitt from 'mitt'

type ApplicationEvents = {
  'open-auth': 'login'
}

const emitter = mitt<ApplicationEvents>()

export const useEvent = emitter.emit
export const useListen = emitter.on
