# Último turno — Aventura de Nico

Proyecto Integrador 2026 — **Sprint 3**. Aventura web de seis etapas con rutas alternativas, decisiones, variables de tiempo y energía, inventario y finales.

## Cómo ejecutar

1. Extraer la carpeta del proyecto.
2. Abrir `index.html` en un navegador actualizado (o usar Live Server desde VS Code).
3. Presionar **Empezar** y probar distintos recorridos. No requiere librerías externas.

## Archivos

- `index.html`: estructura y textos de la WebApp.
- `styles.css`: interfaz adaptable, efectos y variantes visuales provisionales por zona.
- `game.js`: seis etapas, rutas, decisiones, variables, inventario y finales.
- `media/pasillo.png`: fondo de la etapa 1 (salida del baño) y de la pantalla de derrota.
- `media/escenarios/*.svg`: un fondo propio para cada lugar del recorrido (ver tabla más abajo).
- `media/escenarios/_fuente/`: código Python que genera los SVG (`python3 scenes.py`), para poder retocarlos.
- `media/nico.svg`: personaje utilizado en la WebApp.
- `CONTRIBUCIONES.md`: registro de aportes individuales a completar con nombres y evidencias reales.


## Correcciones aplicadas a partir de la devolución

- La decisión del Nodo 6 determina ahora tres desenlaces narrativos distintos: esprintar, trabar la verja o detener el motor desde el panel.
- El destornillador obtenido en fiambrería reduce el costo de tiempo y energía al desmontar la cerradura del Nodo 5.
- Si Nico ya tiene la llave, revisar de nuevo la caja de llaves no descuenta tiempo ni energía.
- Se eliminaron el enlace incorrecto al archivo editable FLA y la etiqueta de Sprint 1.
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

## Origen de los recursos gráficos (completar con el equipo)

- `media/pasillo.png`: **completar** herramienta/origen y qué retoques hizo el equipo.
- `media/nico.svg`: **completar** (exportado desde el archivo de Animate del equipo).
- `media/escenarios/*.svg`: generados con ayuda de un asistente de IA (Claude, de Anthropic) mediante código que dibuja los SVG (ver `_fuente/`). El equipo debe registrar acá qué revisó, ajustó o rehízo sobre esos fondos antes de la entrega final.

## Pendiente

- Unificar el estilo final de personaje, escenarios e interfaz según el apartado artístico y los mockups del Sprint 2 (la interfaz todavía usa una línea visual distinta).
- Exportar la animación hecha en Animate e integrarla en un momento concreto del juego.
- Registro de pruebas del Sprint 3 y registro real de participación del equipo.
