import { useCallback } from "preact/hooks"
import { useSyncExternalStore } from "preact/compat"
import shouldUpdate from "./shouldUpdate"

export default function createStore(initialStore) {
  let store = initialStore
  const listeners = new Set()

  function useStore(selectorFn = (store) => store) {
    const subscribe = useCallback(
      (updater) => {
        const listener = {
          updater,
          selectorFn,
        }
        listeners.add(listener)
        return () => {
          listeners.delete(listener)
        }
      },
      [selectorFn],
    )

    const syncedStore = useSyncExternalStore(
      subscribe,
      getStore,
      getServerStore,
    )
    return selectorFn(syncedStore)
  }

  function setStore(action) {
    const oldStore = store

    store = action instanceof Function ? action(store) : action

    listeners.forEach(({ selectorFn, updater }) => {
      const oldState = selectorFn(oldStore)
      const newState = selectorFn(store)
      if (shouldUpdate(oldState, newState)) updater(() => newState)
    })
  }

  function getStore() {
    return store
  }

  function getServerStore() {
    return initialStore
  }

  return [useStore, setStore, getStore]
}
