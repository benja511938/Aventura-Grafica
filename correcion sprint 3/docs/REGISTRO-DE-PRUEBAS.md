# Registro de pruebas — Último turno

> Este archivo está pensado para **acompañar al documento del proyecto** (el que viene desde el Sprint 1): copien cada sección en él y manténganlo actualizado en cada sprint. Las secciones marcadas con ✏️ las tiene que completar el equipo.

## 1. Cómo se probó

Se usaron dos tipos de prueba:

1. **Pruebas automatizadas** (`tests/run-tests.js`): un script abre `index.html` en un navegador (Chromium con Playwright), hace clic en los botones de decisión como lo haría una persona y compara el estado final (tiempo, energía, inventario, final y fondo) con lo que se espera según las reglas del juego. Para las decisiones con azar (50 %) el script fija el resultado para poder probar las dos ramas.
2. **Pruebas manuales** del equipo en el navegador (sección 4) ✏️.

Para volver a ejecutar las automatizadas: `npm i playwright` (una vez) y `node tests/run-tests.js`. Los resultados quedan en `tests/resultados.json`.

**Reglas que se verifican:** cada decisión descuenta tiempo y energía según su cartel; los valores se limitan entre 0 y 100; si tiempo o energía llegan a 0 el juego termina en derrota; el destornillador abarata la cerradura; con la llave ya en el inventario, la caja de llaves no descuenta nada; la última decisión (etapa 6) determina el final.

## 2. Resultados de las pruebas automatizadas

Última ejecución: **18 de 18 pruebas correctas** (fecha de ejecución: 5/11/2026, sobre la versión de este repositorio).

