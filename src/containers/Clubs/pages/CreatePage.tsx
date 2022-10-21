import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createPostApi, getUserApi } from '../../../api/client'
import TextEditor from '../../../components/TextEditor'

import { uniqueId } from '../../../utils/uniqueId'

const CreatePage = ({ clubID, authorId }) => {
  const [title, setTitle] = useState('')
  const [contentValue, setContentValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [description, setDescription] = useState('')

  const router = useRouter()

  const { id } = router.query

  const getMyUser = async () => {
    setPageLoading(true)
    const cookieUser = getCookie('user')
    if (cookieUser) {
      const res = await getUserApi(cookieUser)
      if (res.data.userId !== authorId) {
        router.push('/')
      }
      setPageLoading(false)
    } else {
      setPageLoading(false)
      router.push('/')
    }
  }

  useEffect(() => {
    getMyUser()
  }, [])

  const isDisabled = () => {
    if (title && contentValue) {
      return false
    } else {
      return true
    }
  }

  const submitNewPost = async () => {
    const data = {
      title,
      content: contentValue,
      description,
      postId: uniqueId('post')
    }

    try {
      setLoading(true)
      const res = await createPostApi(clubID, data)
      setLoading(false)
      router.push(`/clubs/${id}`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(`${error.response.data.message}`)
    }
  }

  if (pageLoading) return <div></div>

  return (
    <Box>
      <Heading mb={10}>New Post</Heading>
      <Stack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Title of your post </FormLabel>
          <Input
            value={title}
            type="text"
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description for your post</FormLabel>
          <Input
            value={description}
            type="text"
            onChange={e => setDescription(e.target.value)}
          />
          <FormHelperText>
            It will be displayed in a list of posts, so your description should
            be eye-catching
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <TextEditor value={contentValue} setContentValue={setContentValue} />
        </FormControl>

        <Button
          onClick={submitNewPost}
          colorScheme={'blue'}
          disabled={isDisabled()}
          isLoading={loading}
          loadingText="Creating post..."
        >
          Create Post
        </Button>
      </Stack>
    </Box>
  )
}

export default CreatePage
