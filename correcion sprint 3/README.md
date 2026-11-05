# Último turno — Aventura de Nico

Proyecto Integrador 2026 — **Sprint 3**. Aventura web de seis etapas con rutas alternativas, decisiones, variables de tiempo y energía, inventario y finales.

## Cómo ejecutar

1. Extraer la carpeta del proyecto.
2. Abrir `index.html` en un navegador actualizado (o usar Live Server desde VS Code).
3. Presionar **Empezar** y probar distintos recorridos. No requiere librerías externas.

## Estructura del repositorio

Un único proyecto, ubicado en la raíz del repositorio. Las mejoras se agregan encima con cada commit.

```
index.html, styles.css, game.js     WebApp (HTML + CSS + JavaScript, sin librerías)
media/                              pasillo.png, nico.svg, escenarios/*.svg (+ _fuente/) y animacion/ (video de Animate + .fla)
docs/FINALES.md                     descripción de los finales según el juego actual
docs/REGISTRO-DE-PRUEBAS.md         pruebas realizadas, resultados, errores y correcciones
docs/RECURSOS-Y-ANIMACION.md        origen de recursos, uso de IA, coherencia visual y animación de Animate
tests/run-tests.js                  pruebas automatizadas (node tests/run-tests.js)
CONTRIBUCIONES.md                   participación del equipo y tablero
```

## Correcciones aplicadas a partir de la devolución

- La decisión del Nodo 6 determina ahora tres desenlaces narrativos distintos: esprintar, trabar la verja o detener el motor desde el panel.
- El destornillador obtenido en fiambrería reduce el costo de tiempo y energía al desmontar la cerradura del Nodo 5.
- Si Nico ya tiene la llave, revisar de nuevo la caja de llaves no descuenta tiempo ni energía.
- Se eliminaron el enlace incorrecto al archivo editable FLA y la etiqueta de Sprint 1.
- El snack, una vez comido, figura como **Consumido** en el inventario.
- El Final 2 se llama "La herramienta salvadora" solo si Nico tiene la palanca; sin ella es "A pura fuerza".
- Repositorio reordenado: un único proyecto en la raíz (antes había una carpeta registrada como puntero roto y no se veían los archivos).
- Se reemplazaron las variaciones de color sobre un único pasillo por **fondos propios para cada lugar**. El fondo cambia automáticamente cuando Nico cambia de habitación (propiedad `bg` de cada nodo en `game.js`).

## Fondos por escenario

| Etapa / lugar | Archivo |
|---|---|
| 1 · Baño / pasillo principal | `media/pasillo.png` |
| 2A · Oficina del gerente | `media/escenarios/oficina.svg` |
| 2B · Pasillo del depósito | `media/escenarios/deposito_pasillo.svg` |
| 2C · Conductos de ventilación | `media/escenarios/ventilacion.svg` |
| 3A · Depósito central | `media/escenarios/deposito_central.svg` |
| 3B · Fiambrería y cámaras de frío | `media/escenarios/fiambreria.svg` |
| 4 · Taller de mantenimiento | `media/escenarios/taller.svg` |
| 5 · Puerta trasera de emergencia | `media/escenarios/puerta_trasera.svg` |
| 6 · Patio de carga | `media/escenarios/patio_carga.svg` |
| Final de escape · Calle al amanecer | `media/escenarios/exterior_amanecer.svg` |
| Final de derrota | `media/pasillo.png` (oscurecido) |

Criterio visual: perspectiva de un punto de fuga, contorno de tinta oscuro, colores planos con trama de lápiz y la paleta de `pasillo.png` (rojo, verde azulado, cartón, azul y amarillo). El punto de fuga queda a la izquierda para que Nico, que aparece a la derecha, no tape los objetos importantes de cada escena.

## Recursos, uso de IA y animación

Ver `docs/RECURSOS-Y-ANIMACION.md`. Resumen: los fondos `media/escenarios/*.svg` se generaron con ayuda de un asistente de IA (Claude, de Anthropic) mediante código (`_fuente/`); el origen de `pasillo.png` y `nico.svg` y el trabajo de edición del equipo están por completar en ese documento.

## Animación de Nico

Al presionar "Empezar" se reproduce `media/animacion/nico_intro.mp4` (4 s, exportada desde Adobe Animate) sobre la etapa 1; un clic la saltea. Detalles en `docs/RECURSOS-Y-ANIMACION.md`.

## Pruebas

Ver `docs/REGISTRO-DE-PRUEBAS.md`. Las pruebas automatizadas se ejecutan con `node tests/run-tests.js` (requiere Playwright).

## Pendiente

- Completar el registro de pruebas manuales y el registro real de participación del equipo (`CONTRIBUCIONES.md`).
- Unificar el estilo de personaje, escenarios e interfaz con el apartado artístico del Sprint 2, o justificar los cambios.
