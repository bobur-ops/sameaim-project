import { Box, Stack, Text } from '@chakra-ui/react'
import { dummyNews } from '../../../demo/data'
import NewsItem from './NewsItem'

const News = ({ news }) => {
  return (
    <Box mb={174}>
      <Text mb={61} fontSize="5xl" fontWeight="bold" align="center">
        News
      </Text>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="80px">
        {news.length ? (
          news.map(item => <NewsItem key={item.id} data={item} />)
        ) : (
          <Text fontSize={'3xl'}>There are no news</Text>
        )}
      </Box>
    </Box>
  )
}

export default News
