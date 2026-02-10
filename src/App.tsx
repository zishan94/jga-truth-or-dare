import { useState, useCallback } from 'react'
import './App.css'

// Harmlose Wahrheiten für normale Spieler
const normalTruths = [
  "Was war dein peinlichster Moment beim Feiern?",
  "Welche geheime Angewohnheit hast du?",
  "Was ist das Dümmste, das du je betrunken gemacht hast?",
  "Welchen Song singst du heimlich unter der Dusche?",
  "Was ist dein guilty pleasure Essen um 3 Uhr nachts?",
  "Welchen Spitznamen hattest du als Kind?",
  "Was war dein peinlichster Moment vor einer Frau?",
  "Was ist die dümmste Ausrede die du je benutzt hast?",
  "Wann hast du das letzte Mal geweint und warum?",
  "Was war dein schlechtester Kater ever?",
  "Welchen Promi findest du heimlich hot?",
  "Was hast du gemacht worauf du nicht stolz bist?",
  "Was ist dein grösstes Talent das niemand kennt?",
  "Welche Lüge erzählst du am häufigsten?",
  "Was war der peinlichste Moment mit deinen Eltern?",
  "Welche App auf deinem Handy ist dir am peinlichsten?",
  "Was ist das Verrückteste das du für Geld gemacht hast?",
  "Wen aus der Runde würdest du auf eine einsame Insel mitnehmen?",
  "Was war dein schlimmster Haarschnitt?",
  "Welches Geheimnis hast du noch nie jemandem erzählt?",
  "Was war dein peinlichstes Date?",
  "Welche Serie hast du heimlich komplett durchgebinged?",
  "Was ist das Kindischste das du regelmässig machst?",
  "Wen hast du als letztes gestalkt auf Social Media?",
]

// Harmlose Pflichten für normale Spieler (alle zuhause machbar)
const normalDares = [
  "Mach 20 Liegestütze!",
  "Imitiere einen Spieler – alle müssen raten wen!",
  "Zeig dein peinlichstes Foto auf dem Handy!",
  "Tanz 30 Sekunden ohne Musik wie ein Profi!",
  "Trink einen Shot auf ex!",
  "Lass den Spieler links eine Nachricht an deinen Ex schreiben!",
  "Erzähl einen Witz – wenn niemand lacht, trink!",
  "Mach dein bestes Tiergeräusch für 10 Sekunden!",
  "Zeig deinen letzten Google-Verlauf!",
  "Ruf einen Freund an und sag 'Ich liebe dich' ohne Kontext!",
  "Mach 10 Squats während du ein Lied singst!",
  "Lass dir von der Gruppe eine Frisur machen!",
  "Schick deiner Mutter ein Herz-Emoji ohne Erklärung!",
  "Sprich die nächsten 2 Runden nur mit Akzent!",
  "Lass jemanden eine Instagram-Story für dich posten!",
  "Mach einen Handstand an der Wand (oder versuch es)!",
  "Zeig das letzte Bild in deiner Galerie!",
  "Imitiere deinen Chef oder Lehrer!",
  "Sag jedem in der Runde ein ehrliches Kompliment!",
  "Tausche dein Oberteil mit jemandem für 2 Runden!",
  "Mach ein peinliches Selfie und poste es!",
  "Beatboxe für 30 Sekunden!",
  "Erzähle deine peinlichste Geschichte mit Schauspiel!",
  "Lass die Gruppe entscheiden was du als nächstes trinkst!",
]

