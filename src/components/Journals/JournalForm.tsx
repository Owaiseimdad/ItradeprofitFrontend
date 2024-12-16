import React, { useState } from 'react'

interface JournalFormProps {
  addEntry: (content: string) => void
}

const JournalForm: React.FC<JournalFormProps> = ({ addEntry }) => {
  const [content, setContent] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (content.trim()) {
      addEntry(content)
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your journal entry here..."
        required
      />
      <button type="submit">Save Entry</button>
    </form>
  )
}

export default JournalForm
