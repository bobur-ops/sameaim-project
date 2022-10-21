import { getClubApi } from '../../../api/client'
import Club from '../../../containers/Clubs/pages/Club'

const Page = ({ clubDetails }) => {
  return <Club clubDetails={clubDetails} />
}

export default Page

export async function getServerSideProps({ params: { id } }) {
  const data = await getClubApi(id)

  return {
    props: {
      clubDetails: data.data
    }
  }
}