| ID | Qué se probó | Decisiones tomadas (en orden) | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| P01 | Final 1 · esprintar (oficina → llave) | Ir a la oficina del gerente → Forzar el cajón metálico → Tirar una lata al otro extremo → Revisar la caja de llaves → Probar la llave de salida → Esprintar y pasar por debajo | Final: Final 1 · Escape al límite; Tiempo: 55%; Energía: 65%; Llave: Sí; Fondo: exterior_amanecer.svg | Final: Final 1 · Escape al límite; Tiempo: 55%; Energía: 65%; Llave: Sí; Fondo: exterior_amanecer.svg | ✅ Correcto |
| P02 | Final 2 · trabar la verja CON palanca | Ir a la oficina del gerente → Forzar el cajón metálico → Tirar una lata al otro extremo → Llevar la palanca de hierro → Probar la llave de salida → Trabar la verja | Final: Final 2 · La herramienta salvadora; Tiempo: 50%; Energía: 70%; Palanca: Sí; Llave: Sí | Final: Final 2 · La herramienta salvadora; Tiempo: 50%; Energía: 70%; Palanca: Sí; Llave: Sí | ✅ Correcto |
| P03 | Final 2 · trabar la verja SIN palanca | Ir al pasillo del depósito → Empujar las cajas → Tirar una lata al otro extremo → Seguir sin herramientas → Forzar la cerradura → Trabar la verja | Final: Final 2 · A pura fuerza; Tiempo: 50%; Energía: 25%; Palanca: No | Final: Final 2 · A pura fuerza; Tiempo: 50%; Energía: 25%; Palanca: No | ✅ Correcto |
| P04 | Final 3 · panel de control (conducto → destornillador) | Meterse en el conducto de ventilación → Salir por la primera rejilla → Revisar los delantales → Seguir sin herramientas → Desarmar la cerradura con calma → Buscar el panel de control | Final: Final 3 · Salida silenciosa; Tiempo: 37%; Energía: 60%; Destornillador: Sí | Final: Final 3 · Salida silenciosa; Tiempo: 37%; Energía: 60%; Destornillador: Sí | ✅ Correcto |
| P05 | Derrota por tiempo | Ir a la oficina del gerente → Encender la computadora → Comer algo de la heladera del personal → Revisar la caja de llaves → Probar la llave de salida (sin éxito) → Forzar la cerradura → Trabar la verja | Final: Final · Atrapado; Tiempo: 0%; Fondo: pasillo.png | Final: Final · Atrapado; Tiempo: 0%; Fondo: pasillo.png | ✅ Correcto |
| P06 | Derrota por energía | Meterse en el conducto de ventilación → Patear una rejilla trabada → Avanzar agachado y en silencio → Llevar la palanca de hierro → Forzar la cerradura → Esprintar y pasar por debajo | Final: Final · Atrapado; Energía: 0%; Fondo: pasillo.png | Final: Final · Atrapado; Energía: 0%; Fondo: pasillo.png | ✅ Correcto |
| P07 | Snack de la oficina: queda "Consumido" y la energía no pasa de 100% | Ir a la oficina del gerente → Revisar el uniforme colgado | Final: (sin final); Snack: Consumido; Energía: 100%; Tiempo: 80% | Final: (sin final); Snack: Consumido; Energía: 100%; Tiempo: 80% | ✅ Correcto |
| P08 | Snack de la fiambrería: queda "Consumido" | Meterse en el conducto de ventilación → Salir por la primera rejilla → Comer algo de la heladera del personal | Final: (sin final); Snack: Consumido; Energía: 95%; Tiempo: 60% | Final: (sin final); Snack: Consumido; Energía: 95%; Tiempo: 60% | ✅ Correcto |
| P09 | Caja de llaves sin llave, azar favorable → consigue la llave | Ir al pasillo del depósito → Rodear por la fiambrería → Bordear las cámaras de frío → Revisar la caja de llaves | Llave: Sí; Tiempo: 55%; Energía: 75% | Llave: Sí; Tiempo: 55%; Energía: 75% | ✅ Correcto |
| P10 | Caja de llaves sin llave, azar desfavorable → sigue sin llave | Ir al pasillo del depósito → Rodear por la fiambrería → Bordear las cámaras de frío → Revisar la caja de llaves | Llave: No; Tiempo: 55%; Energía: 75% | Llave: No; Tiempo: 55%; Energía: 75% | ✅ Correcto |
| P11 | Caja de llaves con llave previa → no descuenta nada | Ir a la oficina del gerente → Forzar el cajón metálico → Tirar una lata al otro extremo → Revisar la caja de llaves | Llave: Sí; Tiempo: 65%; Energía: 85% | Llave: Sí; Tiempo: 65%; Energía: 85% | ✅ Correcto |
| P12 | Puerta trasera sin llave → no abre y quedan 2 opciones | Ir al pasillo del depósito → Empujar las cajas → Tirar una lata al otro extremo → Seguir sin herramientas → Probar la llave de salida (sin éxito) | Final: (sin final); Tiempo: 50%; Energía: 60%; Llave: No; Opciones visibles: 2 | Final: (sin final); Tiempo: 50%; Energía: 60%; Llave: No; Opciones visibles: 2 | ✅ Correcto |
| P13 | Destornillador reduce el costo de la cerradura (−8 / −5) | Meterse en el conducto de ventilación → Salir por la primera rejilla → Revisar los delantales → Seguir sin herramientas → Desarmar la cerradura con calma | Tiempo: 52%; Energía: 65%; Destornillador: Sí | Tiempo: 52%; Energía: 65%; Destornillador: Sí | ✅ Correcto |
| P14 | Sin destornillador, la cerradura cuesta más (−20 / −10) | Ir al pasillo del depósito → Empujar las cajas → Tirar una lata al otro extremo → Seguir sin herramientas → Desarmar la cerradura con calma | Tiempo: 50%; Energía: 60%; Destornillador: No | Tiempo: 50%; Energía: 60%; Destornillador: No | ✅ Correcto |
| P15 | Trepar el estante, azar desfavorable → −5 de energía extra | Ir al pasillo del depósito → Trepar por el estante caído | Tiempo: 80%; Energía: 75% | Tiempo: 80%; Energía: 75% | ✅ Correcto |
| P16 | Trepar el estante, azar favorable → sin energía extra | Ir al pasillo del depósito → Trepar por el estante caído | Tiempo: 80%; Energía: 80% | Tiempo: 80%; Energía: 80% | ✅ Correcto |
| P17 | Reiniciar tras un final → vuelve a la portada y limpia el inventario | Tus elecciones aparecerán acá. | Portada visible: sí; Llave: No; Palanca: No; Snack: No; Destornillador: No; Tiempo: 100%; Energía: 100%; Fondo: pasillo.png | Portada visible: sí; Llave: No; Palanca: No; Snack: No; Destornillador: No; Tiempo: 100%; Energía: 100%; Fondo: pasillo.png | ✅ Correcto |
| P18 | Animación de Animate: se reproduce al empezar y luego se oculta | Presionar "Empezar" y esperar 5 s | Video visible a 1,2 s: sí; Nico oculto durante el video: sí; Video visible a 5 s: no; Opciones de la etapa 1: 3 | Video visible a 1,2 s: sí; Nico oculto durante el video: sí; Video visible a 5 s: no; Opciones de la etapa 1: 3 | ✅ Correcto |

