// =============================================================
// juego.js — Estado, reglas y pantallas del juego.
// Usa NODOS, FINALES y OBJETOS de datos.js
// =============================================================

// ---------- Estado ----------
function estadoInicial() {
  return {
    tiempo: 100,
    energia: 100,
    inventario: { llave: false, palanca: false, snack: false, destornillador: false },
    nodo: 1,
    puertaAbiertaCon: null,   // 'llave' o 'fuerza'
    fallaLlave: false,        // true si probó la llave sin tenerla
    recorrido: [],            // lista de decisiones tomadas
    final: null,
  };
}

let estado = estadoInicial();

// Si un dato es una función (depende del inventario), la ejecuta.
const valor = (v) => (typeof v === 'function' ? v(estado) : v);
const limitar = (n) => Math.max(0, Math.min(100, n));

// Hora del local según el tiempo restante: 100% = 05:12, 0% = 06:00
function horaActual() {
  const minutos = Math.round(12 + (100 - estado.tiempo) * 0.48);
  return minutos >= 60 ? '06:00' : `05:${String(minutos).padStart(2, '0')}`;
}

// ---------- Reglas ----------
function elegir(indice) {
  const nodo = NODOS[estado.nodo];
  const opcion = opcionesVisibles()[indice];
  if (!opcion || estado.final) return;

  const antes = { tiempo: estado.tiempo, energia: estado.energia };
  const resultado = valor(opcion.resultado) || '';
  const objeto = valor(opcion.da);

  // 1. Restar tiempo y energía
  estado.tiempo = limitar(estado.tiempo - valor(opcion.t));
  estado.energia = limitar(estado.energia - valor(opcion.e));

  // 2. Guardar objeto en el inventario
  if (objeto) estado.inventario[objeto] = true;

  estado.recorrido.push({ etapa: nodo.etapa, lugar: nodo.lugar, eleccion: opcion.titulo });
  if (opcion.alarma) mostrarAlarma();
  mostrarCambios(antes);

  // 3. Si se terminó el tiempo o la energía: Atrapado en ese mismo momento
  if (estado.tiempo <= 0 || estado.energia <= 0) return terminar('atrapado');

  // 4. Etapa 5: usar la llave sin tenerla no abre la puerta
  if (estado.nodo === 5 && opcion.usaLlave && !estado.inventario.llave) {
    estado.fallaLlave = true;
    estado.recorrido[estado.recorrido.length - 1].eleccion += ' (no abrió)';
    renderNodo('Ninguna llave entra en la cerradura. La puerta sigue cerrada: ahora tenés que forzarla o desarmarla.');
    return;
  }
  if (estado.nodo === 5) estado.puertaAbiertaCon = opcion.abreCon;

  // 5. Etapa 6: la opción elegida decide el final (1, 2 o 3)
  if (estado.nodo === 6) {
    if (opcion.necesitaEnergia && antes.energia < opcion.necesitaEnergia) return terminar('atrapado', 'verja');
    return terminar(opcion.final);
  }

  estado.nodo = opcion.next;
  renderNodo(resultado);
}

// En la Etapa 5, si ya falló la llave, solo quedan forzar o desarmar.
function opcionesVisibles() {
  const opciones = NODOS[estado.nodo].opciones;
  return desfaseLetras() ? opciones.slice(1) : opciones;
}
const desfaseLetras = () => (estado.nodo === 5 && estado.fallaLlave ? 1 : 0);

function comerSnack() {
  if (!estado.inventario.snack || estado.final || estado.nodo === null) return;
  const antes = { tiempo: estado.tiempo, energia: estado.energia };
  estado.inventario.snack = false;
  estado.energia = limitar(estado.energia + 15);
  estado.tiempo = limitar(estado.tiempo - 5);
  estado.recorrido.push({ etapa: NODOS[estado.nodo].etapa, lugar: 'Inventario', eleccion: 'Comió la barra de cereal' });
  mostrarCambios(antes);
  if (estado.tiempo <= 0) return terminar('atrapado');
  renderNodo('Te comés la barra de cereal: +15 energía, −5 tiempo.');
}

