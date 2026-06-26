import { useState, useMemo } from 'react'
import { Box, Typography, TextField, Button, Chip } from '@mui/material'

type Category = 'cs' | 'sql'

interface QuestionItem {
  cat: Category
  q: string
  keys: string[]
  a: string
}

const QUESTIONS: QuestionItem[] = [
  { cat: 'cs', q: 'Jaka jest różnica między typem wartościowym (value type) a referencyjnym (reference type) w C#?',
    keys: ['stos', 'stack', 'wskaźnik', 'referenc', 'kopi'],
    a: 'Typy wartościowe (struct, int, bool…) przechowują dane bezpośrednio i są kopiowane przy przypisaniu, najczęściej na stosie. Typy referencyjne (class, array, string…) przechowują referencję (wskaźnik) do danych na hercie (heap) — przy przypisaniu kopiowana jest tylko ta referencja, nie same dane.' },
  { cat: 'cs', q: 'Co to jest boxing i unboxing?',
    keys: ['boxing', 'heap', 'konwers', 'owin'],
    a: 'Boxing to konwersja typu wartościowego na typ referencyjny (object) — wartość zostaje „owinięta” i umieszczona na hercie. Unboxing to operacja odwrotna — wyciągnięcie wartości z obiektu z powrotem do typu wartościowego.' },
  { cat: 'cs', q: 'Wymień 4 filary programowania obiektowego (OOP).',
    keys: ['dziedzicz', 'abstrakc', 'polimorf', 'enkapsul', 'hermetyz'],
    a: 'Enkapsulacja (hermetyzacja), dziedziczenie, polimorfizm, abstrakcja.' },
  { cat: 'cs', q: 'Jaka jest różnica między interfejsem a klasą abstrakcyjną?',
    keys: ['wielokrotn', 'implement', 'dziedzicz', 'konstruktor', 'jedn'],
    a: 'Klasa abstrakcyjna może zawierać implementację metod, pola i konstruktor, ale klasa może dziedziczyć tylko po jednej klasie abstrakcyjnej. Interfejs zawiera (klasycznie) tylko sygnatury metod/właściwości bez implementacji, a klasa może implementować wiele interfejsów jednocześnie.' },
  { cat: 'cs', q: 'Co robi Garbage Collector w .NET?',
    keys: ['pamię', 'automatyczn', 'heap', 'nieużywan', 'zwalni'],
    a: 'GC automatycznie zarządza pamięcią — zwalnia pamięć zajmowaną przez obiekty na hercie, które nie mają już żadnych aktywnych referencji, dzięki czemu programista nie musi robić tego ręcznie.' },
  { cat: 'cs', q: 'Czym różni się String od StringBuilder?',
    keys: ['niemutowal', 'immutab', 'mutowal', 'wydajn', 'nowy obiekt'],
    a: 'String jest niemutowalny (immutable) — każda modyfikacja tworzy nowy obiekt w pamięci. StringBuilder jest mutowalny i pozwala efektywnie modyfikować ciąg znaków bez tworzenia nowych obiektów, co jest szybsze przy wielu operacjach na tekście.' },
  { cat: 'cs', q: 'Co to jest async/await i do czego służy?',
    keys: ['asynchron', 'wątk', 'blok', 'Task'],
    a: 'Async/await pozwala pisać kod asynchroniczny, który nie blokuje wątku podczas czekania na operację (np. zapytanie do bazy danych albo do API). Metoda oznaczona async zwraca Task lub Task<T>, a await czeka na jej zakończenie bez blokowania wątku.' },
  { cat: 'cs', q: 'Czym różni się IEnumerable od IQueryable?',
    keys: ['baz', 'SQL', 'pamię', 'wykon'],
    a: 'IEnumerable wykonuje operacje (np. filtrowanie LINQ) po stronie aplikacji, na danych już wczytanych do pamięci. IQueryable buduje zapytanie (np. SQL), które jest wykonywane po stronie bazy danych — efektywniej dla dużych zbiorów danych.' },
  { cat: 'cs', q: 'Co oznacza zasada SOLID? Wymień litery i ich znaczenie.',
    keys: ['single', 'open', 'liskov', 'interface', 'dependency'],
    a: 'S — Single Responsibility, O — Open/Closed, L — Liskov Substitution, I — Interface Segregation, D — Dependency Inversion. To pięć zasad dobrego projektowania klas i zależności w OOP.' },
  { cat: 'cs', q: 'Do czego służy blok try-catch-finally i kiedy wykonuje się finally?',
    keys: ['wyjątk', 'exception', 'zawsze', 'zwolni'],
    a: 'Try zawiera kod, który może rzucić wyjątek, catch obsługuje konkretny typ wyjątku, a finally wykonuje się zawsze — niezależnie od tego, czy wyjątek wystąpił czy nie — najczęściej do zwolnienia zasobów (np. zamknięcia połączenia).' },
  { cat: 'sql', q: 'Jaka jest różnica między INNER JOIN i LEFT JOIN?',
    keys: ['dopas', 'null', 'wszystkie wiersze'],
    a: 'INNER JOIN zwraca tylko wiersze mające dopasowanie w obu tabelach. LEFT JOIN zwraca wszystkie wiersze z lewej tabeli, a jeśli nie ma dopasowania w prawej tabeli, kolumny z prawej tabeli będą zawierać NULL.' },
  { cat: 'sql', q: 'Czym różni się PRIMARY KEY od FOREIGN KEY?',
    keys: ['unikaln', 'odnos', 'inną tabel', 'relacj'],
    a: 'PRIMARY KEY jednoznacznie identyfikuje wiersz w tabeli (musi być unikalny i nie może być NULL). FOREIGN KEY to kolumna, która odnosi się do PRIMARY KEY w innej tabeli, tworząc relację między tabelami.' },
  { cat: 'sql', q: 'Do czego służy indeks (INDEX) w bazie danych?',
    keys: ['szybsz', 'wyszukiwa', 'przyspiesz'],
    a: 'Indeks przyspiesza wyszukiwanie i sortowanie danych w tabeli, działając podobnie do spisu treści w książce — kosztem dodatkowego miejsca na dysku i nieco wolniejszych operacji INSERT/UPDATE/DELETE.' },
  { cat: 'sql', q: 'Jaka jest różnica między WHERE i HAVING?',
    keys: ['grup', 'agreg', 'GROUP BY'],
    a: 'WHERE filtruje wiersze przed grupowaniem (GROUP BY), natomiast HAVING filtruje wynik już po grupowaniu — najczęściej na podstawie funkcji agregujących, np. COUNT czy SUM.' },
  { cat: 'sql', q: 'Co oznacza skrót ACID w kontekście transakcji?',
    keys: ['atomic', 'consist', 'isolat', 'durab'],
    a: 'Atomicity (atomowość) — transakcja wykonuje się w całości albo wcale. Consistency (spójność) — baza zawsze zostaje w poprawnym stanie. Isolation (izolacja) — transakcje nie wpływają na siebie wzajemnie. Durability (trwałość) — po zatwierdzeniu zmiany są trwałe, nawet po awarii.' },
  { cat: 'sql', q: 'Co to jest procedura składowana (stored procedure) w T-SQL?',
    keys: ['zapisan', 'wielokrotn', 'wykona', 'parametr'],
    a: 'To zapisany w bazie danych zestaw instrukcji SQL, który można wielokrotnie wywoływać (np. EXEC nazwa_procedury), opcjonalnie z parametrami, bez przesyłania całego kodu SQL z aplikacji każdym razem.' },
  { cat: 'sql', q: 'Jaka jest różnica między DELETE, TRUNCATE i DROP?',
    keys: ['wiersz', 'struktur', 'cał'],
    a: 'DELETE usuwa wybrane wiersze (można użyć WHERE, można wycofać w transakcji). TRUNCATE usuwa wszystkie wiersze z tabeli szybciej, bez możliwości użycia WHERE. DROP usuwa całą strukturę tabeli z bazy danych.' },
  { cat: 'sql', q: 'Co robi GROUP BY w SQL?',
    keys: ['grup', 'agreg', 'wspóln'],
    a: 'GROUP BY grupuje wiersze mające tę samą wartość w wybranej kolumnie (lub kolumnach) w jedną grupę — najczęściej używane razem z funkcjami agregującymi, jak COUNT, SUM, AVG, MAX, MIN.' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const COLORS = {
  bg: '#14141c',
  panel: '#1b1c27',
  line: '#232433',
  text: '#e7e6f0',
  dim: '#8a8a9e',
  cs: '#9b7bff',
  sql: '#4fc3f7',
  ok: '#5ee69c',
  bad: '#ff6e6e',
}

type Result = 'ok' | 'bad' | undefined

export default function InterviewPrep() {
  const [order, setOrder] = useState<number[]>(() => shuffle(QUESTIONS.map((_, i) => i)))
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)

  const finished = idx >= order.length
  const current = useMemo(() => (finished ? undefined : QUESTIONS[order[idx]]), [order, idx, finished])

  const checkAnswer = (text: string, item: QuestionItem) => {
    const norm = text.toLowerCase()
    return item.keys.some((k) => norm.includes(k.toLowerCase()))
  }

  const handleCheck = () => {
    if (!current) return
    const correct = answer.trim().length > 0 && checkAnswer(answer, current)
    setLastCorrect(correct)
    setResults((prev) => {
      const next = [...prev]
      next[idx] = correct ? 'ok' : 'bad'
      return next
    })
    if (correct) setScore((s) => s + 1)
    setRevealed(true)
  }

  const handleSkip = () => {
    setLastCorrect(false)
    setResults((prev) => {
      const next = [...prev]
      next[idx] = 'bad'
      return next
    })
    setRevealed(true)
  }

  const handleNext = () => {
    setRevealed(false)
    setAnswer('')
    setIdx((i) => i + 1)
  }

  const handleRestart = () => {
    setOrder(shuffle(QUESTIONS.map((_, i) => i)))
    setIdx(0)
    setScore(0)
    setResults([])
    setAnswer('')
    setRevealed(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: COLORS.bg,
        color: COLORS.text,
        display: 'flex',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 640 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5, fontFamily: 'monospace', fontSize: 13, color: COLORS.dim }}>
          <span>{`// ${current ? (current.cat === 'cs' ? 'interview_prep.cs' : 'interview_prep.sql') : 'wynik.md'}`}</span>
          <span>{finished ? `${order.length} / ${order.length}` : `${idx + 1} / ${order.length}`}</span>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 3 }}>
          {order.map((_, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: 5,
                borderRadius: 1,
                bgcolor:
                  results[i] === 'ok' ? COLORS.ok :
                  results[i] === 'bad' ? COLORS.bad :
                  i === idx && !finished ? COLORS.dim :
                  COLORS.line,
                transition: 'background-color .25s ease',
              }}
            />
          ))}
        </Box>

        <Box sx={{ bgcolor: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 2.5, p: { xs: 3, sm: 3.5 } }}>
          {!finished && current ? (
            <>
              <Chip
                label={current.cat === 'cs' ? 'C#' : 'SQL / T-SQL'}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: current.cat === 'cs' ? 'rgba(155,123,255,.15)' : 'rgba(79,195,247,.15)',
                  color: current.cat === 'cs' ? COLORS.cs : COLORS.sql,
                  fontFamily: 'monospace',
                  fontSize: 11,
                }}
              />
              <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: COLORS.dim, mb: 0.75 }}>
                Pytanie {idx + 1}
              </Typography>
              <Typography sx={{ fontSize: 18, lineHeight: 1.5, mb: 2.5 }}>{current.q}</Typography>

              <TextField
                multiline
                minRows={3}
                fullWidth
                placeholder="Wpisz swoją odpowiedź…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={revealed}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: COLORS.bg,
                    color: COLORS.text,
                    '& fieldset': { borderColor: COLORS.line },
                    '&:hover fieldset': { borderColor: COLORS.cs },
                    '&.Mui-focused fieldset': { borderColor: COLORS.cs },
                  },
                }}
              />

              {!revealed && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1.75 }}>
                  <Button onClick={handleSkip} sx={{ color: COLORS.dim, borderColor: COLORS.line }} variant="outlined">
                    Pomiń
                  </Button>
                  <Button onClick={handleCheck} sx={{ bgcolor: COLORS.cs, color: '#0e0d16', '&:hover': { bgcolor: COLORS.cs, opacity: 0.88 } }} variant="contained">
                    Sprawdź
                  </Button>
                </Box>
              )}

              {revealed && (
                <Box
                  sx={{
                    mt: 2.25,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: lastCorrect ? 'rgba(94,230,156,.1)' : 'rgba(255,110,110,.1)',
                    border: `1px solid ${lastCorrect ? 'rgba(94,230,156,.3)' : 'rgba(255,110,110,.3)'}`,
                  }}
                >
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '.05em', color: lastCorrect ? COLORS.ok : COLORS.bad, mb: 1 }}>
                    {lastCorrect ? 'DOBRZE' : 'NIE DOKŁADNIE'}
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: 1.55 }}>{current.a}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleNext} sx={{ bgcolor: COLORS.cs, color: '#0e0d16', '&:hover': { bgcolor: COLORS.cs, opacity: 0.88 } }} variant="contained">
                      {idx + 1 < order.length ? 'Dalej →' : 'Zobacz wynik →'}
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: COLORS.dim, mb: 1 }}>WYNIK KOŃCOWY</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: 46, color: COLORS.cs, mb: 0.5 }}>
                {score}
                <Box component="span" sx={{ color: COLORS.dim, fontSize: 24 }}>/{order.length}</Box>
              </Typography>
              <Typography sx={{ color: COLORS.dim, fontSize: 14, mb: 3 }}>
                {Math.round((score / order.length) * 100)}% poprawnych odpowiedzi
              </Typography>
              <Button onClick={handleRestart} sx={{ bgcolor: COLORS.cs, color: '#0e0d16', '&:hover': { bgcolor: COLORS.cs, opacity: 0.88 } }} variant="contained">
                Spróbuj jeszcze raz
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}