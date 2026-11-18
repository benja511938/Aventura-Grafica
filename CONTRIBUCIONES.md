# Registro de aportes

## Sprint 3
- **Correa:** creó este repositorio y corrigió la versión del Sprint 3 (finales según la Etapa 6, destornillador, colores por zona).
- **Álvaro:** ilustración y animación de Nico en Adobe Animate.
- **Bauti:** revisión del mapa de nodos y textos.
- **Matías:** estuve de intercambio durante el Sprint 3. Me sumé en el Sprint 4.

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

## Correcciones después de la devolución 2 (17/11)
- Matías: ordené el repositorio. La versión actual está en la raíz y saqué las carpetas viejas. La versión entregada quedó guardada en la etiqueta entrega-sprint-4.

## Uso de IA
Usamos IA (ChatGPT / Claude) como ayuda en:
- **Código:** juego.js y datos.js. Lo revisamos y probamos jugando. Las correcciones del 12/11 las hice yo (Matías) con ayuda de Claude.
- **CSS y diseño de la web.**
- **Texto del PDF:** redacción y tablas.
- **Imágenes:** con IA solo se hicieron los fondos SVG del Sprint 3 (oficina, taller, depósito, etc.). Se generaron con un script de Python escrito con ayuda de IA (estaba en la carpeta "correcion sprint 3"; se puede ver en la etiqueta entrega-sprint-4 de GitHub). En el Sprint 4 no se usan: el juego usa el fondo del pasillo. El fondo del pasillo y la ilustración de Nico no se hicieron con IA.

Los prompts del Sprint 4 original no los guardamos. Los de las correcciones están abajo.

## Prompts de Matías (Claude, 12/11 y 17/11)
Pedidos resumidos. Donde mandé una captura de pantalla o un archivo lo indico entre corchetes.

### 12/11 – Corrección del Sprint 4 (devolución 1)

**Pedido 1:** "Esto es lo que entregué en el Sprint 4. Esta era la consigna." [adjunté el PDF de la entrega, el proyecto y la consigna del Sprint 4]

**Pedido 2:** "Ayudame con la devolución que me hicieron: decime por dónde empezar a modificar para cumplir con lo que dice y qué cosas ya cumplí." [pegué la devolución 1]
- Qué hizo la IA: comparó la devolución con el código del repositorio, me dijo qué estaba cumplido y armó una lista de tareas.

**Pedido 3:** "Decime qué tengo que editar, en orden y paso a paso."
- Qué hizo la IA: me dio los pasos y las líneas de código para bloquear la opción "Correr" de la Etapa 6 con menos de 30% de energía.
- Qué hice yo: agregué las líneas en juego.js (en elegir() y en renderNodo()) y el estilo en styles.css, guardé y probé el recorrido de la prueba 5.

**Pedido 4:** [mandé captura del juego en la Etapa 6] La opción A decía "Te falta energía" pero no se veía gris.
- Qué hizo la IA: me explicó que la animación "aparecer" dejaba la opacidad en 1 y que había que usar !important.
- Qué hice yo: cambié la línea en styles.css, volví a probar y saqué las capturas (docs/capturas).

**Pedido 5:** "¿Dónde pongo la captura y cómo subo el video que falta?"
- Qué hice yo: subí el video de la animación y las capturas, cada cosa en su commit.

**Pedido 6:** "Ayudame a escribir la parte de imágenes y prompts, y armame el documento corregido en Word."
- Qué hizo la IA: redactó CONTRIBUCIONES.md y el documento corregido a partir del PDF original.
- Qué hice yo: le pasé qué partes se hicieron con IA, los apellidos del equipo y el resultado de la prueba 5 jugándola.

Commits de ese día: b2e69db, f21072d, 71d4d7d, 8885fe7, 9943d85, 4bd33c5.

### 17/11 – Devolución 2

**Pedido 7:** "Me hicieron una nueva devolución, necesito corregirlo." [pegué la devolución 2]
- Qué hizo la IA: separó qué me tocaba a mí y qué a mis compañeros.

**Pedido 8:** "¿Qué tienen que hacer exactamente mis compañeros? Dame un prompt para que hagan su parte."
- Qué hizo la IA: armó la lista de tareas de cada compañero y los prompts para que usen Gemini como guía.

**Pedido 9:** "¿Qué me queda hacer a mí?" [ordenar el repositorio]
- Qué hizo la IA: me dio los comandos de git para pasar la versión actual a la raíz.
- Qué hice yo: puse la etiqueta entrega-sprint-4, moví las carpetas con git mv, borré la versión vieja, probé el juego y lo subí.

## Sonidos y música (17/11) – Matías
- Grabé con el celular y edité en Audacity los sonidos del reloj, los pasos y la puerta trabada. Los proyectos (.aup4) y las grabaciones originales están en media/sonidos/fuente.
- Armé la música de fondo en BandLab combinando y editando loops del pack "Ambient Downtempo" (4 pistas, 100 bpm). Captura y link del proyecto en media/sonidos/fuente.
- Integré los sonidos al juego (juego.js) y los probé jugando.

**Pedido 10:** "Guiame para hacer los sonidos y la música, y dame el código para integrarlos al juego."
- Qué hizo la IA: me guió con Audacity y BandLab y escribió el código para reproducir los sonidos en juego.js (SONIDOS, sonar() y pararSonidos()).
- Qué hice yo: grabé y edité los 4 sonidos, armé la música, pegué el código, lo probé jugando y lo subí en commits separados.