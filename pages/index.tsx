import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/signup')
  }, [router])

  return null // Clean return while redirecting
}

export default Home