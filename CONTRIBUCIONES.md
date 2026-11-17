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

## Correcciones después de la devolución 2 (17/11)
- Matías: ordené el repositorio. La versión actual está en la raíz y saqué las carpetas viejas. La versión entregada quedó guardada en la etiqueta entrega-sprint-4.

#### Uso de IA

Usamos IA (ChatGPT / Claude) como ayuda en:

- **Código:** juego.js y datos.js. Revisamos y probamos el código jugando, y las correcciones del 12/11 las realizamos entre todos.
- **CSS y diseño de la web.**
- **Texto del PDF:** redacción y tablas.
- **Imágenes:** con IA solo hicimos los fondos SVG del Sprint 3 (oficina, taller, depósito, etc.). Se generaron con un script de Python escrito con ayuda de IA (estaba en la carpeta "correcion sprint 3"; se puede ver en la etiqueta entrega-sprint-4 de GitHub). En el Sprint 4 no los usamos: el juego utiliza el fondo del pasillo. El fondo del pasillo y la ilustración de Nico no se hicieron con IA.

**Herramienta:** Claude (chat).  
**Fechas:** 12/11/2026 y 17/11/2026.

Estos son los pedidos que le hicimos, resumidos. Donde mandamos una captura de pantalla o un archivo lo indicamos entre corchetes.

## 12/11 – Corrección del Sprint 4 (devolución 1)

**Pedido 1:** "Esto es lo que entregamos en el Sprint 4. Esta era la consigna." [adjuntamos el PDF de la entrega, el proyecto y la consigna del Sprint 4]

**Pedido 2:** "Ayudanos con la devolución que nos hicieron: decinos por dónde empezar a modificar para cumplir con lo que dice y qué cosas ya cumplimos." [pegamos la devolución 1]
- **Qué hizo la IA:** comparó la devolución con el código del repositorio, nos dijo qué estaba cumplido y armó una lista de tareas.

**Pedido 3:** "Decinos qué tenemos que editar, en orden y paso a paso."
- **Qué hizo la IA:** nos dio los pasos y las líneas de código para bloquear la opción "Correr" de la Etapa 6 con menos de 30% de energía.
- **Qué hicimos nosotros:** agregamos las líneas en juego.js (en elegir() y en renderNodo()) y el estilo en styles.css, guardamos y probamos el recorrido de la prueba 5.

**Pedido 4:** [mandamos captura del juego en la Etapa 6] La opción A decía "Te falta energía" pero no se veía gris.
- **Qué hizo la IA:** nos explicó que la animación "aparecer" dejaba la opacidad en 1 y que había que usar !important.
- **Qué hicimos nosotros:** cambiamos la línea en styles.css, volvimos a probar y sacamos las capturas (docs/capturas).

**Pedido 5:** "¿Dónde ponemos la captura y cómo subimos el video que falta?"
- **Qué hicimos nosotros:** subimos el video de la animación y las capturas, cada cosa en su commit.

**Pedido 6:** "Ayudanos a escribir la parte de imágenes y prompts, y armá el documento corregido en Word."
- **Qué hizo la IA:** redactó CONTRIBUCIONES.md y el documento corregido a partir del PDF original.
- **Qué hicimos nosotros:** le pasamos qué partes se hicieron con IA, los apellidos del equipo y el resultado de la prueba 5 después de jugarla.

**Commits de ese día:** b2e69db, f21072d, 71d4d7d, 8885fe7, 9943d85, 4bd33c5.

## 17/11 – Devolución 2

**Pedido 7:** "Nos hicieron una nueva devolución, necesitamos corregirla." [pegamos la devolución 2]
- **Qué hizo la IA:** separó qué tareas le correspondían a cada integrante del equipo.

**Pedido 8:** "¿Qué tenemos que hacer exactamente? Decinos qué hace cada uno para organizarnos mejor."
- **Qué hizo la IA:** armó la lista de tareas de cada integrante y nos ayudó a organizarnos.

**Pedido 9:** "¿Qué nos queda hacer?" [ordenar el repositorio]
- **Qué hizo la IA:** nos dio los comandos de git para pasar la versión actual a la raíz.
- **Qué hicimos nosotros:** pusimos la etiqueta entrega-sprint-4, movimos las carpetas con git mv, borramos la versión vieja, probamos el juego y subimos los cambios.