import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#000000', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        pt: 6, 
        pb: 4,
        position: 'relative',
        zIndex: 10
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
            mb: 4 
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: 360 }}>
            <Box 
              onClick={handleScrollToTop}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            >
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#8b5cf6" />
                    <stop offset="100%" stop-color="#6366f1" />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="8" fill="#121216" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
                <path d="M 22 9 C 14 9, 10 12, 10 16 C 10 20, 14 23, 22 23 L 17 19 C 13 19, 13 13, 17 13 Z" fill="url(#footerPurpleGradient)" />
                <circle cx="21" cy="16" r="2" fill="#ffffff" />
              </svg>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, color: '#ffffff' }}>
                CODEAST
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Projektowanie i wdrażanie zaawansowanej infrastruktury agentowej AI. Automatyzujemy procesy, skalując efektywność nowoczesnych przedsiębiorstw.
            </Typography>
          </Stack>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 4, sm: 8 }} 
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="#ffffff" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                LOKALIZACJA
              </Typography>
              <Typography variant="caption" color="text.secondary">Warszawa, Polska</Typography>
              <Typography variant="caption" color="text.secondary">Działamy globalnie / Remote</Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" color="#ffffff" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                KONTAKT DIRECT
              </Typography>
              <Link 
                href="mailto:contact@codeast.pl" 
                variant="caption" 
                sx={{ color: '#8b5cf6', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                contact@codeast.pl
              </Link>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', mb: 3 }} />

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {currentYear} CODEAST. Wszelkie prawa zastrzeżone.
          </Typography>
          
          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.5 }}>
            Next-Gen AI Solutions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}