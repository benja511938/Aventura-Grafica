# Registro de aportes

## Sprint 3
- **Correa:** creó este repositorio y corrigió la versión del Sprint 3 (finales según la Etapa 6, destornillador, colores por zona).
- **Álvaro:** ilustración y animación de Nico en Adobe Animate.
- **Bauti:** revisión del mapa de nodos y textos.

## Sprint 4 (entrega del 3/11)
- **Matías:** separé el código en datos.js y juego.js, uso de objetos, condición de la Etapa 6, colores del Sprint 2, pruebas y el documento. Gran parte se hizo con ayuda de IA (ver abajo).
- **Correa:** revisión del balance de tiempo y energía, fondos del supermercado.
- **Bauti:** íconos del inventario (en proceso).
- **Álvaro:** personajes pendientes (Nico cansado, guardia).

## Correcciones después de la devolución (12/11)
Hechas por Matías, cada una en su commit:
- juego.js: comentario de puertaAbiertaCon corregido (faltaba 'precision').
- juego.js: si la energía es menor a 30%, la opción "Correr" de la Etapa 6 se bloquea. Agregué una línea en elegir() para que no se pueda elegir con el teclado, y en renderNodo() el botón queda deshabilitado con un aviso.
- styles.css: estilo para el botón deshabilitado. Primero no se veía gris porque la animación "aparecer" dejaba la opacidad en 1; lo arreglé con !important.
- Se subió el video de la animación, que no estaba en el repositorio.
- Probé la prueba 5 de nuevo y guardé la captura en docs/capturas.

## Uso de IA
Usamos IA (ChatGPT / Claude) como ayuda en:
- **Código:** juego.js y datos.js. Lo revisamos y probamos jugando, y las correcciones del 12/11 las hice yo.
- **CSS y diseño de la web.**
- **Texto del PDF:** redacción y tablas.
- **Imágenes:** con IA solo se hicieron los fondos SVG del Sprint 3 (oficina, taller, depósito, etc.). Se generaron con un script de Python (correcion sprint 3/media/escenarios/_fuente/scenes.py) escrito con ayuda de IA. En el Sprint 4 no se usan: el juego usa el fondo del pasillo. El fondo del pasillo y la ilustración de Nico no se hicieron con IA.

Prompts: no guardamos los chats del Sprint 4. A partir de ahora vamos a guardar los prompts y las respuestas en docs/ia/ para poder mostrarlos.