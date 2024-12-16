// components/FileUploadForm.tsx
import React from 'react'

interface FileUploadFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  onSubmit,
  children,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      {children}
      <button type="submit" className="btn btn-primary btn-block">
        Upload
      </button>
    </form>
  )
}

export default FileUploadForm