function terminar(numero, motivo) {
  let texto;
  if (numero !== 'atrapado') {
    texto = `${PUERTA[estado.puertaAbiertaCon]} ${FINALES[numero].texto(estado)}`;
  } else {
    if (motivo === 'verja') texto = 'Nico corrió hacia la verja, pero no le dieron las piernas: la verja bajó antes. Se quedó encerrado en el patio hasta que llegó el guardia.';
    else if (estado.tiempo <= 0) texto = 'Se hicieron las 6:00. El guardia abrió el local y encontró a Nico adentro.';
    else texto = 'Nico estaba tan cansado que se desplomó. A las 6:00 el guardia lo encontró dormido en el piso.';
  }
  estado.final = { numero, texto };
  renderFinal();
}

// ---------- Pantallas ----------
const $ = (id) => document.getElementById(id);

function mostrarPantalla(nombre) {
  for (const p of ['inicio', 'juego']) $(`pantalla-${p}`).hidden = p !== nombre;
}

function empezar() {
  estado = estadoInicial();
  mostrarPantalla('juego');
  $('escena').classList.remove('alarma');
  $('btn-reiniciar').hidden = false;
  reproducirCinematica(() => renderNodo());
}

function renderNodo(mensaje = '') {
  const nodo = NODOS[estado.nodo];
  const escena = $('escena');

  escena.dataset.fondo = nodo.fondo;
  escena.dataset.filtro = nodo.filtro || '';
  escena.classList.toggle('titila', !!nodo.titila);
  escena.classList.remove('perdio', 'gano');
  $('nico').className = 'nico' + (estado.energia <= 25 ? ' cansado' : '');

  $('lugar').textContent = nodo.lugar;
  $('etapa').textContent = `Etapa ${nodo.etapa} de 6`;
  $('progreso-etapas').style.setProperty('--avance', (nodo.etapa - 1) / 6);
  $('titulo-nodo').textContent = nodo.titulo;
  $('texto-nodo').textContent = nodo.texto;

  const aviso = $('aviso');
  aviso.textContent = mensaje;
  aviso.hidden = !mensaje;

  const lista = $('opciones');
  lista.replaceChildren();
  const salto = desfaseLetras(); // si falló la llave, las opciones siguen siendo B y C
  opcionesVisibles().forEach((op, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'opcion';
    btn.style.animationDelay = `${i * 70}ms`;
    btn.innerHTML = `<span class="letra"></span><span class="op-texto"><strong></strong><small></small></span><span class="costo"></span>`;
    btn.querySelector('.letra').textContent = 'ABC'[i + salto];
    btn.querySelector('strong').textContent = op.titulo;
    btn.querySelector('small').textContent = valor(op.detalle);
    btn.querySelector('.costo').textContent = textoCosto(op);
    btn.addEventListener('click', () => elegir(i));
    lista.append(btn);
  });

  $('panel-final').hidden = true;
  $('panel-historia').hidden = false;
  $('panel-historia').classList.remove('entra');
  void $('panel-historia').offsetWidth; // reinicia la animación de entrada
  $('panel-historia').classList.add('entra');
  actualizarIndicadores();
}

function textoCosto(op) {
  const t = valor(op.t), e = valor(op.e), partes = [];
  if (t) partes.push(`⏱ −${t}`);
  if (e > 0) partes.push(`⚡ −${e}`);
  if (e < 0) partes.push(`⚡ +${-e}`);
  return partes.join('  ') || 'sin costo';
}

function actualizarIndicadores() {
  for (const [clave, val] of [['tiempo', estado.tiempo], ['energia', estado.energia]]) {
    $(`valor-${clave}`).textContent = `${val}%`;
    const barra = $(`barra-${clave}`);
    barra.style.width = `${val}%`;
    barra.parentElement.classList.toggle('bajo', val <= 25);
    barra.parentElement.setAttribute('aria-valuenow', val);
  }
  $('hora').textContent = horaActual();

  const inv = $('inventario');
  inv.replaceChildren();
  for (const [clave, obj] of Object.entries(OBJETOS)) {
    const tiene = estado.inventario[clave];
    const li = document.createElement('li');
    li.className = 'objeto' + (tiene ? ' tiene' : '');
    li.title = obj.uso;
    li.innerHTML = `<span class="icono" aria-hidden="true"></span><span class="nombre"></span>`;
    li.querySelector('.icono').textContent = obj.icono;
    li.querySelector('.nombre').textContent = obj.nombre;
    if (clave === 'snack' && tiene && !estado.final) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'usar';
      btn.textContent = 'Comer';
      btn.addEventListener('click', comerSnack);
      li.append(btn);
    }
    inv.append(li);
  }

  const lista = $('recorrido');
  lista.replaceChildren();
  estado.recorrido.forEach((paso) => {
    const li = document.createElement('li');
    li.textContent = `Etapa ${paso.etapa} · ${paso.lugar}: ${paso.eleccion}`;
    lista.append(li);
  });
  if (!estado.recorrido.length) lista.innerHTML = '<li class="vacio">Todavía no tomaste decisiones.</li>';
}

