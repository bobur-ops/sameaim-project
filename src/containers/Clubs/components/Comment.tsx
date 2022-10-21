import { Avatar, Box, HStack, Icon, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi'
import { getClubApi, getPostApi, updateClubApi } from '../../../api/client'
import { useGlobalContext } from '../../../context/GlobalContext'

const Comment = ({ comment, clubId, postId }) => {
  const author = JSON.parse(comment.author)
  const { user } = useGlobalContext()
  const [commentLikes, setCommentLikes] = useState(comment?.likes)

  const hasLiked = commentLikes?.some(like => like === user?.userId)

  const likeComment = async () => {
    if (hasLiked) {
      setCommentLikes(prev => prev.filter(item => item !== user.userId))
    } else {
      setCommentLikes(prev => [...prev, user.userId])
    }
    submtLike()
  }

  const submtLike = async () => {
    try {
      const club = await getClubApi(clubId)
      const post = await getPostApi(clubId, postId)
      let newComments = []
      if (hasLiked) {
        newComments = post.data.comments.map(item => ({
          ...item,
          likes:
            item.commentId === comment.commentId
              ? item.likes.filter(like => like !== user.userId)
              : [...item.likes]
        }))
      } else {
        newComments = post.data.comments.map(item => ({
          ...item,
          likes:
            item.commentId === comment.commentId
              ? [user.userId, ...item.likes]
              : [...item.likes]
        }))
      }

      const newPosts = club.data.posts.map(item => ({
        ...item,
        comments: newComments
      }))

      const updatedClub = {
        ...club.data,
        posts: newPosts
      }
      const res = await updateClubApi(updatedClub, club.data._id)
      toast.success('Ready')
    } catch (error) {
      console.log(error)
    }
  }

  const Likes = () => {
    return hasLiked ? (
      <HStack>
        <Icon as={HiThumbUp} />
        <Text>{commentLikes?.length}</Text>
      </HStack>
    ) : (
      <HStack>
        <Icon as={HiOutlineThumbUp} />
        <Text>{commentLikes?.length}</Text>
      </HStack>
    )
  }

  return (
    <Box mb={'50px'}>
      <HStack mb={0} ml={-2.5}>
        <Avatar size="xs" name={author?.fullName} />
        <Text fontSize={'sm'}>{author?.fullName}</Text>
      </HStack>
      <Box pl={5} borderLeft={'2px'} borderColor={'gray.300'}>
        <Text>{comment.text}</Text>
        <HStack mt={5} cursor={'pointer'} onClick={likeComment}>
          <Likes />
        </HStack>
      </Box>
    </Box>
  )
}

export default Comment
