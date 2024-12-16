import React, { useState } from 'react'
import JournalHeader from '../components/Journals/JournalHeader'
import JournalList from '../components/Journals/JournalList'
import JournalForm from '../components/Journals/JournalForm'
import '../views/Journals.css'

const Journals: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const [entries, setEntries] = useState<{ date: string; content: string }[]>(
    [],
  )

  const addEntry = (content: string) => {
    const newEntry = { date: date.toDateString(), content }
    setEntries([...entries, newEntry])
  }

  return (
    <div className="journals-container">
      <JournalHeader date={date} setDate={setDate} />
      <JournalForm addEntry={addEntry} />
      <JournalList
        entries={entries.filter((entry) => entry.date === date.toDateString())}
      />
    </div>
  )
}

export default Journals