// Números flotantes que muestran cuánto cambió cada barra
function mostrarCambios(antes) {
  for (const [clave, previo] of [['tiempo', antes.tiempo], ['energia', antes.energia]]) {
    const dif = estado[clave] - previo;
    if (!dif) continue;
    const span = document.createElement('span');
    span.className = 'delta ' + (dif > 0 ? 'sube' : 'baja');
    span.textContent = (dif > 0 ? '+' : '') + dif;
    $(`ind-${clave}`).append(span);
    span.addEventListener('animationend', () => span.remove());
  }
}

function mostrarAlarma() {
  const escena = $('escena');
  escena.classList.remove('alarma');
  void escena.offsetWidth;
  escena.classList.add('alarma');
}

function renderFinal() {
  const f = estado.final, info = FINALES[f.numero];
  const escena = $('escena');
  escena.classList.remove('titila');
  escena.classList.add(info.tipo);
  escena.dataset.fondo = info.tipo === 'gano' ? 'normal' : 'apagado';
  escena.dataset.filtro = info.tipo === 'gano' ? 'amanecer' : '';
  $('nico').className = 'nico ' + (info.tipo === 'gano' ? 'festeja' : 'atrapado');
  $('lugar').textContent = info.tipo === 'gano' ? 'Afuera, en la calle' : 'Supermercado';
  $('etapa').textContent = 'Final';
  $('progreso-etapas').style.setProperty('--avance', 1);

  $('panel-historia').hidden = true;
  const panel = $('panel-final');
  panel.hidden = false;
  panel.className = 'panel panel-final ' + info.tipo;
  $('final-etiqueta').textContent = info.tipo === 'gano' ? '¡Lograste salir!' : 'Game over';
  $('final-titulo').textContent = f.numero === 'atrapado' ? 'Atrapado' : `Final ${f.numero} · ${info.nombre}`;
  $('final-texto').textContent = f.texto;
  $('final-datos').textContent = `Tiempo restante: ${estado.tiempo}% · Energía restante: ${estado.energia}% · Decisiones: ${estado.recorrido.length}`;
  actualizarIndicadores();
  $('btn-otra-vez').focus();
}

// ---------- Cinemática (animación exportada de Adobe Animate) ----------
function reproducirCinematica(alTerminar) {
  const capa = $('cinematica'), video = $('video-nico');
  let listo = false;
  const cerrar = () => {
    if (listo) return;
    listo = true;
    video.pause();
    capa.hidden = true;
    alTerminar();
  };
  // Si el video no está o no se puede reproducir, se sigue directo al juego.
  if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) return cerrar();
  capa.hidden = false;
  video.currentTime = 0;
  video.onended = cerrar;
  video.onerror = cerrar;
  $('btn-saltar').onclick = cerrar;
  video.play().catch(cerrar);
}

// ---------- Eventos ----------
$('btn-empezar').addEventListener('click', empezar);
$('btn-otra-vez').addEventListener('click', empezar);
$('btn-reiniciar').addEventListener('click', () => {
  estado = estadoInicial();
  $('btn-reiniciar').hidden = true;
  mostrarPantalla('inicio');
});
$('btn-ayuda').addEventListener('click', () => $('ayuda').showModal());
$('btn-cerrar-ayuda').addEventListener('click', () => $('ayuda').close());

// Atajos de teclado: 1, 2 y 3 eligen las opciones A, B y C
document.addEventListener('keydown', (ev) => {
  if ($('pantalla-juego').hidden || estado.final || !$('cinematica').hidden || $('ayuda').open) return;
  const n = Number(ev.key) - 1 - desfaseLetras();
  if (n >= 0 && n < opcionesVisibles().length) elegir(n);
});

mostrarPantalla('inicio');
