import { getPostApi } from '../../../../api/client'
import PostPage from '../../../../containers/Clubs/pages/PostPage'

const Page = ({ data }) => {
  return <PostPage data={data} />
}

export default Page

export async function getServerSideProps({ params: { id, postId } }) {
  const data = await getPostApi(id, postId)

  return {
    props: {
      data: data.data
    }
  }
}
