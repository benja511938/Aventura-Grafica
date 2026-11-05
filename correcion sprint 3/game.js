const newGame = () => ({
  time: 100,
  energy: 100,
  inventory: { key: false, lever: false, snack: false, screwdriver: false },
  node: 'start',
  doorOpenedBy: null,
  trail: [],
  ending: null,
});

const nodes = {
  1: {
    stage: 'ETAPA 1 · SALIDA DEL BAÑO',
    title: 'La puerta principal está cerrada',
    description: 'Nico sale del baño a oscuras. La puerta de entrada tiene un candado y el reloj del local marca las 05:12. ¿Por dónde buscás una salida?',
    location: 'BAÑO · PASILLO PRINCIPAL', bg: 'media/pasillo.png', bgAlt: 'Pasillo principal del supermercado a oscuras, con heladeras a un lado y estantes al otro', caption: 'El silencio del local se siente demasiado grande.',
    choices: [
      { title: 'Ir a la oficina del gerente', detail: 'Buscar una llave en el área administrativa.', cost: '−10 tiempo · −5 energía', time: 10, energy: 5, next: '2A' },
      { title: 'Ir al pasillo del depósito', detail: 'Avanzar directo hacia la zona de carga.', cost: '−10 tiempo · −5 energía', time: 10, energy: 5, next: '2B' },
      { title: 'Meterse en el conducto de ventilación', detail: 'Intentar avanzar por arriba sin hacer ruido.', cost: '−15 tiempo · −15 energía', time: 15, energy: 15, next: '2C' },
    ],
  },
  '2A': {
    stage: 'ETAPA 2 · OFICINA DEL GERENTE', title: 'Un escritorio revuelto',
    description: 'La oficina está a oscuras. Nico revisa el escritorio y los muebles del gerente: cualquier ruido parece más fuerte de lo normal.',
    location: 'ÁREA ADMINISTRATIVA', bg: 'media/escenarios/oficina.svg', bgAlt: 'Oficina del gerente: escritorio con computadora, fichero metálico, reloj de pared y un saco colgado', caption: 'Un reloj de pared hace tic… tac… tic…',
    choices: [
      { title: 'Forzar el cajón metálico', detail: 'Buscar las llaves de la sucursal.', cost: '−15 tiempo · −5 energía · llave', time: 15, energy: 5, effect: s => { s.inventory.key = true; }, result: 'Encontrás la llave de salida entre unos papeles. La guardás.', next: '3A' },
      { title: 'Revisar el uniforme colgado', detail: 'El saco del gerente podría tener algo útil.', cost: '−10 tiempo · +10 energía · snack', time: 10, energy: -10, effect: s => { s.inventory.snack = 'consumed'; }, result: 'Encontrás una barra de cereal y la comés. Recuperás energía.', next: '3A' },
      { title: 'Encender la computadora', detail: 'Probar la apertura remota de la entrada.', cost: '−25 tiempo', time: 25, energy: 0, result: 'La computadora no abre ninguna puerta. Una alarma silenciosa empieza a correr.', next: '3B' },
    ],
  },
  '2B': {
    stage: 'ETAPA 2 · PASILLO DEL DEPÓSITO', title: 'Cajas en el camino',
    description: 'Una pila de cajas colapsadas bloquea el paso hacia la zona de carga. El pasillo de fiambrería queda a un costado.',
    location: 'PASILLO DEL DEPÓSITO', bg: 'media/escenarios/deposito_pasillo.svg', bgAlt: 'Pasillo del depósito con cajas colapsadas, un estante caído y una abertura hacia la fiambrería', caption: 'Algo se mueve detrás de las cajas.',
    choices: [
      { title: 'Empujar las cajas', detail: 'Mover la carga con fuerza bruta.', cost: '−5 tiempo · −20 energía', time: 5, energy: 20, next: '3A' },
      { title: 'Rodear por la fiambrería', detail: 'Tomar un desvío más largo, pero despejado.', cost: '−15 tiempo · −5 energía', time: 15, energy: 5, next: '3B' },
      { title: 'Trepar por el estante caído', detail: 'Probar un atajo inestable. Hay un 50% de probabilidad de resbalar.', cost: '−10 tiempo · −15 energía · riesgo extra', time: 10, energy: 15, next: '3A', chance: .5, failEnergy: 5, successText: 'Pasás por arriba del estante sin hacer ruido.', failText: 'El estante se mueve y te golpeás al caer: perdés 5 de energía extra.' },
    ],
  },
  '2C': {
    stage: 'ETAPA 2 · CONDUCTOS DE VENTILACIÓN', title: 'Chapa, polvo y oscuridad',
    description: 'Nico avanza a gatas dentro del conducto estrecho. A través de las rejillas alcanza a distinguir dos zonas del local.',
    location: 'CONDUCTO DE VENTILACIÓN', bg: 'media/escenarios/ventilacion.svg', bgAlt: 'Interior del conducto de ventilación, con rejillas que dejan ver la fiambrería y el depósito', caption: 'El metal cruje con cada movimiento.',
    choices: [
      { title: 'Salir por la primera rejilla', detail: 'La rejilla da a la fiambrería.', cost: '−10 tiempo · −10 energía', time: 10, energy: 10, next: '3B' },
      { title: 'Seguir hasta el depósito', detail: 'Arrastrarse un tramo más largo.', cost: '−15 tiempo · −15 energía', time: 15, energy: 15, next: '3A' },
      { title: 'Patear una rejilla trabada', detail: 'Abrirla rápido con un golpe fuerte.', cost: '−5 tiempo · −20 energía', time: 5, energy: 20, next: '3A' },
    ],
  },
  '3A': {
    stage: 'ETAPA 3 · DEPÓSITO CENTRAL', title: 'Ruidos entre los estantes',
    description: 'Entre las estanterías del depósito central suenan pasos… o quizá sean ratas. Hay que llegar al taller sin llamar la atención.',
    location: 'DEPÓSITO CENTRAL', bg: 'media/escenarios/deposito_central.svg', bgAlt: 'Depósito central con estantes altos llenos de cajas y una lata que rueda por el piso', caption: 'Una lata rueda sola por el suelo.',
    choices: [
      { title: 'Tirar una lata al otro extremo', detail: 'Crear una distracción para avanzar tranquilo.', cost: '−10 tiempo · −5 energía', time: 10, energy: 5, next: 4 },
      { title: 'Avanzar agachado y en silencio', detail: 'Ir despacio para evitar que te detecten.', cost: '−10 tiempo · −15 energía', time: 10, energy: 15, next: 4 },
      { title: 'Correr hasta el fondo', detail: 'Cruzar la nave central a toda velocidad.', cost: '−5 tiempo · −15 energía', time: 5, energy: 15, next: 4 },
    ],
  },
  '3B': {
    stage: 'ETAPA 3 · FIAMBRERÍA Y HELADERAS', title: 'Frío detrás de las cortinas',
    description: 'La fiambrería está helada y las luces titilan. Cerca de las cámaras de frío hay un pequeño sector para empleados.',
    location: 'FIAMBRERÍA · CÁMARAS DE FRÍO', bg: 'media/escenarios/fiambreria.svg', bgAlt: 'Fiambrería helada con vitrinas refrigeradas, la cámara de frío y el sector de empleados', caption: 'Las luces vuelven a parpadear.', flicker: true,
    choices: [
      { title: 'Comer algo de la heladera del personal', detail: 'Detenerse un momento para recuperar fuerzas.', cost: '−15 tiempo · +20 energía · snack', time: 15, energy: -20, effect: s => { s.inventory.snack = 'consumed'; }, result: 'Comés un sándwich y recuperás energía.', next: 4 },
      { title: 'Revisar los delantales', detail: 'Buscar algo útil en el perchero del personal.', cost: '−10 tiempo · −5 energía · destornillador', time: 10, energy: 5, effect: s => { s.inventory.screwdriver = true; }, result: 'Encontrás un destornillador y te lo guardás.', next: 4 },
      { title: 'Bordear las cámaras de frío', detail: 'Pasar de largo sin detenerte.', cost: '−5 tiempo · −10 energía', time: 5, energy: 10, next: 4 },
    ],
  },
  4: {
    stage: 'ETAPA 4 · CAJA DE HERRAMIENTAS', title: 'El taller de mantenimiento',
    description: 'Un carro con herramientas está junto a la salida trasera. El peso puede servirte más adelante, pero ahora cada minuto cuenta.',
    location: 'TALLER DE MANTENIMIENTO', bg: 'media/escenarios/taller.svg', bgAlt: 'Taller de mantenimiento con banco de trabajo, carro de herramientas, caja de llaves y la puerta de emergencia al fondo', caption: 'La puerta de emergencia está cerca.',
    choices: [
      { title: 'Llevar la palanca de hierro', detail: 'Una herramienta fuerte para la verja exterior.', cost: '−10 energía · palanca', time: 0, energy: 10, effect: s => { s.inventory.lever = true; }, result: 'Te llevás la palanca. Es pesada, pero puede trabar el mecanismo de la verja.', next: 5 },
      { title: 'Seguir sin herramientas', detail: 'Avanzar más liviano.', cost: '−5 tiempo', time: 5, energy: 0, next: 5 },
      { title: 'Revisar la caja de llaves', detail: s => s.inventory.key ? 'Ya tenés la llave de salida. Podés seguir sin revisar otra vez.' : 'Buscar un juego maestro. Hay un 50% de probabilidad de encontrar una llave útil.', cost: s => s.inventory.key ? 'Sin costo: ya tenés la llave' : '−15 tiempo · −5 energía · azar', time: s => s.inventory.key ? 0 : 15, energy: s => s.inventory.key ? 0 : 5, chance: .5, keyChance: true, successText: 'Encontrás un juego maestro y guardás la llave de salida.', failText: 'Las llaves no sirven para la salida. Perdiste tiempo rebuscando.', next: 5 },
    ],
  },
  5: {
    stage: 'ETAPA 5 · PUERTA TRASERA', title: 'La salida de emergencia',
    description: 'Nico llega frente a la pesada puerta trasera. Del otro lado espera el patio de carga.',
    location: 'PUERTA TRASERA DE EMERGENCIA', bg: 'media/escenarios/puerta_trasera.svg', bgAlt: 'Puerta trasera de emergencia con cerradura, barra antipánico, cartel de salida y reloj marcando casi las seis', caption: 'El reloj ya está cerca de las seis.',
    choices: [
      { title: 'Probar la llave de salida', detail: s => s.inventory.key ? 'Abrir la puerta sin hacer ruido.' : 'No tenés la llave. Probar varias llaves lleva tiempo; luego tendrás que elegir otra opción.', cost: s => s.inventory.key ? '−5 tiempo' : '−20 tiempo · −10 energía · no abre', time: s => s.inventory.key ? 5 : 20, energy: s => s.inventory.key ? 0 : 10, keyTry: true, next: 6 },
      { title: 'Forzar la cerradura', detail: s => s.inventory.lever ? 'Hacer palanca para romper la traba.' : 'Empujar la traba con fuerza bruta.', cost: '−10 tiempo · −20 energía', time: 10, energy: 20, opens: 'force', next: 6 },
      { title: 'Desarmar la cerradura con calma', detail: s => s.inventory.screwdriver ? 'Usar el destornillador para liberar el mecanismo sin romperlo.' : 'Intentar liberar el mecanismo con las manos y paciencia.', cost: s => s.inventory.screwdriver ? '−8 tiempo · −5 energía · destornillador' : '−20 tiempo · −10 energía', time: s => s.inventory.screwdriver ? 8 : 20, energy: s => s.inventory.screwdriver ? 5 : 10, opens: 'precision', next: 6 },
    ],
  },
  6: {
    stage: 'ETAPA 6 · DECISIÓN FINAL', title: 'La verja se está cerrando',
    description: 'La puerta trasera da al patio de carga. La verja metálica exterior baja con el temporizador nocturno. Es tu última decisión.',
    location: 'PATIO DE CARGA', bg: 'media/escenarios/patio_carga.svg', bgAlt: 'Patio de carga de madrugada con la verja metálica bajando y el panel de control con botón rojo', caption: 'El aire de la madrugada. Una última oportunidad.',
    choices: [
      { title: 'Esprintar y pasar por debajo', detail: 'Lanzarte antes de que la verja toque el suelo.', cost: '−5 tiempo · −20 energía', time: 5, energy: 20 },
      { title: 'Trabar la verja', detail: s => s.inventory.lever ? 'Usar la palanca para frenar el mecanismo.' : 'Trabar el riel con las manos y el cuerpo.', cost: s => s.inventory.lever ? '−10 tiempo · −5 energía' : '−10 tiempo · −25 energía', time: 10, energy: s => s.inventory.lever ? 5 : 25 },
      { title: 'Buscar el panel de control', detail: 'Encontrar el botón lateral para detener la verja.', cost: '−15 tiempo · −5 energía', time: 15, energy: 5 },
    ],
  },
};