// 🔥 Spicy Wahrheiten für den Bräutigam
const spicyTruths = [
  "An welche andere Frau denkst du manchmal heimlich?",
  "Was ist das Versauteste das du je gemacht hast?",
  "Wo war der ungewöhnlichste Ort wo du Sex hattest?",
  "Was ist deine geheime Fantasie die deine Verlobte nicht kennt?",
  "Wie viele Frauen hattest du wirklich vor deiner Verlobten?",
  "Was war dein peinlichster Moment beim Sex?",
  "Welchen Promi würdest du für eine Nacht wählen?",
  "Was ist das Versauteste in deinem Browser-Verlauf?",
  "Hast du schon mal an jemand anderen gedacht während du mit ihr warst?",
  "Was war das Wildeste das eine Ex von dir wollte?",
  "Welche Fantasie hast du noch nie jemandem erzählt?",
  "Was ist das Schlimmste das du je auf dem Handy versteckt hast?",
  "Wie lange war deine längste Flaute ohne Sex?",
  "Was war der peinlichste Moment den deine Verlobte noch nicht kennt?",
  "Wenn du für einen Tag Single wärst, was würdest du machen?",
  "Was hat eine Ex besser gemacht als deine Verlobte? Ehrlich!",
  "Was ist deine guilty pleasure Kategorie auf gewissen Websites?",
  "Wann hast du das letzte Mal einer anderen Frau hinterhergeschaut?",
  "Was würdest du ändern an eurem Liebesleben wenn du könntest?",
  "Welches Geheimnis würde deine Verlobte komplett ausflippen lassen?",
  "Was hast du deiner Verlobten verschwiegen das sie wissen sollte?",
  "Hattest du jemals Zweifel an der Beziehung?",
  "Was ist die versauteste Nachricht die du je bekommen hast?",
  "Beschreib deinen Typ Frau – und sei ehrlich ob deine Verlobte dem entspricht!",
]

// 🔥 Spicy Pflichten für den Bräutigam (alle zuhause machbar)
const spicyDares = [
  "Zieh dein Oberteil aus für die nächsten 3 Runden!",
  "Ruf deine Verlobte an und stöhne ins Telefon – dann leg auf!",
  "Mach einen sexy Lapdance auf einem Stuhl!",
  "Lass dir 'VERGEBEN' auf die Stirn schreiben!",
  "Schick deiner Verlobten: 'Ich muss dir was beichten...' – warte 5 Minuten!",
  "Zieh deine Hose aus und tanz in Unterhose!",
  "Mach 30 Sekunden lang deine besten Stöhn-Geräusche!",
  "Lass dir von den Jungs ein peinliches Outfit zusammenstellen – trag es!",
  "Ruf deine Verlobte an und sag ihr wie geil sie ist – vor allen!",
  "Mach einen Body Shot von jemandem aus der Runde!",
  "Lass jemanden ein peinliches Foto von dir machen und es posten!",
  "Erzähl dein peinlichstes Sex-Erlebnis im Detail!",
  "Lass dich mit verbundenen Augen von einem Spieler füttern – rate was es ist!",
  "Schreib deiner Verlobten eine richtig versaute Nachricht – zeig sie der Gruppe!",
  "Mach 20 Liegestütze – bei jedem Fehler ein Kleidungsstück aus!",
  "Imitiere wie du im Bett klingst!",
  "Lass die Jungs dein Handy 2 Minuten durchsuchen!",
  "Trag nur Socken und Unterhose für die nächsten 5 Runden!",
  "Ruf deine Schwiegermutter an und sag wie sehr du sie liebst!",
  "Mach ein TikTok wo du sexy tanzt – poste es!",
  "Lass dir von jedem einen Kuss auf die Wange geben!",
  "Gesteh der Gruppe deine versauteste Fantasie!",
  "Schick deiner Verlobten ein Bild von dir 'nach dem Feiern'!",
  "Trink einen Shot aus dem Bauchnabel von jemandem!",
]

type GamePhase = 'setup' | 'spinning' | 'choosing' | 'result'
type ChallengeType = 'truth' | 'dare'

interface Player {
  name: string
  isTarget: boolean
}

interface Challenge {
  type: ChallengeType
  text: string
  player: Player
}

// Farben für die Rad-Segmente
const WHEEL_COLORS = [
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#10b981', // emerald
  '#ef4444', // red
  '#3b82f6', // blue
  '#84cc16', // lime
]

