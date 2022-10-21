import { useEffect } from 'react'
import { getClubsApi } from '../../api/client'
import Admin from '../../containers/Admin'

const Page = ({ clubs }) => {
  useEffect(() => {
    console.log(clubs)
  }, [])
  return <Admin />
}

export default Page

export async function getServerSideProps() {
  const { data } = await getClubsApi()

  return {
    props: {
      clubs: data.data
    }
  }
}
