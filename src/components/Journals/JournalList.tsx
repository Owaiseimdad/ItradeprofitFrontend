import React from 'react'

interface JournalListProps {
  entries: { date: string; content: string }[]
}

const JournalList: React.FC<JournalListProps> = ({ entries }) => {
  return (
    <div className="journal-list">
      {entries.length > 0 ? (
        entries.map((entry, index) => (
          <div key={index} className="journal-entry">
            <p>{entry.content}</p>
          </div>
        ))
      ) : (
        <p>No entries for this date.</p>
      )}
    </div>
  )
}

export default JournalList