## 3. Errores encontrados y correcciones aplicadas

| # | Error | Cómo se detectó | Corrección | Prueba que lo verifica |
|---|---|---|---|---|
| 1 | La última decisión llevaba siempre al mismo final | Devolución 1 (docente) | La etapa 6 ahora produce tres desenlaces distintos (esprintar / trabar la verja / panel de control) | P01–P04 |
| 2 | El destornillador no tenía ninguna utilidad | Devolución 1 | Reduce el costo de desmontar la cerradura de la puerta trasera (−8 tiempo / −5 energía, contra −20 / −10 sin él) | P13, P14 |
| 3 | Buscar de nuevo en la caja de llaves descontaba recursos aunque ya se tuviera la llave | Devolución 1 | Si ya hay llave, la opción no descuenta nada | P11 |
| 4 | El snack seguía figurando como "Sí" en el inventario después de comerlo | Devolución 2 | El inventario ahora muestra **"Consumido"** (en gris) | P07, P08 |
| 5 | El final 2 se llamaba "La herramienta salvadora" aunque Nico no tuviera la palanca | Revisión del código para la Devolución 2 | Con palanca: "La herramienta salvadora"; sin palanca: **"A pura fuerza"** | P02, P03 |
| 6 | El mensaje del sándwich de la fiambrería decía "el envase te queda de recuerdo" (contradice que el snack se consumió) | Revisión de textos | Se quitó esa frase | P08 |
| 7 | El repositorio de GitHub no mostraba los archivos del juego: la carpeta "correcion sprint 3" estaba registrada como puntero (gitlink) a otro repositorio, y había proyectos en varias carpetas | Revisión de `git ls-files -s` (modo `160000`) | Se quitó el puntero y todo el proyecto quedó en la raíz del repositorio | — (ver `git log`) |

✏️ Agreguen acá cualquier otro error que encuentren al probar a mano.

## 4. Pruebas manuales del equipo ✏️

| Fecha | Integrante | Dispositivo / navegador | Recorrido (decisiones) | Resultado esperado | Resultado obtenido | ¿Error? ¿Cómo se corrigió? |
|---|---|---|---|---|---|---|
| 3/11/2026 (martes) | Benjamín | ✏️ navegador | Partida completa de punta a punta, al terminar de programar el juego | El juego se puede recorrer hasta un final | Se pudo recorrer ✏️ detallar recorridos y finales alcanzados | ✏️ errores que encontró y cómo los corrigió |
| | | | | | | |
| | | | | | | |

### Guion para probar a mano

Jueguen estos recorridos en el navegador, uno por integrante, y completen la fila con **lo que obtuvieron** (el esperado ya está calculado). Ojo: las opciones con azar (trepar el estante, caja de llaves) pueden salir distinto cada vez; anoten qué pasó.

| Recorrido (A, B, C = orden de los botones en cada etapa) | Esperado |
|---|---|
| A-A-A-C-A-A (oficina, llave, esprintar) | Final 1 · Escape al límite · Tiempo 55 % · Energía 65 % |
| A-A-A-A-A-B (oficina, palanca, trabar verja) | Final 2 · La herramienta salvadora · 50 % · 70 % |
| B-A-A-B-B-B (depósito, sin palanca, trabar verja) | Final 2 · A pura fuerza · 50 % · 25 % |
| C-A-B-B-C-C (ventilación, destornillador, panel) | Final 3 · Salida silenciosa · 37 % · 60 % |
| A-B (uniforme) y mirar el inventario | Snack "Consumido", energía 100 % |
| Elegir siempre la opción de más costo hasta quedarse sin energía o tiempo | Final · Atrapado |

Sugerencia: que cada integrante pruebe al menos un recorrido distinto (ruta oficina, ruta depósito, ruta ventilación) y una derrota, y lo anote acá con su nombre.
