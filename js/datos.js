// =============================================================
// datos.js — Historia del juego: 6 etapas, 3 opciones por nodo.
// Cada opción indica cuánto resta de tiempo (t) y energía (e),
// qué objeto da (si da alguno) y a qué nodo lleva (next).
// Un valor negativo de "e" significa que Nico RECUPERA energía.
// Algunas opciones cambian según el inventario: en ese caso
// "t", "e", "texto" o "resultado" son funciones que reciben el estado.
// =============================================================

const NODOS = {
  1: {
    etapa: 1,
    lugar: 'Baño · pasillo principal',
    fondo: 'apagado',
    titulo: 'La puerta principal está cerrada',
    texto: 'Nico sale del baño a oscuras. El local ya cerró y la puerta de entrada tiene candado. Si a las 6:00 llega el guardia y lo encuentra, está en problemas. ¿Por dónde busca otra salida?',
    opciones: [
      { titulo: 'Ir a la oficina del gerente', detalle: 'Ahí podría haber llaves.', t: 10, e: 5, next: '2A' },
      { titulo: 'Ir al pasillo del depósito', detalle: 'Directo a la zona de carga.', t: 10, e: 5, next: '2B' },
      { titulo: 'Meterse al conducto de ventilación', detalle: 'Ir por arriba, sin hacer ruido.', t: 15, e: 15, next: '2C' },
    ],
  },

  '2A': {
    etapa: 2,
    lugar: 'Oficina del gerente',
    fondo: 'apagado',
    filtro: 'oficina',
    titulo: 'Un escritorio revuelto',
    texto: 'La oficina está a oscuras. Hay un escritorio con cajones, un saco colgado y una computadora apagada.',
    opciones: [
      { titulo: 'Forzar el cajón metálico', detalle: 'Buscar la llave de la salida.', t: 15, e: 5, da: 'llave',
        resultado: 'Entre unos papeles encontrás la llave de la puerta trasera. La guardás.', next: '3A' },
      { titulo: 'Revisar el saco del gerente', detalle: 'Puede tener algo útil.', t: 10, e: 0, da: 'snack',
        resultado: 'Encontrás una barra de cereal. La guardás para cuando la necesites.', next: '3A' },
      { titulo: 'Prender la computadora', detalle: 'Probar la apertura remota.', t: 25, e: 0, alarma: true,
        resultado: 'No abre nada y salta una alarma silenciosa. Perdiste mucho tiempo y tenés que salir por la fiambrería.', next: '3B' },
    ],
  },

  '2B': {
    etapa: 2,
    lugar: 'Pasillo del depósito',
    fondo: 'normal',
    titulo: 'Cajas en el camino',
    texto: 'Una pila de cajas caídas tapa el paso hacia el depósito. A un costado se ve el pasillo de la fiambrería.',
    opciones: [
      { titulo: 'Empujar las cajas', detalle: 'A pura fuerza.', t: 5, e: 20, next: '3A' },
      { titulo: 'Rodear por la fiambrería', detalle: 'Más largo, pero despejado.', t: 15, e: 5, next: '3B' },
      { titulo: 'Trepar por el estante caído', detalle: 'Atajo rápido, pero cansa.', t: 10, e: 15,
        resultado: 'Pasás por arriba del estante. Te raspaste un poco, pero llegaste.', next: '3A' },
    ],
  },

  '2C': {
    etapa: 2,
    lugar: 'Conducto de ventilación',
    fondo: 'apagado',
    filtro: 'conducto',
    titulo: 'Chapa, polvo y oscuridad',
    texto: 'Nico avanza a gatas dentro del conducto. Por las rejillas se ven dos zonas del local.',
    opciones: [
      { titulo: 'Salir por la primera rejilla', detalle: 'Da a la fiambrería.', t: 10, e: 10, next: '3B' },
      { titulo: 'Seguir hasta el depósito', detalle: 'Un tramo largo arrastrándose.', t: 15, e: 15, next: '3A' },
      { titulo: 'Patear una rejilla trabada', detalle: 'Rápido, pero agotador.', t: 5, e: 20, next: '3A' },
    ],
  },

  '3A': {
    etapa: 3,
    lugar: 'Depósito central',
    fondo: 'normal',
    filtro: 'deposito',
    titulo: 'Ruidos entre los estantes',
    texto: 'Entre las estanterías se escuchan pasos… o ratas. Hay que llegar al taller sin llamar la atención.',
    opciones: [
      { titulo: 'Tirar una lata al otro lado', detalle: 'Distraer y avanzar tranquilo.', t: 10, e: 5, next: 4 },
      { titulo: 'Avanzar agachado en silencio', detalle: 'Lento y cansador.', t: 10, e: 15, next: 4 },
      { titulo: 'Correr hasta el fondo', detalle: 'Rápido, sin importar el ruido.', t: 5, e: 15, next: 4 },
    ],
  },

  '3B': {
    etapa: 3,
    lugar: 'Fiambrería y heladeras',
    fondo: 'flash',
    filtro: 'frio',
    titila: true,
    titulo: 'Frío y luces que titilan',
    texto: 'La fiambrería está helada y las luces parpadean. Cerca de las cámaras de frío hay un rincón para los empleados.',
    opciones: [
      { titulo: 'Comer un sándwich de la heladera', detalle: 'Recuperar fuerzas, aunque se pierde tiempo.', t: 15, e: -20,
        resultado: 'Te comés un sándwich y recuperás bastante energía.', next: 4 },
      { titulo: 'Revisar los delantales', detalle: 'Buscar algo útil en el perchero.', t: 10, e: 5, da: 'destornillador',
        resultado: 'En un bolsillo hay un destornillador. Te lo llevás.', next: 4 },
      { titulo: 'Pasar rápido por las cámaras', detalle: 'Sin detenerse.', t: 5, e: 10, next: 4 },
    ],
  },

  4: {
    etapa: 4,
    lugar: 'Taller de mantenimiento',
    fondo: 'normal',
    filtro: 'taller',
    titulo: 'El carro de herramientas',
    texto: 'Llegás al taller, justo antes de la salida trasera. Hay un carro con herramientas y una caja de llaves con candado.',
    opciones: [
      { titulo: 'Llevar la palanca de hierro', detalle: 'Pesa, pero sirve para la puerta y la verja.', t: 0, e: 10, da: 'palanca',
        resultado: 'Te llevás la palanca. Es pesada, pero puede servir más adelante.', next: 5 },
      { titulo: 'Seguir sin herramientas', detalle: 'Ir más liviano.', t: 5, e: 0, next: 5 },
      { titulo: 'Abrir la caja de llaves',
        detalle: s => s.inventario.llave ? 'Ya tenés la llave: podés seguir sin revisar otra vez.'
          : s.inventario.destornillador ? 'Con el destornillador podés sacar la bisagra de la caja.'
          : 'La caja tiene candado. Sin herramienta va a costar.',
        t: s => s.inventario.llave ? 0 : s.inventario.destornillador ? 10 : 15,
        e: s => s.inventario.llave ? 0 : 5,
        da: s => (s.inventario.destornillador && !s.inventario.llave) ? 'llave' : null,
        resultado: s => s.inventario.llave ? 'Ya tenías la llave: seguiste sin perder tiempo ni energía.'
          : s.inventario.destornillador ? 'Sacás la bisagra con el destornillador: adentro está la llave de la salida.'
          : 'No pudiste abrir la caja. Perdiste tiempo y seguís sin llave.',
        next: 5 },
    ],
  },

  5: {
    etapa: 5,
    lugar: 'Puerta trasera de emergencia',
    fondo: 'apagado',
    filtro: 'puerta',
    titulo: 'La salida de emergencia',
    texto: 'Nico está frente a la pesada puerta trasera. Del otro lado está el patio de carga.',
    opciones: [
      { titulo: 'Usar la llave',
        detalle: s => s.inventario.llave ? 'Abrir en silencio.' : 'No tenés la llave. Vas a perder tiempo probando.',
        t: s => s.inventario.llave ? 5 : 20,
        e: s => s.inventario.llave ? 0 : 10,
        usaLlave: true, abreCon: 'llave', next: 6 },
      { titulo: 'Forzar la cerradura',
        detalle: s => s.inventario.palanca ? 'Con la palanca cuesta menos.' : 'Sin palanca, a fuerza bruta.',
        t: 10,
        e: s => s.inventario.palanca ? 10 : 20,
        abreCon: 'fuerza', next: 6 },
      { titulo: 'Desarmar la cerradura',
        detalle: s => s.inventario.destornillador ? 'Con el destornillador liberás el mecanismo sin romperlo.' : 'Sin herramienta, con las manos y mucha paciencia.',
        t: s => s.inventario.destornillador ? 8 : 20,
        e: s => s.inventario.destornillador ? 5 : 10,
        abreCon: 'precision', next: 6 },
    ],
  },

  6: {
    etapa: 6,
    lugar: 'Patio de carga',
    fondo: 'normal',
    filtro: 'exterior',
    titulo: 'La verja se está cerrando',
    texto: 'La puerta da al patio de carga. La verja exterior baja sola por el temporizador nocturno. Es la última decisión.',
    opciones: [
      { titulo: 'Correr y tirarse por debajo',
        detalle: 'Necesitás al menos 30% de energía para llegar.',
        t: 5, e: 20, necesitaEnergia: 30, final: 1 },
      { titulo: 'Trabar la verja',
        detalle: s => s.inventario.palanca ? 'Usar la palanca para frenar el mecanismo.' : 'Trabar el riel con las manos.',
        t: 10,
        e: s => s.inventario.palanca ? 5 : 25, final: 2 },
      { titulo: 'Buscar el panel de control', detalle: 'Cortar el motor de la verja.', t: 15, e: 5, final: 3 },
    ],
  },
};

