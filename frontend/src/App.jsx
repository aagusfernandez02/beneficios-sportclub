import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Button, Backdrop, CircularProgress } from '@mui/material';
import { useCommonStore } from './stores/commonStore';
import { Beneficios } from './pages/Beneficios';
import { BeneficioDetalle } from './pages/BeneficioDetalle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar/NavBar';

export default function App() {
  const isLoading = useCommonStore((state) => state.isLoading);

  return (
    <>
      {/* ============== SPINNER LOADING ============== */}
      {
        isLoading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="warning" size={120} thickness={1}/>
        </Backdrop>
      }
      

      <Router>
        <NavBar />

        <Container sx={{ padding: 4, marginTop: 6 }} maxWidth={false}>
          <Routes>
            <Route path="/" element={<Navigate to="/beneficios" replace />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/beneficios/:id" element={<BeneficioDetalle />} />
          </Routes>
        </Container>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
      />

    </>
  )
}
