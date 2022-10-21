import { getClubApi } from '../../../api/client'
import CreatePage from '../../../containers/Clubs/pages/CreatePage'

const Page = ({ clubID, authorId }) => {
  return <CreatePage clubID={clubID} authorId={authorId} />
}

export default Page

export async function getServerSideProps({ params: { id } }) {
  const data = await getClubApi(id)

  return {
    props: {
      clubID: data.data._id,
      authorId: JSON.parse(data.data.author).userId
    }
  }
}
