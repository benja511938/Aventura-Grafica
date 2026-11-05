// animar_nico.jsfl
// Crea una animación de respiración para Nico: el buzo sube y baja, la cabeza (cara) lo acompaña con un
// leve giro y el pelo se balancea con un poco de retraso. Dura 96 fotogramas (4 s a 24 fps).
//
// USO: abrir "animate 5 seg.fla" -> Comandos > Ejecutar comando... -> elegir este archivo.
// El script NO guarda el archivo: probá la animación (Enter) y guardá vos con Archivo > Guardar.

(function () {
  var NOMBRES = { buzo: 'buzo', cara: 'cara', pelo: 'pelo', fondo: 'Capa_1' };
  var ULTIMO = 95;            // último fotograma (índice 0) => 96 fotogramas
  var MITAD = 47;
  var SUBE = 4;               // píxeles que sube el pecho/cabeza al respirar

  var doc = fl.getDocumentDOM();
  if (!doc) { alert('Abrí primero animate 5 seg.fla'); return; }
  var tl = doc.getTimeline();

  function indiceCapa(nombre) {
    for (var i = 0; i < tl.layers.length; i++) if (tl.layers[i].name == nombre) return i;
    throw new Error('No encuentro la capa "' + nombre + '"');
  }
  function elemento(idx, frame) {
    var f = tl.layers[idx].frames[frame];
    if (!f || !f.elements.length) throw new Error('La capa ' + tl.layers[idx].name + ' no tiene contenido en el fotograma ' + (frame + 1));
    return f.elements[0];
  }

  try {
    doc.frameRate = 24;

    // 1) Acortar todas las capas a 96 fotogramas (el fondo está bloqueado: se desbloquea un momento)
    for (var n in NOMBRES) {
      var i0 = indiceCapa(NOMBRES[n]);
      var estabaBloqueada = tl.layers[i0].locked;
      tl.layers[i0].locked = false;
      tl.currentLayer = i0;
      try { tl.removeFrames(ULTIMO + 1, 120); } catch (e) { fl.trace('removeFrames: ' + e); }
      if (n == 'fondo') {
        // el fondo solo tiene que llegar hasta el último fotograma
        if (tl.layers[i0].frames.length <= ULTIMO) tl.insertFrames(ULTIMO - tl.layers[i0].frames.length + 1, false);
        tl.layers[i0].locked = estabaBloqueada;
      }
    }

    // 2) Para cada pieza: convertir a símbolo, crear fotogramas clave y marcar interpolación clásica
    var piezas = [
      { capa: NOMBRES.buzo, simbolo: 'nico_buzo', claves: [ { f: MITAD, dy: -SUBE, rot: 0 } ] },
      { capa: NOMBRES.cara, simbolo: 'nico_cara', claves: [ { f: MITAD, dy: -SUBE, rot: 2 } ] },
      { capa: NOMBRES.pelo, simbolo: 'nico_pelo', claves: [
          { f: 23, dy: -2, rot: 3 }, { f: MITAD, dy: -SUBE, rot: 0 }, { f: 71, dy: -2, rot: -3 } ] }
    ];

    for (var p = 0; p < piezas.length; p++) {
      var pz = piezas[p];
      var idx = indiceCapa(pz.capa);
      tl.layers[idx].locked = false;
      tl.currentLayer = idx;
      tl.currentFrame = 0;

      doc.selectNone();
      doc.selection = [ tl.layers[idx].frames[0].elements[0] ];
      doc.convertToSymbol('graphic', pz.simbolo, 'center');

      var base = elemento(idx, 0);
      var x0 = base.x, y0 = base.y;

      // fotograma clave final (igual al inicial, para que sea un ciclo)
      tl.currentLayer = idx;
      tl.insertKeyframe(ULTIMO);

      var fotogramas = [0];
      for (var k = 0; k < pz.claves.length; k++) {
        tl.currentLayer = idx;
        tl.insertKeyframe(pz.claves[k].f);
        var el = elemento(idx, pz.claves[k].f);
        el.x = x0;
        el.y = y0 + pz.claves[k].dy;
        el.rotation = pz.claves[k].rot;
        fotogramas.push(pz.claves[k].f);
      }

      // interpolación clásica entre cada par de claves (con suavizado)
      for (var j = 0; j < fotogramas.length; j++) {
        var fr = tl.layers[idx].frames[fotogramas[j]];
        fr.tweenType = 'motion';
        try { fr.tweenEasing = 50; } catch (e2) {}
      }
    }

    tl.currentFrame = 0;
    alert('Listo: animación creada (96 fotogramas, 24 fps).\n\n1) Probala con Enter o Ctrl+Enter.\n2) Guardá con Archivo > Guardar.\n3) Exportá: Archivo > Exportar > Exportar video/GIF animado.');
  } catch (err) {
    alert('Algo falló: ' + err.message + '\n\nSi ya se hicieron cambios, usá Ctrl+Z varias veces o cerrá sin guardar y reabrí el archivo. Mandame este mensaje y lo corrijo.');
  }
})();
