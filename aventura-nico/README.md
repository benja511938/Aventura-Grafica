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
- `media/pasillo.png`: fondo base provisional del supermercado.
- `media/nico.svg`: personaje utilizado en la WebApp.
- `CONTRIBUCIONES.md`: registro de aportes individuales a completar con nombres y evidencias reales.


## Correcciones aplicadas a partir de la devolución

- La decisión del Nodo 6 determina ahora tres desenlaces narrativos distintos: esprintar, trabar la verja o detener el motor desde el panel.
- El destornillador obtenido en fiambrería reduce el costo de tiempo y energía al desmontar la cerradura del Nodo 5.
- Si Nico ya tiene la llave, revisar de nuevo la caja de llaves no descuenta tiempo ni energía.
- Se eliminaron el enlace incorrecto al archivo editable FLA y la etiqueta de Sprint 1.
- Se agregaron variaciones de encuadre y tratamiento de color por zona como recurso provisorio. **No son fondos nuevos**: la producción de escenarios específicos sigue pendiente para los siguientes avances.

## Animación de Adobe Animate — pendiente de exportación visible

El archivo `.fla` es el editable, pero no es una animación reproducible directamente en el navegador. La WebApp todavía muestra el SVG de Nico y efectos CSS; eso no reemplaza la animación obligatoria de Animate.

Para completar la integración, abrir `Luces_y_reaccion_5s.fla` en Adobe Animate, exportar la animación como video H.264/MP4 (o GIF animado si la versión disponible no permite MP4), guardar el resultado en `media/animacion-nico.mp4` (o `.gif`) y luego integrarlo en la pantalla inicial: debe aparecer al iniciar la aventura, mostrando a Nico observando el pasillo, el parpadeo/apagón de luces y su reacción de sorpresa. **No marcar esta integración como terminada hasta que el archivo exportado esté presente y probado en el navegador.**

## Estilo visual y recursos

La interfaz conserva una paleta verde/gris de supermercado y el personaje SVG existente. Las variantes del fondo ayudan a identificar zonas, pero todavía se reutiliza una sola imagen de pasillo. Deben reemplazarse progresivamente por fondos específicos y verificarse contra los mockups y la definición artística del Sprint 2.

## Uso de recursos generados o asistidos por IA

Completar la tabla de `CONTRIBUCIONES.md` indicando qué recursos fueron generados con IA (si corresponde), herramienta utilizada, cambios manuales realizados por el equipo y quién realizó la adaptación. No atribuir autorías o procesos que no se puedan demostrar.
