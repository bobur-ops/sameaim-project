import { Box, Button, Heading, Text, Textarea } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { createComment, getClubApi, updateClubApi } from '../../../api/client'
import { useGlobalContext } from '../../../context/GlobalContext'
import { uniqueId } from '../../../utils/uniqueId'
import Comment from '../components/Comment'

const PostPage = ({ data }) => {
  const [commentValue, setCommentValue] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [comments, setComments] = useState(data.comments)

  const { user } = useGlobalContext()
  const router = useRouter()
  const { id, postId } = router.query

  const submitComment = async () => {
    const newComment = {
      author: JSON.stringify(user),
      text: commentValue,
      commentId: uniqueId('comment')
    }
    setComments(prev => [newComment, ...prev])
    try {
      setButtonLoading(true)
      const club = await getClubApi(id)
      const newPosts = club.data.posts.map(item => ({
        ...item,
        comments:
          item.postId === postId
            ? [newComment, ...item.comments]
            : [...item.comments]
      }))

      const updatedClub = {
        ...club.data,
        posts: newPosts
      }
      const res = await updateClubApi(updatedClub, club.data._id)
      setButtonLoading(false)
      toast.success('Comment sent!')
    } catch (error) {
      setButtonLoading(false)
      toast.error(`${error.response.data.message}`)
    }
  }

  return (
    <Box>
      <Heading mb={10}>{data.title}</Heading>
      <Box borderBottom={'1px'} borderColor={'gray.300'} pb={5}>
        <div className="ql-snow">
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="ql-editor"
          ></div>
        </div>
      </Box>
      <Box mt={20}>
        <Heading mb={5}>Comments</Heading>
        <Textarea
          value={commentValue}
          onChange={e => setCommentValue(e.target.value)}
          placeholder="Write your comment here..."
        />
        <Button
          loadingText="Sending..."
          isLoading={buttonLoading}
          onClick={submitComment}
          mt={5}
          colorScheme={'blue'}
        >
          Send
        </Button>
      </Box>
      <Box mt={'50px'}>
        {comments.length ? (
          comments.map((comment, idx) => (
            <Comment comment={comment} key={idx} clubId={id} postId={postId} />
          ))
        ) : (
          <Text>There are no comments yet</Text>
        )}
      </Box>
    </Box>
  )
}

export default PostPage
