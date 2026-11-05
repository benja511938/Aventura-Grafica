# Finales del juego (versión actual del Sprint 3)

> Texto listo para reemplazar la descripción de los finales en el documento del proyecto. Refleja exactamente lo que hace `game.js`.

## Cómo se llega a un final

El juego tiene **6 etapas**. Desde la etapa 1 hay tres rutas (oficina, depósito o ventilación) que se juntan en el taller (etapa 4), la puerta trasera (etapa 5) y el patio de carga (etapa 6).

- **En la etapa 5** el jugador abre la puerta con la llave, forzando la cerradura o desarmándola. Si intenta con la llave y no la tiene, pierde 20 de tiempo y 10 de energía y debe elegir otra forma.
- **En la etapa 6** la decisión final determina cuál de los **tres finales de escape** se obtiene. El texto del final empieza recordando cómo se abrió la puerta (con la llave / con precisión / a la fuerza).
- **En cualquier etapa**, si el tiempo o la energía llegan a 0, se produce el **final de derrota**.

## Finales de escape (etapa 6)

| Final | Decisión de la etapa 6 | Costo | Qué pasa |
|---|---|---|---|
| **Final 1 · Escape al límite** | Esprintar y pasar por debajo | −5 tiempo · −20 energía | Nico se tira al suelo y pasa por debajo de la verja en el último segundo. Sale, pero el golpe y el ruido alertan al guardia y tiene que escapar corriendo por la calle. |
| **Final 2 · La herramienta salvadora** | Trabar la verja, **con la palanca** (la que se lleva del taller en la etapa 4) | −10 tiempo · −5 energía | Nico encaja la palanca en el riel y detiene la verja el tiempo suficiente para cruzar. La herramienta queda atrapada, pero sale sin hacer demasiado ruido. |
| **Final 2 · A pura fuerza** | Trabar la verja, **sin la palanca** | −10 tiempo · −25 energía | Nico traba el riel con su propio cuerpo. La verja se detiene unos segundos y logra pasar, pero queda exhausto y el ruido alerta al guardia. |
| **Final 3 · Salida silenciosa** | Buscar el panel de control | −15 tiempo · −5 energía | Nico encuentra el panel lateral y corta la alimentación del motor: la verja se detiene por completo y sale con calma antes de que el guardia llegue al patio. |

Los tres finales de escape terminan en la calle al amanecer (`exterior_amanecer.svg`). Hay cuatro textos posibles de final de escape contando las dos variantes del Final 2; cada uno se combina con una de las tres frases iniciales sobre cómo se abrió la puerta trasera.

## Final de derrota · Atrapado

Fondo: pasillo oscurecido. Nico queda con la animación de sobresalto. Hay dos causas:

- **Tiempo en 0:** "Se hicieron las seis y el guardia encontró a Nico antes de que pudiera salir."
- **Energía en 0:** "El esfuerzo fue demasiado. Nico cayó desmayado antes de alcanzar la calle." (si ocurre al intentar abrir la puerta trasera con una llave que no tiene: "Nico se desplomó por el cansancio.")

## Qué cambia entre los finales según lo recolectado

| Elemento | Efecto en el juego |
|---|---|
| Llave | Permite abrir la puerta trasera por 5 de tiempo (etapa 5) y evita gastar recursos al revisar de nuevo la caja de llaves (etapa 4). Cambia la frase inicial del final. |
| Palanca | Baja el costo de "Trabar la verja" y cambia el título/texto del Final 2. |
| Destornillador | Baja el costo de desmontar la cerradura (−8 tiempo / −5 energía en vez de −20 / −10). |
| Snack | Recupera energía en el momento de comerlo (+10 en la oficina, +20 en la fiambrería). Después aparece como **Consumido** en el inventario; no se usa más adelante. |

## Mapa de etapas

| Etapa | Lugares posibles | Fondo |
|---|---|---|
| 1 | Baño / pasillo principal | `pasillo.png` |
| 2 | Oficina (2A) · Pasillo del depósito (2B) · Conductos de ventilación (2C) | `oficina.svg` · `deposito_pasillo.svg` · `ventilacion.svg` |
| 3 | Depósito central (3A) · Fiambrería y cámaras de frío (3B) | `deposito_central.svg` · `fiambreria.svg` |
| 4 | Taller de mantenimiento | `taller.svg` |
| 5 | Puerta trasera de emergencia | `puerta_trasera.svg` |
| 6 | Patio de carga | `patio_carga.svg` |
| Final de escape | Calle al amanecer | `exterior_amanecer.svg` |
