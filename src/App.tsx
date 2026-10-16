import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ArtistPage } from './pages/ArtistPage'
import { HomePage } from './pages/HomePage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists/:id" element={<ArtistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
