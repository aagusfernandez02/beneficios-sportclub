import { Card, CardMedia, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useEffect, useState } from 'react';

export const BeneficioCard = ({ beneficio }) => {
    const [isFavorito, setIsFavorito] = useState(false);

    const {
        id,
        comercio,
        descripcion,
        Imagens,
        archivado,
        descuento,
    } = beneficio;


    useEffect(() => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        setIsFavorito(favoritos.includes(id));
    }, [id]);

    const toggleFavorito = (e) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        let nuevosFavoritos;

        if (favoritos.includes(id)) {
            nuevosFavoritos = favoritos.filter(favId => favId !== id);
        } else {
            nuevosFavoritos = [...favoritos, id];
        }

        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        setIsFavorito(!isFavorito);
    };

    const imagenUrl = Imagens?.[0]?.url || 'https://via.placeholder.com/400x200?text=Sin+imagen';


    return (

        <Card sx={{ m: 2 }} className='beneficio-card'>
            {imagenUrl && (
                <CardMedia
                    component="img"
                    height="140"
                    image={imagenUrl}
                    alt={beneficio.comercio}
                    loading="lazy"
                />
            )}
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                        {comercio}
                    </Typography>
                    <Chip
                        label={archivado ? 'Inactivo' : 'Activo'}
                        color={archivado ? 'warning' : 'success'}
                        size="small"
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                        {descripcion}
                    </Typography>
                    {descuento && (
                        <   Chip
                            label={`${descuento}% OFF`}
                            color="primary"
                            size="small"
                        />
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorito();
                        }}
                        sx={{ color: 'secondary.main' }}
                        aria-label={isFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        {isFavorito ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};
