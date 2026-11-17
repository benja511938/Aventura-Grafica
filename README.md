# Último turno — La aventura de Nico

Aventura gráfica de decisiones hecha con HTML, CSS y JavaScript.
Proyecto Integrador 2026 · Producción Multimedia / Funcionamiento de los Sistemas Digitales.

Nico se queda encerrado de noche en el supermercado donde trabaja. Tiene que encontrar una salida antes de las 6:00, que es cuando llega el guardia.

## Cómo jugar

Abrir `index.html` en el navegador (Chrome o Edge). No hace falta instalar nada.

- 6 etapas, 3 opciones en cada una.
- **Tiempo** (variable global) y **Energía** empiezan en 100%. Si alguna llega a 0, Nico queda atrapado.
- Objetos: llave, palanca, barra de cereal y destornillador. Cambian lo que cuestan algunas opciones.
- La última decisión define el final: **1 Escape al límite** (correr bajo la verja), **2 La herramienta salvadora** (trabarla), **3 Salida silenciosa** (panel de control). Si se acaba el tiempo o la energía, o corrés sin fuerzas, quedás **atrapado**.

## Cambios del Sprint 4

- Pantallas nuevas: inicio, ayuda, cinemática con la animación de Animate y final con resumen.
- Colores y tipografías de la identidad visual del Sprint 2.
- Sin azar: los resultados dependen de las decisiones y del inventario.
- El destornillador abre la caja de llaves del taller; la barra de cereal se come cuando quieras.
- Para correr bajo la verja hace falta 30% de energía.
- Código separado en `js/datos.js` (historia) y `js/juego.js` (reglas).

## Estructura

```
index.html                 pantallas: inicio, juego, final, ayuda, cinemática
css/styles.css             estilos, colores del Sprint 2 y animaciones CSS
js/datos.js                historia: nodos, opciones, costos, objetos y finales
js/juego.js                estado, reglas, cálculo de finales y pantallas
media/fondos/              fondos del supermercado (normal, apagado, flash)
media/personajes/nico.svg  Nico, sacado de las capas del archivo de Animate
media/animaciones/         animación de Nico exportada de Animate (mp4)
animate/                   archivo fuente .fla de Adobe Animate
```

## Equipo

Correa · Bauti · Álvaro · Matías
