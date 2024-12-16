import React from 'react'

interface JournalHeaderProps {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const JournalHeader: React.FC<JournalHeaderProps> = ({ date, setDate }) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value))
  }

  return (
    <div className="journal-header">
      <h2>Journal Entries</h2>
      <input
        type="date"
        value={date.toISOString().substr(0, 10)}
        onChange={handleDateChange}
      />
    </div>
  )
}

export default JournalHeader