const FONDO_INICIAL = { src: 'media/pasillo.png', alt: 'Pasillo del supermercado donde Nico debe encontrar la salida' };
const FONDO_EXTERIOR = { src: 'media/escenarios/exterior_amanecer.svg', alt: 'Calle vacía al amanecer frente al supermercado cerrado' };
let state = newGame();
const $ = id => document.getElementById(id);
const scene = $('scene');
const character = $('nico');
const stageCopy = $('stage-copy');
const choicesEl = $('choices');
const feedbackEl = $('feedback');
const finalCard = $('final-card');
const backgroundEl = scene.querySelector('.scene-background');

// Cambia la imagen de fondo según el lugar donde está Nico.
function setBackground({ src, alt }, styled = true) {
  if (!backgroundEl.src.endsWith(src)) backgroundEl.src = src;
  backgroundEl.alt = alt;
  scene.dataset.bg = styled ? 'ilustrado' : 'base';
}
// Precarga para que el cambio de escenario no parpadee.
[...new Set(Object.values(nodes).map(n => n.bg).concat(FONDO_EXTERIOR.src))].forEach(src => { const im = new Image(); im.src = src; });

$('start-game').addEventListener('click', () => {
  state.node = 1;
  $('intro-copy').hidden = true;
  stageCopy.hidden = false;
  $('restart-top').hidden = false;
  renderNode();
  playIntroClip();
});
$('restart-top').addEventListener('click', resetGame);

