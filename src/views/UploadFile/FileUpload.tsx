import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileUploadForm from '../../components/File/FileUploadForm'
import FileInput from '../../components/File/FileInput'
import useFileUpload from '../../hooks/useFileUpload'

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const { handleSubmit } = useFileUpload()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('onSubmit is called')
    const str = 'dasda'
    event.preventDefault()
    if (file) {
      await handleSubmit(file, str)
      setFile(null) // Reset the file state
      if (fileInputRef.current) {
        fileInputRef.current.value = '' // Clear the input value
      }
    }
  }

  return (
    <div className="container mt-5">
      <FileUploadForm onSubmit={onSubmit}>
        <FileInput onFileChange={handleFileChange} ref={fileInputRef} />
      </FileUploadForm>
    </div>
  )
}

export default FileUpload
