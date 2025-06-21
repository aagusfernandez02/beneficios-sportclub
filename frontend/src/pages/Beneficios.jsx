import { useEffect, useState } from 'react'
import { useCommonStore } from '../stores/commonStore';
import { Pagination, TextField, Grid, Box, Typography, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import { BeneficioCard } from '../components/BeneficioCard/BeneficioCard';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './Beneficios.scss';
import { useNavigate } from 'react-router-dom';

export const Beneficios = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filtroActivo, setFiltroActivo] = useState(null);

  const totalPages = useCommonStore((state) => state.totalPages);
  const beneficios = useCommonStore((state) => state.beneficios);
  const setIsLoading = useCommonStore((state) => state.setIsLoading);
  const page = useCommonStore((state) => state.page);
  const setPage = useCommonStore((state) => state.setPage);
  const setComercio = useCommonStore((state) => state.setComercio);
  const fetchBeneficios = useCommonStore((state) => state.fetchBeneficios);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchBeneficios();
      setIsLoading(false);
    }
    fetchData()
  }, []);


  const handleChangePage = async (page) => {
    setIsLoading(true);
    setPage(page);
    await fetchBeneficios();
    setIsLoading(false);
  }

  const handleClickSearch = async () => {
    setIsLoading(true);
    setPage(1);
    setComercio(search);
    await fetchBeneficios();
    setIsLoading(false);
  }

  const handleClickClear = async () => {
    setIsLoading(true);
    setSearch('');
    setPage(1);
    setComercio('');
    await fetchBeneficios();
    setIsLoading(false);
  }

  const handleClickCard = (id) => {
    navigate(`/beneficios/${id}`);
  };

  const toggleFiltro = async (tipo) => {
    const nuevoFiltro = filtroActivo === tipo ? null : tipo;
    setFiltroActivo(nuevoFiltro);

    // // Derivar valor de activo
    // const nuevoActivo = nuevoFiltro === 'activos' ? true :
    //                     nuevoFiltro === 'inactivos' ? false :
    //                     null;

    // setIsLoading(true);
    // setActivo(nuevoActivo);
    // await fetchBeneficios();
    // setIsLoading(false);
  };
  
  return (
    <Box sx={{ p: 2 }} >
      <Typography variant="h3" sx={{ mb: 3, textAlign: 'center' }}>
        Beneficios SportClub
      </Typography>

      <Box className="search-box">
        <IconButton
          color="secondary"
          onClick={() => handleClickClear()}
        >
          <ClearIcon />
        </IconButton>
        <TextField
          label="Buscar por comercio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
        />
        <IconButton
          color="primary"
          onClick={() => handleClickSearch()}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filtroActivo === 'activos'}
              onChange={() => toggleFiltro('activos')}
              color='secondary'
            />
          }
          label="Activos"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filtroActivo === 'inactivos'}
              onChange={() => toggleFiltro('inactivos')}
              color='secondary'
            />
          }
          label="Inactivos"
        />
      </Box>

      <Grid container spacing={2} justifyContent={'space-around'}>
        { beneficios.map((beneficio) => (
            <Grid key={beneficio.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} className='beneficio-card' onClick={() => handleClickCard(beneficio.id)}>
              <BeneficioCard beneficio={beneficio} />
            </Grid>
          ))
        }
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(e, value) => handleChangePage(value)}
          page={page}
        />
      </Box>
    </Box>
  )
}