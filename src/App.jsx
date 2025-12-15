
import { Routes, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <>
      <nav>
        <b>CleanMatch</b>
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/support">Support</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </>
  )
}

const Home = () => <h1>CleanMatch – US Ready Platform</h1>
const Pricing = () => <p>Plans: $4 / $12 / $29</p>
const Booking = () => <p>Booking system ready</p>
const Messages = () => <p>Messages system ready</p>
const Support = () => <p>Support: cleanmatchbynilba@gmail.com</p>
