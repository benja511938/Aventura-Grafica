# Recursos multimedia, uso de IA y animación

> ✏️ = lo tiene que completar el equipo. No inventen datos: si algo no se hizo, anótenlo como pendiente.

## 1. Inventario de recursos

| Recurso | Dónde se usa | Origen / herramienta | ¿Se usó IA? | Trabajo del equipo (selección, edición, adaptación) |
|---|---|---|---|---|
| `media/nico.svg` | Personaje en todas las escenas | Dibujado por Benjamín en **Adobe Illustrator**, en 3 capas (buzo, cara, pelo), tomando como referencia visual a un personaje de *JoJo's Bizarre Adventure*; luego importado y exportado desde Adobe Animate | No (según el equipo) ✏️ confirmar | Diseño y dibujo propios; separación en capas para poder animarlo |
| `media/pasillo.png` | Etapa 1 y pantalla de derrota | Generado con **inteligencia artificial** (✏️ nombre de la herramienta, prompt y fecha) | **Sí** | Seleccionado por el equipo e importado a Adobe Animate. ✏️ anotar si se hizo algún retoque o cuántas versiones se probaron antes de elegirlo |
| `media/escenarios/*.svg` (9 fondos) | Un fondo por lugar | Generados con ayuda de un asistente de IA (**Claude, de Anthropic**) mediante código que dibuja los SVG (`media/escenarios/_fuente/scenes.py` y `lib.py`) | **Sí** | ✏️ qué revisó, pidió cambiar, ajustó o rehízo el equipo en cada fondo, y fecha |
| `styles.css` | Interfaz | Escrito por el equipo ✏️ confirmar | ✏️ | ✏️ |
| `game.js`, `index.html` | Lógica y estructura | Escrito por el equipo ✏️ confirmar | ✏️ | ✏️ |

Para los fondos SVG se puede regenerar todo con `python3 media/escenarios/_fuente/scenes.py`.

## 2. Coherencia visual con el Sprint 2 ✏️

En el Sprint 2 **no se definió una identidad visual formal** (paleta, tipografías ni mockups). Por eso la estética actual no se desvía de algo previo, y las decisiones se justifican así (borrador para que el equipo ajuste):

- **Fondos:** un único estilo para todas las escenas (perspectiva de un punto de fuga, contorno oscuro, color plano) tomando como base la paleta de `pasillo.png`, para que todos los lugares parezcan del mismo mundo.
- **Interfaz:** sobria, en verdes y grises claros, para que no compita con las ilustraciones y se lea bien en celular.
- **Personaje:** Nico se dibujó a mano en capas (buzo, cara, pelo) para poder animarlo en Animate.
- **Pendiente:** para el próximo sprint, definir y escribir en el documento una paleta y tipografías únicas y llevarlas a la interfaz.


Tabla para completar con lo que hoy hay en pantalla (la columna de Sprint 2 queda como "no definido" si es el caso):

| Elemento | Definido en el Sprint 2 | Hoy en la WebApp | ¿Se unifica o se justifica el cambio? |
|---|---|---|---|
| Paleta de color | No definido | Interfaz en verdes/grises (`#355843`, `#e5eddd`…); fondos con rojo, verde azulado, cartón, azul y amarillo | ✏️ |
| Tipografías | No definido | Arial (interfaz) y Georgia (leyendas sobre la escena) | ✏️ |
| Estilo del personaje | No definido | Nico (vectorial, de Animate) | ✏️ |
| Estilo de fondos | No definido | Perspectiva de un punto de fuga, contorno oscuro, color plano con trama | ✏️ |
| Maquetas / mockups de la interfaz | No definido | Cabecera, escena, barras de estado, inventario y tarjeta de decisiones | ✏️ |

## 3. Animación de personaje en Adobe Animate

**Cómo se hizo (5/11/2026):** el dibujo de Nico (3 capas: buzo, cara, pelo) es del equipo. El movimiento (respiración del buzo, giro de la cabeza, balanceo del pelo y dos parpadeos, 96 fotogramas a 24 fps) se armó con ayuda de un asistente de IA (Claude), que preparó las interpolaciones sobre el archivo `.fla`; el equipo lo abrió en Adobe Animate, lo revisó y lo exportó. ✏️ confirmar/ajustar lo que el equipo cambió a mano.

### Estado anterior (referencia)

**Estado del archivo `animate 5 seg.fla` (revisado el 5/11/2026):** el documento tiene 4 capas (buzo, cara, pelo y el fondo `pasillo.png`) y una línea de tiempo de 120 fotogramas (5 s), pero **cada capa tiene un único fotograma clave estático y ninguna interpolación**: hoy no hay movimiento, por lo que una exportación saldría como 5 segundos de imagen fija. Falta animar algo (por ejemplo, un parpadeo, mover la cabeza o el torso, o un temblor del pelo).

**Qué falta según la devolución:** una **exportación visible** (video o GIF animado) de la animación de personaje, de **2 a 5 segundos**, e indicar **en qué escena se usa y qué acción la activa**. Las animaciones CSS de la WebApp (flotar, saltar, parpadeo de luces) no reemplazan esta producción.

**Qué tiene que hacer el equipo ✏️:**
1. Abrir el archivo editable de Animate y **crear el movimiento** (clic derecho sobre la capa → *Crear interpolación clásica*, y mover/rotar la capa en un fotograma intermedio y en el final; ver ideas arriba), con una duración de 2 a 5 s.
2. Exportar: *Archivo → Exportar → Exportar video/GIF animado* (MP4 o GIF) o *Publicar* en HTML5 Canvas. Guardar en `media/animacion/` con un nombre claro (ej. `nico_susto.mp4`).
3. Subir también el `.fla`/`.xfl` editable a `media/animacion/fuente/`.
4. Integrarla en el juego (puedo ayudar a hacerlo en cuanto esté el archivo exportado).

**Propuesta de integración** (el equipo decide):

| Opción | Escena | Acción que la activa |
|---|---|---|
| A | Final de derrota ("Atrapado") | Se reproduce cuando el tiempo o la energía llegan a 0, en lugar del saltito CSS actual (`is-surprised`) |
| B | Fiambrería (etapa 3B) | Se reproduce al entrar, junto con el parpadeo de luces |
| C | Calle al amanecer (finales de escape) | Se reproduce al mostrar el final: Nico respira aliviado |

**Integración ya preparada en el código:** la animación se reproduce **en la etapa 1 (pasillo), al presionar "Empezar"**, sobre la escena; con un clic se saltea y, si el archivo no existe, el juego sigue normal. Solo hay que guardar el video exportado como `media/animacion/nico_intro.mp4`. Se eligió esa escena porque el archivo de Animate ya incluye el pasillo de la etapa 1 como fondo. Si prefieren otra opción de la tabla, avisen y se cambia.

**Definición final:** escena = Etapa 1 (pasillo) · acción que la activa = presionar "Empezar" · duración = 4 s (96 fotogramas, 24 fps, 640×480) · archivos = `media/animacion/nico_intro.mp4` (exportado desde Animate) y `nico_intro.webm` (respaldo) · editable = `media/animacion/fuente/animate_5_seg_animado.fla`. Prueba automática: P18.
