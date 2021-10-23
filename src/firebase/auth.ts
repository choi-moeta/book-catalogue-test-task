import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as _signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { useAuth as _useAuth } from '@vueuse/firebase/useAuth'
import { app } from './app'

const auth = getAuth(app)

export function useAuth() {
  return _useAuth(auth)
}

export function signIn() {
  signInWithPopup(auth, new GoogleAuthProvider())
}

export function signOut() {
  return _signOut(auth)
}

export function onAuthReady(fn: () => unknown) {
  const unsubscribe = onAuthStateChanged(auth, () => {
    fn()
    unsubscribe()
  })
}
