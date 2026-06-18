import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Stack, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const menuItems = [
    { text: 'O nas', id: 'o-nas' },
    { text: 'Możliwości', id: 'mozliwosci' },
    { text: 'Cennik', id: 'cennik' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'rgba(0, 0, 0, 0.7)', 
          backdropFilter: 'blur(20px)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 60, md: 70 }, px: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 800, letterSpacing: 1, color: '#ffffff', cursor: 'pointer', fontSize: { xs: '1.1rem', md: '1.25rem' } }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            CODEAST
          </Typography>

          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                sx={{ color: '#888', '&:hover': { color: '#fff' }, textTransform: 'none', fontWeight: 500 }}
              >
                {item.text}
              </Button>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button 
              variant="contained" 
              size="small" 
              onClick={() => scrollToSection('kontakt')}
              sx={{ 
                display: { xs: 'none', sm: 'inline-flex' }, 
                bgcolor: '#ffffff',
                color: '#000000',
                fontWeight: 600,
                px: 3,
                py: 0.8,
                '&:hover': { bgcolor: '#eaeaea' }
              }}
            >
              KONTAKT
            </Button>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: '#ffffff', ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: 300,
              bgcolor: '#000000',
              borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
              p: 3
            }
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#ffffff' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 2 }}>
              <ListItemButton 
                onClick={() => scrollToSection(item.id)}
                sx={{ borderRadius: '8px', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <ListItemText 
                  primary={item.text} 
                  slotProps={{ primary: { style: { color: '#ffffff', fontSize: '1.2rem', fontWeight: 500 } } }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
          
          <ListItem disablePadding sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => scrollToSection('kontakt')}
              sx={{
                bgcolor: '#ffffff',
                color: '#000000',
                fontWeight: 600,
                py: 1.5,
                borderRadius: '8px',
                '&:hover': { bgcolor: '#eaeaea' }
              }}
            >
              KONTAKT
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}