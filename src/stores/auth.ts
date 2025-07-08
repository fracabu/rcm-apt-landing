import { ref } from 'vue'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase/config'

export const user = ref<User | null>(null)
export const isAuthenticated = ref(false)
export const isLoading = ref(false)

// Monitor authentication state
onAuthStateChanged(auth, (authUser) => {
  user.value = authUser
  isAuthenticated.value = !!authUser
})

export const login = async (email: string, password: string) => {
  try {
    isLoading.value = true
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Errore nel login:', error)
    throw error
  } finally {
    isLoading.value = false
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Errore nel logout:', error)
    throw error
  }
}