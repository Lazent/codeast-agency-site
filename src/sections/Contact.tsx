import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    msg: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = "service_c4s37pd"; 
    const TEMPLATE_ID = "template_v9s9ers";
    const PUBLIC_KEY = "efYB30C4gl-4ORugG";

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        alert(`Dziękujemy ${formData.name}! Wiadomość została pomyślnie wysłana.`);
        setFormData({ name: "", company: "", email: "", msg: "" });
      })
      .catch((err) => {
        console.error("Błąd EmailJS:", err);
        alert("Coś poszło nie tak podczas wysyłania. Spróbuj ponownie później.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      id="kontakt"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Container maxWidth="sm">
        <Stack
          spacing={2}
          sx={{ alignItems: "center", textAlign: "center", mb: { xs: 4, md: 6 } }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            Inicjuj transformację
          </Typography>
          <Typography variant="h5" sx={{ color: "#888888", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.6 }}>
            Zostaw kontakt. Przeanalizujemy architekturę Twoich procesów i zaproponujemy dedykowaną strategię wdrożenia systemów AI.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} sx={{ px: { xs: 1, sm: 0 } }}>
          <Stack spacing={3}>
            <TextField
              label="Imię i Nazwisko"
              required
              fullWidth
              disabled={loading}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              slotProps={{
                inputLabel: { style: { color: "#888888" } },
                input: { style: { color: "#ffffff" } },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#ffffff" },
                },
              }}
            />
            <TextField
              label="Nazwa firmy / Organizacja"
              required
              fullWidth
              disabled={loading}
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              slotProps={{
                inputLabel: { style: { color: "#888888" } },
                input: { style: { color: "#ffffff" } },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#ffffff" },
                },
              }}
            />
            <TextField
              label="Biznesowy adres e-mail"
              type="email"
              required
              fullWidth
              disabled={loading}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              slotProps={{
                inputLabel: { style: { color: "#888888" } },
                input: { style: { color: "#ffffff" } },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#ffffff" },
                },
              }}
            />
            <TextField
              label="Opisz wyzwania operacyjne w Twoim biznesie"
              multiline
              rows={4}
              fullWidth
              disabled={loading}
              value={formData.msg}
              onChange={(e) =>
                setFormData({ ...formData, msg: e.target.value })
              }
              slotProps={{
                inputLabel: { style: { color: "#888888" } },
                input: { style: { color: "#ffffff" } },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#ffffff" },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.8,
                mt: 2,
                bgcolor: "#ffffff",
                color: "#000000",
                fontWeight: 600,
                borderRadius: "6px",
                textTransform: "none",
                "&:hover": { bgcolor: "#eaeaea" },
              }}
            >
              {loading ? "Wysyłanie zapytania..." : "Konsultacja technologiczna"}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}