// El final lo decide la opción de la Etapa 6. El texto empieza distinto según cómo se abrió la puerta.
const PUERTA = {
  llave: 'Había abierto la puerta trasera con la llave.',
  fuerza: 'Había forzado la puerta trasera.',
  precision: 'Había desarmado la cerradura con cuidado.',
};

const FINALES = {
  1: { nombre: 'Escape al límite', tipo: 'gano',
       texto: () => 'Nico se tiró al piso y pasó por debajo de la verja en el último segundo. Salió, pero el golpe y el ruido alertaron al guardia y tuvo que escapar corriendo por la calle.' },
  2: { nombre: 'La herramienta salvadora', tipo: 'gano',
       texto: s => s.inventario.palanca
         ? 'Nico encajó la palanca en el riel y frenó la verja el tiempo justo para cruzar. La palanca quedó trabada ahí, pero salió sin hacer casi ruido.'
         : 'Nico trabó el riel con su propio cuerpo. La verja se frenó unos segundos y logró pasar, aunque quedó agotado y el ruido alertó al guardia.' },
  3: { nombre: 'Salida silenciosa', tipo: 'gano',
       texto: () => 'Nico encontró el panel lateral y cortó el motor. La verja se detuvo del todo y pudo salir tranquilo antes de que el guardia llegara al patio.' },
  atrapado: { nombre: 'Atrapado', tipo: 'perdio' },
};

const OBJETOS = {
  llave:          { nombre: 'Llave',          icono: '🔑', uso: 'Abre la puerta trasera rápido y sin esfuerzo (Etapa 5).' },
  palanca:        { nombre: 'Palanca',        icono: '⛏️', uso: 'Forzar la puerta cuesta menos energía (Etapa 5) y traba la verja (Etapa 6).' },
  snack:          { nombre: 'Barra de cereal', icono: '🍫', uso: 'Se puede comer cuando quieras: +15 energía, −5 tiempo. Un solo uso.' },
  destornillador: { nombre: 'Destornillador', icono: '🪛', uso: 'Abre la caja de llaves (Etapa 4) y desarma la cerradura más rápido (Etapa 5).' },
};
