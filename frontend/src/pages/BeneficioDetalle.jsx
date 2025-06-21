import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCommonStore } from '../stores/commonStore';
import { useEffect, useState } from 'react';
import { Box, Typography, CardMedia, Chip, Grid } from '@mui/material';
import { toast } from 'react-toastify';

export const BeneficioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [beneficio, setBeneficio] = useState(null);

  const setIsLoading = useCommonStore((state) => state.setIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/beneficios/${id}`);
      const res_json = await res.json();
      console.log(res_json);
      if (res_json.error === false) {
        const data = res_json.data;
        setBeneficio(data);
        setIsLoading(false);
      } else {
        toast.error('No se encontró el beneficio solicitado', { autoClose: 1500 });
        navigate('/beneficios');
      }
    };
    fetchData();
  }, [id]);

  if (!beneficio) {
    return <div>Cargando...</div>;
  }
   return (
    <Grid container spacing={4} alignItems="flex-start">
      {/* Imagen: en xs=12 ocupa todo ancho (arriba), en md=6 ocupa mitad derecha */}
      <Grid xs={12} md={6} order={1}>
        <CardMedia
          component="img"
          height="300"
          image={beneficio.Imagens?.[0]?.url || 'https://via.placeholder.com/600x300?text=Sin+imagen'}
          alt={`Imagen ilustrativa de ${beneficio.comercio}`}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            objectFit: 'cover',
            maxWidth: '100%',
            mx: 'auto',
          }}
        />
      </Grid>

      {/* Contenido: en xs=12 debajo de imagen, en md=6 mitad izquierda */}
      <Grid xs={12} md={6} order={2}>
        <Typography variant="h4">{beneficio.comercio}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {beneficio.descripcion}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={beneficio.archivado ? 'Inactivo' : 'Activo'}
            color={beneficio.archivado ? 'warning' : 'success'}
            sx={{ mr: 1 }}
          />
          {beneficio.descuento && <Chip label={`${beneficio.descuento}% OFF`} color="primary" />}
        </Box>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Condiciones
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {beneficio.aclaratoria || 'Sin condiciones especiales'}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Métodos de Pago
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip label="Efectivo" color={beneficio.efectivo ? 'success' : 'default'} sx={{ mr: 1 }} />
          <Chip label="Tarjeta" color={beneficio.tarjeta ? 'success' : 'default'} sx={{ mr: 1 }} />
          <Chip label="PayClub" color={beneficio.payclub ? 'success' : 'default'} />
        </Box>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Categorías
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {beneficio.CategoriaGeneral?.nombre} / {beneficio.CategoriaSimple?.nombre}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Contacto
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Nombre: {beneficio.Contacto?.nombre} {beneficio.Contacto?.apellido}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Email: {beneficio.Contacto?.email}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Teléfono: {beneficio.Contacto?.telefono}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Instagram: @{beneficio.Contacto?.instagram}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Días de Atención
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo',
            'feriados',
          ].map((dia) => (
            <Chip
              key={dia}
              label={dia.charAt(0).toUpperCase() + dia.slice(1)}
              color={beneficio.Dium?.[dia] ? 'success' : 'default'}
            />
          ))}
        </Box>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          Visitas: {beneficio.visitas} · Última actualización:{' '}
          {new Date(beneficio.ultimaActualizacion).toLocaleDateString()}
        </Typography>
      </Grid>
    </Grid>
  );
};
