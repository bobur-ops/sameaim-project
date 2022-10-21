import dynamic from 'next/dynamic'
import { useState } from 'react'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, 'code-block'],
    [{ size: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      'direction',
      { align: [] },
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: true
  }
}
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
  'align',
  'direction',
  'color',
  'background',
  'script',
  'super',
  'sub'
]

const TextEditor = ({ setContentValue, value }) => {
  return (
    <QuillNoSSRWrapper
      bounds={'.app'}
      modules={modules}
      formats={formats}
      onChange={setContentValue}
      placeholder="Write your post here. You can edit your text by tools above"
      value={value}
    />
  )
}

export default TextEditor
