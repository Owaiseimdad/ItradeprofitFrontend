import React, { forwardRef } from 'react'

interface FileInputProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// Use forwardRef to pass down the ref to the input
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onFileChange }) => (
    <div className="form-group">
      <input
        type="file"
        accept=".csv"
        onChange={onFileChange}
        className="form-control"
      />
    </div>
  ),
)

// Set the display name for better debugging
FileInput.displayName = 'FileInput'

export default FileInput
