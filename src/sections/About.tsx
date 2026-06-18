import { Box, Container, Typography, Stack } from '@mui/material';

export default function About() {
  return (
    <Box id="o-nas" sx={{ py: 12, bgcolor: '#000000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
            gap: 8,
            alignItems: 'center'
          }}
        >
          <Stack spacing={3}>
            <Typography variant="overline" sx={{ color: '#ffffff', opacity: 0.5, letterSpacing: 3, fontWeight: 600, fontSize: '0.75rem' }}>
              DEPLOYNMENT & INTEGRATION
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, color: '#ffffff', letterSpacing: -1.5, lineHeight: 1.1 }}>
              Codeast. Architekci autonomicznych systemów biznesowych
            </Typography>
            <Typography variant="body1" sx={{ color: '#888888', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Jesteśmy agencją inżynieryjną nowej generacji. Specjalizujemy się w projektowaniu, budowaniu i wdrażaniu zaawansowanej infrastruktury sztucznej inteligencji, która płynnie integruje się z systemami operacyjnymi przedsiębiorstw.
            </Typography>
            <Typography variant="body1" sx={{ color: '#888888', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Eliminujemy przestarzałe, powtarzalne schematy pracy. Nasze inteligentne systemy agentowe, zasilane najnowszymi modelami językowymi i semantycznymi bazami wiedzy, automatyzują interakcje z klientami, koordynują procesy decyzyjne i maksymalizują konwersję 24/7. Sprawiamy, że AI staje się kluczowym motorem rentowności Twojej firmy.
            </Typography>
          </Stack>

          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 3,
              bgcolor: '#040406',
              p: 4,
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.04)'
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>100%</Typography>
              <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>Autonomii procesów</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>&lt; 0.4s</Typography>
              <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>Czas reakcji architektury</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>24/7</Typography>
              <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>Ciągłość operacyjna</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>Maksymalne</Typography>
              <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>ROI i skalowalność</Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}