// Animación de Nico exportada desde Adobe Animate (2 a 5 s). Se reproduce al empezar, sobre el pasillo de la etapa 1.
// Si el archivo todavía no existe o el navegador no puede reproducirlo, el juego sigue normal sin ella.
const INTRO_CLIPS = ['media/animacion/nico_intro.mp4', 'media/animacion/nico_intro.webm']; // MP4 (Animate) y WebM de respaldo
let introIndex = 0;
const introClip = $('intro-clip');
function stopIntroClip() {
  introClip.pause();
  introClip.hidden = true;
  introClip.removeAttribute('src');
  introClip.load();
  character.style.visibility = '';
}
function tryNextClip() {
  if (introIndex >= INTRO_CLIPS.length) return stopIntroClip();
  introClip.src = INTRO_CLIPS[introIndex++];
  introClip.play().catch(tryNextClip);
}
function playIntroClip() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  introIndex = 0;
  introClip.onended = stopIntroClip;
  introClip.onerror = tryNextClip; // si el navegador no puede con el MP4, prueba el WebM
  introClip.onclick = stopIntroClip; // un clic la saltea
  introClip.hidden = false;
  character.style.visibility = 'hidden';
  tryNextClip();
}

function valueOf(value) { return typeof value === 'function' ? value(state) : value; }
function setFeedback(text) {
  feedbackEl.textContent = text;
  feedbackEl.hidden = !text;
}
function renderNode() {
  if (state.ending) return renderEnding();
  const node = nodes[state.node];
  if (!node) return;
  $('stage-eyebrow').textContent = node.stage;
  $('stage-title').textContent = node.title;
  $('stage-description').textContent = node.description;
  $('step-count').textContent = `ETAPA ${String(state.node).replace(/\D/g, '') || 1} / 6`;
  $('scene-location').textContent = node.location;
  $('scene-caption').textContent = node.caption;
  scene.dataset.area = String(state.node);
  setBackground({ src: node.bg, alt: node.bgAlt }, node.bg !== FONDO_INICIAL.src);
  scene.classList.toggle('scene--flicker', !!node.flicker);
  scene.classList.remove('scene--blackout');
  character.classList.remove('is-surprised');
  finalCard.hidden = true;
  choicesEl.hidden = false;
  setFeedback('');
  renderChoices(node.choices);
  updateSidebar();
  stageCopy.animate([{ opacity: .55, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' });
}
function renderChoices(choices) {
  choicesEl.replaceChildren();
  choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-button';
    const title = valueOf(choice.title);
    const detail = valueOf(choice.detail);
    const cost = valueOf(choice.cost);
    btn.innerHTML = `<span class="choice-main"><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span class="choice-copy"><strong></strong><small></small></span></span><span class="choice-arrow" aria-hidden="true">→</span>`;
    btn.querySelector('strong').textContent = title;
    btn.querySelector('small').textContent = `${detail} · ${cost}`;
    btn.addEventListener('click', () => choose(choice, title));
    choicesEl.append(btn);
  });
}
function choose(choice, title) {
  const alreadyHasKey = !!(choice.keyChance && state.inventory.key);
  const timeCost = alreadyHasKey ? 0 : Number(valueOf(choice.time) || 0);
  const energyCost = alreadyHasKey ? 0 : Number(valueOf(choice.energy) || 0);
  state.time = Math.max(0, Math.min(100, state.time - timeCost));
  state.energy = Math.max(0, Math.min(100, state.energy - energyCost));
  let note = choice.result || '';
  if (choice.chance !== undefined) {
    if (alreadyHasKey) {
      note = 'Ya tenías la llave de salida. Seguiste adelante sin perder tiempo ni energía buscando otra.';
    } else if (Math.random() < choice.chance) {
      if (choice.keyChance) state.inventory.key = true;
      note = choice.successText;
    } else {
      note = choice.failText;
      if (choice.failEnergy) state.energy = Math.max(0, state.energy - choice.failEnergy);
    }
  }
  if (choice.effect) choice.effect(state);

  const stageName = nodes[state.node].stage.replace(/^ETAPA \d+ · /, '');
  if (state.node === 5 && choice.keyTry && !state.inventory.key) {
    state.trail.push({ stage: stageName, choice: `${title} (sin éxito)` });
    if (state.time <= 0 || state.energy <= 0) {
      endGame('loss', state.time <= 0 ? 'Se hicieron las seis y el guardia encontró a Nico antes de que pudiera salir.' : 'Nico se desplomó por el cansancio.');
      return;
    }
    $('stage-title').textContent = 'La cerradura no cedió';
    $('stage-description').textContent = 'La puerta sigue cerrada. Vas a tener que elegir otra forma de abrirla.';
    setFeedback('La llave no encaja. La puerta sigue cerrada: elegí forzarla o desmontar la cerradura.');
    renderChoices(nodes[5].choices.slice(1));
    updateSidebar();
    return;
  }

  if (state.node === 5) state.doorOpenedBy = choice.keyTry ? 'key' : (choice.opens || 'force');
  state.trail.push({ stage: stageName, choice: title });
  if (state.time <= 0 || state.energy <= 0) {
    endGame('loss', state.time <= 0 ? 'Se hicieron las seis y el guardia encontró a Nico antes de que pudiera salir.' : 'El esfuerzo fue demasiado. Nico cayó desmayado antes de alcanzar la calle.');
    return;
  }
  if (state.node === 6) {
    const doorText = state.doorOpenedBy === 'key'
      ? 'Había abierto la puerta trasera con la llave.'
      : state.doorOpenedBy === 'precision'
        ? 'Había liberado la cerradura con precisión.'
        : 'Había forzado la puerta trasera.';
    if (title === 'Esprintar y pasar por debajo') {
      endGame('sprint', `${doorText} Nico se lanzó al suelo y pasó por debajo de la verja en el último segundo. Salió, pero el golpe y el ruido alertaron al guardia: tuvo que escapar corriendo por la calle.`);
    } else if (title === 'Trabar la verja') {
      endGame('lever', state.inventory.lever
        ? `${doorText} Nico encajó la palanca en el riel y detuvo la verja el tiempo suficiente para cruzar. La herramienta quedó atrapada, pero logró salir sin hacer demasiado ruido.`
        : `${doorText} Nico usó sus propias fuerzas para trabar el riel. La verja se detuvo apenas unos segundos y consiguió pasar, aunque quedó exhausto y dejó un ruido que alertó al guardia.`);
    } else {
      endGame('panel', `${doorText} Nico encontró el panel lateral y cortó la alimentación del motor. La verja se detuvo por completo. Pudo salir con calma antes de que el guardia llegara al patio.`);
    }
    return;
  }
  state.node = choice.next;
  updateSidebar();
  renderNode();
  if (note) setFeedback(note);
}
function updateSidebar() {
  $('time-value').textContent = `${state.time}%`;
  $('energy-value').textContent = `${state.energy}%`;
  $('time-fill').value = state.time;
  $('energy-fill').value = state.energy;
  $('time-fill').classList.toggle('is-low', state.time <= 25);
  $('energy-fill').classList.toggle('is-low', state.energy <= 25);
  for (const [key, yes] of Object.entries(state.inventory)) {
    const row = document.querySelector(`[data-item="${key}"]`);
    if (row) {
      row.classList.toggle('has-item', yes === true);
      row.classList.toggle('is-used', yes === 'consumed');
      row.querySelector('b').textContent = yes === 'consumed' ? 'Consumido' : yes ? 'Sí' : 'No';
    }
  }
  const trail = $('trail');
  trail.replaceChildren();
  if (!state.trail.length) {
    const empty = document.createElement('li');
    empty.className = 'trail-empty';
    empty.textContent = 'Tus elecciones aparecerán acá.';
    trail.append(empty);
  }
  state.trail.slice(-8).forEach(step => {
    const li = document.createElement('li');
    li.textContent = `${step.stage}: ${step.choice}`;
    trail.append(li);
  });
}
function endGame(type, message) {
  state.ending = { type, message };
  state.trail.push({ stage: 'Final', choice: type === 'loss' ? 'Atrapado' : type === 'sprint' ? 'Escape al límite' : type === 'lever' ? (state.inventory.lever ? 'La herramienta salvadora' : 'A pura fuerza') : 'Salida silenciosa' });
  updateSidebar();
  renderEnding();
}
function renderEnding() {
  const lost = state.ending.type === 'loss';
  const endingTitles = { sprint: 'Final 1 · Escape al límite', lever: state.inventory.lever ? 'Final 2 · La herramienta salvadora' : 'Final 2 · A pura fuerza', panel: 'Final 3 · Salida silenciosa' };
  const title = lost ? 'Final · Atrapado' : endingTitles[state.ending.type] || 'Final · Escape';
  choicesEl.hidden = true;
  finalCard.hidden = false;
  finalCard.classList.toggle('is-loss', lost);
  finalCard.innerHTML = `<p class="eyebrow">${lost ? 'GAME OVER' : 'FIN DE LA AVENTURA'}</p><h2></h2><p class="ending-summary"></p><div class="final-stats"><span>Tiempo: ${state.time}%</span><span>Energía: ${state.energy}%</span></div><button class="primary-button" type="button" id="play-again">Volver a jugar <span aria-hidden="true">↻</span></button>`;
  finalCard.querySelector('h2').textContent = title;
  finalCard.querySelector('.ending-summary').textContent = state.ending.message;
  $('play-again').addEventListener('click', resetGame);
  $('stage-eyebrow').textContent = lost ? 'EL TURNO TERMINÓ' : 'LOGRASTE SALIR';
  $('stage-title').textContent = lost ? 'La noche se terminó' : 'El aire de la madrugada';
  $('stage-description').textContent = lost ? 'Nico no logró alcanzar la salida a tiempo.' : 'La puerta de emergencia queda atrás. Por fin, estás afuera.';
  $('step-count').textContent = 'FINAL';
  $('scene-location').textContent = lost ? 'SUPERMERCADO · 06:00 AM' : 'AFUERA · AMANECER';
  $('scene-caption').textContent = lost ? 'El pasillo queda en silencio.' : 'La calle está vacía. Nico respira aliviado.';
  scene.classList.remove('scene--flicker');
  if (lost) { delete scene.dataset.area; setBackground(FONDO_INICIAL, false); }
  else { scene.dataset.area = 'final'; setBackground(FONDO_EXTERIOR); }
  scene.classList.toggle('scene--blackout', lost);
  character.classList.toggle('is-surprised', lost);
}
function resetGame() {
  stopIntroClip();
  state = newGame();
  $('intro-copy').hidden = false;
  stageCopy.hidden = true;
  $('restart-top').hidden = true;
  scene.classList.remove('scene--flicker', 'scene--blackout');
  delete scene.dataset.area;
  setBackground(FONDO_INICIAL, false);
  character.classList.remove('is-surprised');
  updateSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
updateSidebar();
