import { useEffect } from 'react'

import { Box, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Stats from './components/Stats'

const Admin = () => {
  const router = useRouter()

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'))
    if (admin.login !== 'admin' || admin.password !== 'admin123') {
      router.push('/admin/login')
    }
  })

  return (
    <Box>
      <Heading>Admin Dashboard</Heading>
      <Stats />
    </Box>
  )
}

export default Admin
