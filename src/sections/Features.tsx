import { Box, Container, Typography, Card, Stack } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const features = [
  {
    title: 'Nieprzerwana efektywność',
    desc: 'Systemy agentowe AI eliminują opóźnienia operacyjne. Obsługują setki wielokanałowych zapytań jednocześnie, bez przestojów i utraty jakości.',
    icon: <SupportAgentIcon sx={{ color: '#ffffff', fontSize: 24 }} />
  },
  {
    title: 'Subsekundowy czas odpowiedzi',
    desc: 'Reakcja na poziomie poniżej jednej sekundy gwarantuje natychmiastowe zaangażowanie potencjalnego kontrahenta, radykalnie podnosząc współczynnik konwersji.',
    icon: <FlashOnIcon sx={{ color: '#ffffff', fontSize: 24 }} />
  },
  {
    title: 'Zaawansowana analityka',
    desc: 'Pełna transparentność i mapowanie intencji. Śledź wydajność modeli i zobacz dokładny wpływ automatyzacji na przychody przedsiębiorstwa.',
    icon: <QueryStatsIcon sx={{ color: '#ffffff', fontSize: 24 }} />
  }
];

export default function Features() {
  return (
    <Box id="mozliwosci" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#000000', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4
          }}
        >
          {features.map((f, i) => (
            <Card 
              key={i}
              sx={{ 
                p: { xs: 3, sm: 4 }, 
                bgcolor: '#040406', 
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: 'none',
                '&:hover': { 
                  borderColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-6px)'
                }
              }}
            >
              <Stack spacing={2.5}>
                <Box 
                  sx={{ 
                    width: 44, 
                    height: 44, 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: -0.5, color: '#ffffff', fontSize: '1.25rem' }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888888', lineHeight: 1.65, fontSize: '0.9rem' }}>
                  {f.desc}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}