import { createUid } from "../util/uid"

export class Dispatcher {
  constructor(target) {
    this._listenersByEvent = new Map()

    this.target = target
    target.on = this.on.bind(this)
    target.unsubscribe = this.unsubscribe.bind(this)
  }

  on(eventType, callback) {
    let listenersForEvent = this._listenersByEvent.get(eventType)
    if (!listenersForEvent) {
      listenersForEvent = new Map()
      this._listenersByEvent.set(eventType, listenersForEvent)
    }

    const uid = createUid()
    listenersForEvent.set(uid, callback)
    return uid
  }

  unsubscribe(eventType, listenerKey) {
    const listenersForEvent = this._listenersByEvent.get(eventType)
    if (!listenersForEvent) return
    if (!listenersForEvent.has(listenerKey)) return

    listenersForEvent.delete(listenerKey)
  }

  dispatch(eventType) {
    const listenersForEvent = this._listenersByEvent.get(eventType)
    if (!listenersForEvent) return

    listenersForEvent.forEach((callback) => {
      callback(this.target)
    })
  }
}
