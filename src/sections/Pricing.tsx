import { Box, Container, Typography, Card, Button, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const tiers = [
  {
    title: "Scale",
    price: "999 PLN",
    period: "/miesiąc",
    desc: "Optymalne wdrożenie dla dynamicznie rozwijających się organizacji.",
    features: [
      "Autonomiczny agent konwersacyjny AI",
      "Dedykowana, głęboka baza wiedzy",
      "Analityka i mapowanie intencji leadów",
      "Wsparcie inżynieryjne SLA",
    ],
    buttonText: "Rozpocznij integrację",
    featured: false,
  },
  {
    title: "Enterprise",
    price: "2499 PLN",
    period: "/miesiąc",
    desc: "Kompleksowa infrastruktura automatyzacji procesów dla przedsiębiorstw.",
    features: [
      "Wielokanałowa architektura agentowa",
      "Pełna synchronizacja API z CRM / ERP",
      "Zaawansowane scenariusze decyzyjne",
      "Dedykowany inżynier AI i wsparcie 24/7",
    ],
    buttonText: "Wdrożenie Enterprise",
    featured: true,
  },
];

export default function Pricing() {
  const scrollToContact = () => {
    const element = document.getElementById("kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="cennik"
      sx={{
        py: 12,
        bgcolor: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ alignItems: "center", textAlign: "center", mb: 8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -1.5,
            }}
          >
            Transparentne modele rozliczeń
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#888888", maxWidth: 600, fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.6 }}
          >
            Inwestycja w automatyzację, która generuje mierzalny wzrost efektywności operacyjnej od pierwszego dnia wdrożenia.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
            maxWidth: 900,
            mx: "auto",
            justifyContent: "center",
          }}
        >
          {tiers.map((tier, i) => (
            <Card
              key={i}
              sx={{
                p: 5,
                bgcolor: "#040406",
                border: tier.featured
                  ? "1px solid #ffffff"
                  : "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "borderColor 0.3s ease",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.3)"
                }
              }}
            >
              <Stack
                spacing={3}
                sx={{ height: "100%", justifyContent: "space-between" }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}
                  >
                    {tier.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888888", minHeight: 40, lineHeight: 1.5 }}>
                    {tier.desc}
                  </Typography>

                  <Stack direction="row" sx={{ alignItems: "baseline", pt: 1 }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}
                    >
                      {tier.price}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666666", ml: 1, fontWeight: 500 }}
                    >
                      {tier.period}
                    </Typography>
                  </Stack>

                  <Stack spacing={2} sx={{ pt: 3 }}>
                    {tier.features.map((feature, idx) => (
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                        key={idx}
                      >
                        <CheckIcon sx={{ color: "#ffffff", fontSize: 16 }} />
                        <Typography variant="body2" sx={{ color: "#aaaaaa", fontWeight: 400 }}>
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={scrollToContact}
                  sx={{
                    mt: 4,
                    py: 1.6,
                    bgcolor: "#ffffff",
                    color: "#000000",
                    fontWeight: 600,
                    borderRadius: "6px",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#eaeaea",
                      boxShadow: "none",
                    },
                  }}
                >
                  {tier.buttonText}
                </Button>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}