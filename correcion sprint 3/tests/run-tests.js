// Pruebas automatizadas del juego con Playwright (clics reales sobre los botones de decisión).
// Uso:  node tests/run-tests.js          -> imprime el resultado y genera tests/resultados.json
// Para fijar el azar de las decisiones con probabilidad: r=0.1 => sale bien, r=0.9 => sale mal.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
const results = [];

async function escenario(browser, id, nombre, r, pasos, esperado) {
  const page = await browser.newPage();
  const errores = [];
  page.on('pageerror', e => errores.push(e.message));
  await page.addInitScript(v => { Math.random = () => v; }, r);
  await page.goto(url);
  await page.click('#start-game');
  for (const p of pasos) {
    if (p === 'R') await page.click('#play-again');
    else await page.click(`.choice-button:nth-child(${p.charCodeAt(0) - 64})`);
  }
  const txt = async sel => (await page.textContent(sel)).trim();
  const final = await page.isVisible('#final-card h2');
  const obtenido = {
    final: final ? await txt('#final-card h2') : '(sin final)',
    tiempo: await txt('#time-value'), energia: await txt('#energy-value'),
    llave: await txt('[data-item=key] b'), palanca: await txt('[data-item=lever] b'),
    snack: await txt('[data-item=snack] b'), destornillador: await txt('[data-item=screwdriver] b'),
    botones: final ? 0 : await page.locator('.choice-button').count(),
    fondo: (await page.getAttribute('.scene-background', 'src')).split('/').pop(),
    intro: await page.isVisible('#intro-copy'),
    errores: errores.length,
  };
  const recorrido = await page.$$eval('#trail li', l => l.map(x => x.textContent));
  const fallos = Object.entries(esperado).filter(([k, v]) => obtenido[k] !== v)
    .map(([k, v]) => `${k}: esperado "${v}", obtenido "${obtenido[k]}"`);
  results.push({ id, nombre, pasos: pasos.join(' '), recorrido, azar: r, esperado, obtenido, ok: !fallos.length, fallos });
  await page.close();
}