function App() {
  const [phase, setPhase] = useState<GamePhase>('setup')
  const [players, setPlayers] = useState<Player[]>([])
  const [playerInput, setPlayerInput] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [usedTruths, setUsedTruths] = useState<Map<string, Set<string>>>(new Map())
  const [usedDares, setUsedDares] = useState<Map<string, Set<string>>>(new Map())
  const [wheelRotation, setWheelRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const addPlayer = useCallback(() => {
    const name = playerInput.trim()
    if (!name) return
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) return
    
    const isTarget = name.toLowerCase() === 'thanu'
    setPlayers(prev => [...prev, { name, isTarget }])
    setPlayerInput('')
  }, [playerInput, players])

  const removePlayer = (index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index))
  }

  const startGame = () => {
    if (players.length < 2) return
    setPhase('spinning')
  }

  const spinWheel = () => {
    if (isSpinning || players.length === 0) return
    setIsSpinning(true)
    
    // Zufälligen Spieler wählen
    const selectedIndex = Math.floor(Math.random() * players.length)
    const selectedPlayer = players[selectedIndex]
    
    // Segment-Winkel berechnen
    const segmentAngle = 360 / players.length
    
    // CONIC-GRADIENT Layout (von oben, im Uhrzeigersinn):
    // - Segment 0: von 0° bis segmentAngle°, Mitte bei segmentAngle/2
    // - Segment N: Mitte bei (N + 0.5) * segmentAngle
    //
    // Der Zeiger ist OBEN fixiert (0° Position)
    // CSS transform: rotate(X) dreht im Uhrzeigersinn
    // Bei Rotation X zeigt der Zeiger auf Rad-Position X
    
    const segmentCenter = (selectedIndex + 0.5) * segmentAngle
    
    // Aktuelle Position des Rades (normalisiert auf 0-360)
    const currentAngle = wheelRotation % 360
    
    // Wie viel müssen wir von der aktuellen Position drehen um zum Ziel zu kommen?
    // (immer vorwärts/im Uhrzeigersinn)
    let additionalRotation = segmentCenter - currentAngle
    if (additionalRotation < 0) {
      additionalRotation += 360
    }
    
    // Mehrere volle Umdrehungen für den Effekt + die zusätzliche Rotation zum Ziel
    const fullRotations = (4 + Math.floor(Math.random() * 2)) * 360
    const totalAdditionalRotation = fullRotations + additionalRotation
    
    setWheelRotation(prev => prev + totalAdditionalRotation)
    
    setTimeout(() => {
      setCurrentPlayer(selectedPlayer)
      setIsSpinning(false)
      setPhase('choosing')
    }, 4000)
  }

  const getChallenge = (type: ChallengeType): string => {
    if (!currentPlayer) return ''
    
    const truthList = currentPlayer.isTarget ? spicyTruths : normalTruths
    const dareList = currentPlayer.isTarget ? spicyDares : normalDares
    const list = type === 'truth' ? truthList : dareList
    
    const usedMap = type === 'truth' ? usedTruths : usedDares
    const setUsedMap = type === 'truth' ? setUsedTruths : setUsedDares
    const playerUsed = usedMap.get(currentPlayer.name) || new Set<string>()
    
    let available = list.filter(c => !playerUsed.has(c))
    
    if (available.length === 0) {
      setUsedMap(prev => {
        const newMap = new Map(prev)
        newMap.set(currentPlayer.name, new Set())
        return newMap
      })
      available = list
    }
    
    const text = available[Math.floor(Math.random() * available.length)]
    
    setUsedMap(prev => {
      const newMap = new Map(prev)
      const playerSet = new Set(newMap.get(currentPlayer.name) || [])
      playerSet.add(text)
      newMap.set(currentPlayer.name, playerSet)
      return newMap
    })
    
    return text
  }

  const selectChallenge = (type: ChallengeType) => {
    if (!currentPlayer) return
    const text = getChallenge(type)
    setCurrentChallenge({ type, text, player: currentPlayer })
    setPhase('result')
  }

  const nextRound = () => {
    setCurrentChallenge(null)
    setCurrentPlayer(null)
    setPhase('spinning')
  }

  const resetGame = () => {
    setPhase('setup')
    setPlayers([])
    setCurrentPlayer(null)
    setCurrentChallenge(null)
    setUsedTruths(new Map())
    setUsedDares(new Map())
    setWheelRotation(0)
  }

  // Erzeuge conic-gradient für das Rad
  const getWheelBackground = () => {
    if (players.length === 0) return '#333'
    
    const segmentAngle = 360 / players.length
    const stops = players.map((_, index) => {
      const color = WHEEL_COLORS[index % WHEEL_COLORS.length]
      const start = index * segmentAngle
      const end = (index + 1) * segmentAngle
      return `${color} ${start}deg ${end}deg`
    }).join(', ')
    
    return `conic-gradient(from 0deg, ${stops})`
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">🎲</div>
        <h1>Wahrheit oder Pflicht</h1>
        <p className="subtitle">Das Party-Spiel</p>
      </header>

      {phase === 'setup' && (
        <div className="setup-phase">
          <div className="card glass">
            <h2>👥 Wer spielt mit?</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name eingeben..."
                value={playerInput}
                onChange={(e) => setPlayerInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                autoFocus
              />
              <button onClick={addPlayer} className="btn-add">
                <span>+</span>
              </button>
            </div>
            
            <div className="player-list">
              {players.map((player, index) => (
                <div key={index} className="player-tag" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span 
                    className="player-avatar"
                    style={{ background: WHEEL_COLORS[index % WHEEL_COLORS.length] }}
                  >
                    {player.name[0].toUpperCase()}
                  </span>
                  <span className="player-name">{player.name}</span>
                  <button onClick={() => removePlayer(index)} className="btn-remove">×</button>
                </div>
              ))}
            </div>
            
            {players.length < 2 && (
              <p className="hint">Mindestens 2 Spieler hinzufügen</p>
            )}
          </div>
          
          <button 
            onClick={startGame} 
            className="btn-primary"
            disabled={players.length < 2}
          >
            <span className="btn-icon">🚀</span>
            Los geht's!
          </button>
        </div>
      )}

      {phase === 'spinning' && (
        <div className="spinning-phase">
          <div className="wheel-container">
            <div className="wheel-pointer">▼</div>
            <div 
              className="wheel"
              style={{ 
                background: getWheelBackground(),
                transform: `rotate(${wheelRotation}deg)` 
              }}
            >
              {/* Labels für jeden Spieler */}
              {players.map((player, index) => {
                const segmentAngle = 360 / players.length
                // Label in die Mitte des Segments positionieren
                const labelAngle = index * segmentAngle + (segmentAngle / 2)
                return (
                  <div
                    key={index}
                    className="wheel-label-container"
                    style={{
                      transform: `rotate(${labelAngle}deg)`,
                    }}
                  >
                    <span className="wheel-label">{player.name}</span>
                  </div>
                )
              })}
              <div className="wheel-center">?</div>
            </div>
          </div>
          
          <button 
            onClick={spinWheel} 
            className="btn-spin"
            disabled={isSpinning}
          >
            {isSpinning ? '🎰 Dreht...' : '🎯 Drehen!'}
          </button>
          
          <button onClick={resetGame} className="btn-secondary">
            ↺ Neues Spiel
          </button>
        </div>
      )}

      {phase === 'choosing' && currentPlayer && (
        <div className="choosing-phase">
          <div className="card glass player-card">
            <div className="current-player">
              <div 
                className="player-avatar-large"
                style={{ 
                  background: WHEEL_COLORS[players.findIndex(p => p.name === currentPlayer.name) % WHEEL_COLORS.length] 
                }}
              >
                {currentPlayer.name[0].toUpperCase()}
              </div>
              <h2>{currentPlayer.name}</h2>
              <p>ist dran!</p>
            </div>
          </div>
          
          <p className="choose-text">Wähle dein Schicksal...</p>
          
          <div className="choice-buttons">
            <button 
              onClick={() => selectChallenge('truth')} 
              className="btn-truth"
            >
              <span className="btn-emoji">🤔</span>
              <span className="btn-label">Wahrheit</span>
            </button>
            <button 
              onClick={() => selectChallenge('dare')} 
              className="btn-dare"
            >
              <span className="btn-emoji">🔥</span>
              <span className="btn-label">Pflicht</span>
            </button>
          </div>
          
          <button onClick={resetGame} className="btn-secondary">
            ↺ Neues Spiel
          </button>
        </div>
      )}

      {phase === 'result' && currentChallenge && (
        <div className="result-phase">
          <div className="card glass result-card">
            <div className="result-badge">
              {currentChallenge.type === 'truth' ? '🤔 WAHRHEIT' : '🔥 PFLICHT'}
            </div>
            
            <div className="result-player">
              <div 
                className="player-avatar-large"
                style={{ 
                  background: WHEEL_COLORS[players.findIndex(p => p.name === currentChallenge.player.name) % WHEEL_COLORS.length] 
                }}
              >
                {currentChallenge.player.name[0].toUpperCase()}
              </div>
              <h2>{currentChallenge.player.name}</h2>
            </div>
            
            <div className="challenge-box">
              <p className="challenge-text">{currentChallenge.text}</p>
            </div>
          </div>
          
          <button onClick={nextRound} className="btn-primary">
            <span className="btn-icon">✓</span>
            Nächste Runde
          </button>
          
          <button onClick={resetGame} className="btn-secondary">
            ↺ Neues Spiel
          </button>
        </div>
      )}
    </div>
  )
}

export default App