(async () => {
  const browser = await chromium.launch();
  const T = (...a) => escenario(browser, ...a);
  await T('P01', 'Final 1 · esprintar (oficina → llave)', 0.1, [...'AAACAA'],
    { final: 'Final 1 · Escape al límite', tiempo: '55%', energia: '65%', llave: 'Sí', fondo: 'exterior_amanecer.svg', errores: 0 });
  await T('P02', 'Final 2 · trabar la verja CON palanca', 0.1, [...'AAAAAB'],
    { final: 'Final 2 · La herramienta salvadora', tiempo: '50%', energia: '70%', palanca: 'Sí', llave: 'Sí', errores: 0 });
  await T('P03', 'Final 2 · trabar la verja SIN palanca', 0.1, [...'BAABBB'],
    { final: 'Final 2 · A pura fuerza', tiempo: '50%', energia: '25%', palanca: 'No', errores: 0 });
  await T('P04', 'Final 3 · panel de control (conducto → destornillador)', 0.1, [...'CABBCC'],
    { final: 'Final 3 · Salida silenciosa', tiempo: '37%', energia: '60%', destornillador: 'Sí', errores: 0 });
  await T('P05', 'Derrota por tiempo', 0.9, [...'ACACAAB'],
    { final: 'Final · Atrapado', tiempo: '0%', fondo: 'pasillo.png', errores: 0 });
  await T('P06', 'Derrota por energía', 0.1, [...'CCBABA'],
    { final: 'Final · Atrapado', energia: '0%', fondo: 'pasillo.png', errores: 0 });
  await T('P07', 'Snack de la oficina: queda "Consumido" y la energía no pasa de 100%', 0.1, [...'AB'],
    { final: '(sin final)', snack: 'Consumido', energia: '100%', tiempo: '80%', errores: 0 });
  await T('P08', 'Snack de la fiambrería: queda "Consumido"', 0.1, [...'CAA'],
    { final: '(sin final)', snack: 'Consumido', energia: '95%', tiempo: '60%', errores: 0 });
  await T('P09', 'Caja de llaves sin llave, azar favorable → consigue la llave', 0.1, [...'BBCC'],
    { llave: 'Sí', tiempo: '55%', energia: '75%', errores: 0 });
  await T('P10', 'Caja de llaves sin llave, azar desfavorable → sigue sin llave', 0.9, [...'BBCC'],
    { llave: 'No', tiempo: '55%', energia: '75%', errores: 0 });
  await T('P11', 'Caja de llaves con llave previa → no descuenta nada', 0.9, [...'AAAC'],
    { llave: 'Sí', tiempo: '65%', energia: '85%', errores: 0 });
  await T('P12', 'Puerta trasera sin llave → no abre y quedan 2 opciones', 0.1, [...'BAABA'],
    { final: '(sin final)', tiempo: '50%', energia: '60%', llave: 'No', botones: 2, errores: 0 });
  await T('P13', 'Destornillador reduce el costo de la cerradura (−8 / −5)', 0.1, [...'CABBC'],
    { tiempo: '52%', energia: '65%', destornillador: 'Sí', errores: 0 });
  await T('P14', 'Sin destornillador, la cerradura cuesta más (−20 / −10)', 0.1, [...'BAABC'],
    { tiempo: '50%', energia: '60%', destornillador: 'No', errores: 0 });
  await T('P15', 'Trepar el estante, azar desfavorable → −5 de energía extra', 0.9, [...'BC'],
    { tiempo: '80%', energia: '75%', errores: 0 });
  await T('P16', 'Trepar el estante, azar favorable → sin energía extra', 0.1, [...'BC'],
    { tiempo: '80%', energia: '80%', errores: 0 });
  await T('P17', 'Reiniciar tras un final → vuelve a la portada y limpia el inventario', 0.1, [...'AAACAA', 'R'],
    { intro: true, llave: 'No', palanca: 'No', snack: 'No', destornillador: 'No', tiempo: '100%', energia: '100%', fondo: 'pasillo.png', errores: 0 });
  // P18: la animación de Animate se reproduce al empezar y se oculta al terminar (dura 4 s)
  {
    const page = await browser.newPage(); const errores = [];
    page.on('pageerror', e => errores.push(e.message));
    await page.goto(url); await page.click('#start-game'); await page.waitForTimeout(1200);
    const durante = await page.isVisible('#intro-clip');
    const nicoOculto = await page.$eval('#nico', e => e.style.visibility === 'hidden');
    await page.waitForTimeout(4000);
    const despues = await page.isVisible('#intro-clip');
    const botones = await page.locator('.choice-button').count();
    const ok = durante && nicoOculto && !despues && botones === 3 && !errores.length;
    results.push({ id: 'P18', nombre: 'Animación de Animate: se reproduce al empezar y luego se oculta', pasos: 'Empezar', recorrido: ['Presionar "Empezar" y esperar 5 s'], azar: 0,
      esperado: { 'Video visible a 1,2 s': 'sí', 'Nico oculto durante el video': 'sí', 'Video visible a 5 s': 'no', 'Opciones de la etapa 1': '3' },
      obtenido: { 'Video visible a 1,2 s': durante ? 'sí' : 'no', 'Nico oculto durante el video': nicoOculto ? 'sí' : 'no', 'Video visible a 5 s': despues ? 'sí' : 'no', 'Opciones de la etapa 1': String(botones) },
      ok, fallos: ok ? [] : ['ver valores obtenidos'] });
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'resultados.json'), JSON.stringify(results, null, 2));
  for (const x of results) console.log(`${x.ok ? 'OK  ' : 'FAIL'} ${x.id} ${x.nombre}${x.ok ? '' : '\n     ' + x.fallos.join('\n     ')}`);
  console.log(`\n${results.filter(x => x.ok).length}/${results.length} pruebas correctas`);
  process.exit(results.every(x => x.ok) ? 0 : 1);
})();
