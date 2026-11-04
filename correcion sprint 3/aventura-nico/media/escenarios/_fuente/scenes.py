from lib import *
import math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
os.makedirs(OUT, exist_ok=True)
BACK = (470, 255, 770, 405)

def save(name, body, defs='', grain=True):
    open(f'{OUT}/{name}.svg', 'w', encoding='utf-8').write(head(defs) + body + tail(grain))

def boxes_wall(side, t0, t1, rows, cols_t, back, cols=None):
    """filas de cajas de cartón pegadas a la pared"""
    o = []
    cols = cols or [PAL['card'], PAL['cardL'], PAL['card2']]
    for r, (f0, f1) in enumerate(rows):
        n = len(cols_t) - 1
        for i in range(n):
            a, b = cols_t[i], cols_t[i + 1]
            o.append(wall_quad(side, a + .004, b - .004, f0, f1, back, cols[(i + r) % len(cols)], 2.6, hatch=True))
            # etiqueta
            mx, my = pt_wall(side, (a + b) / 2, (f0 + f1) / 2 + .02, back)
            o.append(rect(mx - 6, my - 5, 12, 9, '#fbf8ee', 1.6))
    return '\n'.join(o)

def shelf_wall(side, t0, t1, back, levels=(0.04, 0.3, 0.56, 0.82), colors=None):
    o = []
    # montantes y baldas
    for f in levels:
        a = pt_wall(side, t0, f, back); b = pt_wall(side, t1, f, back)
        o.append(line(*a, *b, 4.2, PAL['steelD']))
    for t in (t0, t1):
        a = pt_wall(side, t, 0, back); b = pt_wall(side, t, .98, back)
        o.append(line(*a, *b, 5, PAL['steelD']))
    return '\n'.join(o)

# ------------------------------------------------------------ 2A OFICINA
def oficina():
    b = BACK
    o = [room(b, '#cfd6c4', '#b9a98c', '#e4e1d6', '#c2cab7', tiles=False)]
    # alfombra
    o.append(poly([(260, 700), (1080, 700), (820, 470), (460, 470)], '#8c6b55', hatch=True))
    o.append(poly([(330, 690), (1010, 690), (790, 480), (490, 480)], 'none', 2.2))
    # ventana en la pared de fondo con persiana (noche)
    o.append(rect(484, 270, 84, 66, PAL['night'], 3.4))
    for i in range(1, 5):
        yy = 270 + i * 13.2
        o.append(line(484, yy, 568, yy, 1.8, '#9cb4e6', .7))
    o.append(rect(484, 270, 84, 66, 'none', 3.4))
    # reloj de pared (tic tac) 5:12
    o.append(clock(738, 292, 20, 5, 12))
    # zócalo
    o.append(line(b[0], b[3] - 10, b[2], b[3] - 10, 2.4, INK, .5))
    # fichero metálico (izquierda) con cajones
    fx, fy, fw, fh = 150, 200, 170, 420
    o.append(cuboid(fx, fy, fw, fh, .8, PAL['steel']))
    for i in range(4):
        cy = fy + 14 + i * 100
        o.append(rect(fx + 14, cy, fw - 28, 88, PAL['steelL'], 2.8, 3))
        o.append(rect(fx + fw / 2 - 28, cy + 14, 56, 12, '#59636b', 2.4, 3))
        o.append(rect(fx + 32, cy + 46, 36, 18, '#fbf8ee', 1.8))
    # cajón forzado (el de arriba entreabierto)
    o.append(poly([(fx + 14, fy + 14), (fx + fw - 14, fy + 14), (fx + fw - 6, fy + 2), (fx + 22, fy + 2)], '#59636b', 2.6))
    # papeles asomando
    o.append(poly([(fx + 40, fy + 2), (fx + 90, fy - 22), (fx + 118, fy + 2)], '#f6f3ea', 2.2))
    o.append(poly([(fx + 96, fy + 2), (fx + 132, fy - 14), (fx + 150, fy + 2)], '#e8e4d6', 2.2))
    # escritorio con computadora (centro)
    dx, dy, dw, dh = 440, 405, 360, 18
    o.append(cuboid(dx, dy, dw, dh, .9, '#9a6b3f'))
    for lx in (dx + 14, dx + dw - 36):
        o.append(rect(lx, dy + dh, 22, 150, '#845a35', 3.0))
    o.append(rect(dx + 26, dy + dh + 6, dw - 52, 58, '#845a35', 3.0))
    o.append(rect(dx + dw / 2 - 20, dy + dh + 28, 40, 9, '#d5c29a', 2))
    # monitor
    mx, my = dx + 160, dy - 86
    o.append(rect(mx, my, 112, 70, '#2b3038', 3.6, 6))
    o.append(rect(mx + 8, my + 8, 96, 54, '#7ed3de', 2.2))
    o.append(line(mx + 20, my + 24, mx + 70, my + 24, 2, INK, .5))
    o.append(line(mx + 20, my + 38, mx + 86, my + 38, 2, INK, .5))
    o.append(line(mx + 20, my + 50, mx + 56, my + 50, 2, INK, .5))
    o.append(rect(mx + 46, my + 70, 20, 14, '#2b3038', 3))
    o.append(rect(mx + 26, my + 82, 60, 7, '#2b3038', 3, 3))
    # teclado y papeles
    o.append(poly([(dx + 170, dy + 3), (dx + 270, dy + 3), (dx + 262, dy + 14), (dx + 178, dy + 14)], '#4a5058', 2.4))
    o.append(poly([(dx + 40, dy), (dx + 110, dy), (dx + 100, dy + 10), (dx + 34, dy + 10)], '#f6f3ea', 2.2))
    # silla
    o.append(rect(dx + 130, dy + 70, 110, 22, '#b04a3a', 3, 8))
    o.append(poly([(dx + 140, dy + 70), (dx + 230, dy + 70), (dx + 222, dy + 6), (dx + 148, dy + 6)], '#b04a3a', 3))
    o.append(line(dx + 185, dy + 92, dx + 185, dy + 150, 4))
    o.append(line(dx + 140, dy + 152, dx + 230, dy + 152, 4))
    # perchero con el uniforme del gerente (derecha)
    px = 940
    o.append(line(px, 120, px, 640, 6, '#6b4a2b'))
    o.append(line(px - 60, 645, px + 60, 645, 7, '#6b4a2b'))
    o.append(line(px - 24, 130, px + 40, 140, 5, '#6b4a2b'))
    o.append(poly([(px - 30, 150), (px + 50, 150), (px + 78, 205), (px + 82, 400), (px + 50, 410), (px + 40, 340), (px + 36, 410), (px - 18, 410), (px - 24, 340), (px - 40, 410), (px - 70, 400), (px - 60, 205)], '#3d4a6b', 3.2, hatch=True))
    o.append(poly([(px - 12, 150), (px + 14, 230), (px + 38, 150)], '#e9e5d8', 2.4))
    o.append(rect(px + 22, 260, 28, 26, '#2f3a58', 2.4))
    o.append(circle(px - 2, 280, 4, '#d9c27a', 1.6))
    o.append(circle(px - 2, 330, 4, '#d9c27a', 1.6))
    # lámpara de escritorio y luz tenue
    o.append(lamp(1260, 0, 120, on=False))
    save('oficina', '\n'.join(o))

# ------------------------------------------------------------ 2B PASILLO DEL DEPÓSITO
def pasillo_deposito():
    b = (500, 270, 740, 400)
    o = [room(b, '#d9d4c5', '#cfc7b3', '#e9e6dc', '#d1ccbb')]
    # vigas turquesas, como en pasillo.png
    for t in (.28, .5, .7):
        xl = lerp(0, b[0], t); xr = lerp(W, b[2], t); y = lerp(0, b[1], t)
        o.append(line(xl, y, xr, y, 10, PAL['teal']))
        o.append(line(xl, y, xr, y, 3, INK))
    # estantes izquierda con cajas
    o.append(wall_quad('L', .05, .86, 0, .86, b, '#9aa6ad', hatch=True))
    o.append(boxes_wall('L', .05, .86, [(.04, .27), (.31, .55), (.59, .83)], [.05, .2, .36, .52, .66, .78, .86], b))
    o.append(shelf_wall('L', .05, .86, b, (.03, .29, .57, .85)))
    # derecha: cajas apiladas
    o.append(boxes_wall('R', .05, .5, [(.04, .3), (.34, .6), (.64, .9)], [.05, .17, .3, .42, .5], b))
    # abertura hacia la fiambrería (luz azulada, "a un costado")
    ox0, ox1 = .56, .8
    o.append(wall_quad('R', ox0, ox1, 0, .78, b, '#bfe0ec'))
    o.append(wall_quad('R', ox0, ox1, 0, .78, b, 'none', 4))
    pa = pt_wall('R', .68, .4, b)
    o.append(glow(pa[0] - 20, pa[1], 60, 90, '#e8f6ff', .45))
    # pila de cajas colapsadas bloqueando el paso (fondo/centro)
    o.append(cuboid(500, 290, 130, 110, .93, PAL['card']))
    o.append(cuboid(640, 308, 110, 92, .93, PAL['cardL']))
    o.append(cuboid(560, 232, 120, 66, .93, PAL['card2']))
    # cajas en el piso, desparramadas
    o.append(cuboid(330, 520, 190, 150, .82, PAL['card']))
    o.append(poly([(540, 640), (700, 600), (760, 660), (610, 700)], PAL['cardL'], 3))  # caja caída
    o.append(poly([(540, 640), (610, 700), (610, 716), (540, 658)], PAL['card2'], 3))
    o.append(cuboid(760, 470, 120, 100, .88, PAL['card2']))
    # estante caído (inclinado) a la derecha
    o.append(poly([(900, 640), (1060, 360), (1090, 372), (940, 660)], PAL['steel'], 3.2))
    o.append(poly([(1060, 360), (1210, 300), (1220, 316), (1090, 372)], PAL['steelD'], 3.2))
    for k in range(4):
        a = lerp(0, 1, k / 3)
        x0_, y0_ = lerp(920, 1075, a), lerp(650, 366, a)
        o.append(line(x0_, y0_, x0_ + 150, y0_ - 60, 3.4, PAL['steelD']))
    # latas desperdigadas
    for (cx, cy, c) in ((880, 664, PAL['red']), (940, 684, PAL['yellow']), (1000, 668, PAL['green'])):
        o.append(rect(cx, cy, 26, 32, c, 2.6, 4))
        o.append(line(cx, cy + 8, cx + 26, cy + 8, 1.6))
    # lámparas
    o.append(lamp(640, 0, 70))
    save('deposito_pasillo', '\n'.join(o))

# ------------------------------------------------------------ 3A DEPÓSITO CENTRAL
def deposito_central():
    b = (430, 240, 810, 410)
    o = [room(b, '#d4cfbf', '#c9c1ad', '#e7e4da', '#d0cab8')]
    for t in (.22, .42, .6, .76):
        xl = lerp(0, b[0], t); xr = lerp(W, b[2], t); y = lerp(0, b[1], t)
        o.append(line(xl, y, xr, y, 12, PAL['teal']))
        o.append(line(xl, y, xr, y, 3, INK))
    # estanterías altas a ambos lados
    for side, cols in (('L', [PAL['card'], PAL['blue'], PAL['yellow'], PAL['cardL'], PAL['red'], PAL['green']]),
                       ('R', [PAL['cardL'], PAL['green'], PAL['card'], PAL['red'], PAL['blue'], PAL['yellow']])):
        o.append(wall_quad(side, .03, .92, 0, .92, b, '#9aa6ad', hatch=True))
        ts = [.03, .12, .22, .33, .45, .58, .72, .83, .92]
        rows = [(.04, .22), (.27, .45), (.5, .68), (.73, .9)]
        o.append(boxes_wall(side, .03, .92, rows, ts, b, cols))
        o.append(shelf_wall(side, .03, .92, b, (.03, .25, .48, .71, .93)))
    # tarimas con cajas en el piso (centro)
    o.append(cuboid(470, 500, 230, 170, .84, PAL['card']))
    o.append(poly([(470, 670), (700, 670), (700, 690), (470, 690)], '#a07a4a', 3))
    o.append(cuboid(900, 540, 170, 130, .86, PAL['cardL']))
    # lata rodando
    o.append(rect(760, 650, 34, 22, PAL['red'], 2.6, 4))
    o.append(line(760, 658, 794, 658, 1.6))
    o.append(line(802, 664, 840, 664, 2, INK, .35))
    o.append(line(812, 672, 858, 672, 2, INK, .25))
    # sombra amenazante al fondo
    o.append(glow(620, 360, 90, 60, '#2b2a28', .18))
    o.append(lamp(600, 0, 40))
    o.append(lamp(780, 0, 150, on=False))
    save('deposito_central', '\n'.join(o))

# ------------------------------------------------------------ 2C VENTILACIÓN
def ventilacion():
    vp = VP
    o = []
    o.append(rect(0, 0, W, H, '#555e66', 0))
    ob = (540, 280, 700, 380)  # boca lejana del conducto
    o.append(poly([(0, 0), (W, 0), (ob[2], ob[1]), (ob[0], ob[1])], '#79848c', hatch=True))             # techo
    o.append(poly([(0, 0), (ob[0], ob[1]), (ob[0], ob[3]), (0, H)], '#69747c', hatch=True))              # pared izq
    o.append(poly([(W, 0), (ob[2], ob[1]), (ob[2], ob[3]), (W, H)], '#69747c', hatch=True))              # pared der
    o.append(poly([(0, H), (W, H), (ob[2], ob[3]), (ob[0], ob[3])], '#8d98a0'))                          # piso
    o.append(rect(ob[0], ob[1], ob[2] - ob[0], ob[3] - ob[1], '#1d2227', 3.4))
    # costillas / juntas de chapa con espaciado geométrico
    for t in (.12, .26, .4, .53, .64, .74, .82, .89):
        xl = lerp(0, ob[0], t); xr = lerp(W, ob[2], t)
        yt = lerp(0, ob[1], t); yb = lerp(H, ob[3], t)
        o.append(poly([(xl, yt), (xr, yt), (xr, yb), (xl, yb)], 'none', 3.2))
        for (px, py) in ((xl + 12 * (1 - t), yt + 14 * (1 - t) + 4), (xr - 12 * (1 - t), yt + 14 * (1 - t) + 4)):
            o.append(circle(px, py, 3.2 * (1 - t) + 1, PAL['steelL'], 1.4))
    # rejillas con luz: izquierda = fiambrería (fría), derecha = depósito (ámbar)
    gl = [pt_wall('L', .36, .78, ob_back := (ob[0], ob[1], ob[2], ob[3])), ]
    def grille(side, t0, t1, f0, f1, light):
        o2 = [wall_quad(side, t0, t1, f0, f1, ob, light, 3.4)]
        n = 6
        for i in range(1, n):
            f = lerp(f0, f1, i / n)
            a = pt_wall(side, t0, f, ob); bb = pt_wall(side, t1, f, ob)
            o2.append(line(*a, *bb, 3.2))
        return '\n'.join(o2)
    o.append(grille('L', .45, .75, .22, .72, '#cfeaf6'))
    o.append(grille('R', .62, .9, .24, .74, '#f2c98a'))
    o.append(glow(300, 330, 150, 130, '#cfeaf6', .18))
    o.append(glow(965, 330, 190, 110, '#f2c98a', .2))
    # rejilla trabada (frente al jugador, derecha-abajo)
    o.append(wall_quad('R', .08, .3, .12, .5, ob, '#2f353b', 3.6))
    for i in range(1, 6):
        f = lerp(.12, .5, i / 6)
        a = pt_wall('R', .08, f, ob); bb = pt_wall('R', .3, f, ob)
        o.append(line(*a, *bb, 3.2, '#8d98a0'))
    # polvo
    import random
    random.seed(4)
    for _ in range(46):
        x = random.randint(40, W - 40); y = random.randint(60, H - 60)
        o.append(f'<circle cx="{x}" cy="{y}" r="{random.choice([1.4,2,2.6])}" fill="#e8e4d6" opacity="{random.choice([.2,.3,.4])}" stroke="none"/>')
    save('ventilacion', '\n'.join(o))

# ------------------------------------------------------------ 3B FIAMBRERÍA
def fiambreria():
    b = (480, 260, 760, 400)
    o = [room(b, '#d8e6ec', '#dfeaee', '#eef2f2', '#cfdfe6')]
    # tubos fluorescentes (uno apagado)
    for i, t in enumerate((.3, .52, .7)):
        xl = lerp(0, b[0], t); xr = lerp(W, b[2], t); y = lerp(0, b[1], t)
        cx = (xl + xr) / 2
        o.append(rect(cx - 70 * (1 - t * .5), y - 5, 140 * (1 - t * .5), 10, '#fffbe2' if i != 1 else '#8f9a9d', 2.6, 4))
    # vitrinas refrigeradas a la izquierda con fiambres
    o.append(wall_quad('L', .04, .9, 0, .5, b, '#b7d5e2', hatch=True))
    for i, (a, bb) in enumerate(((.06, .2), (.22, .36), (.38, .52), (.54, .66), (.68, .79), (.81, .88))):
        o.append(wall_quad('L', a, bb, .12, .4, b, '#f6d3cf' if i % 2 == 0 else '#f1e3b6', 2.6))
    for f in (.06, .5):
        pa = pt_wall('L', .04, f, b); pb = pt_wall('L', .9, f, b)
        o.append(line(*pa, *pb, 5, PAL['steelD']))
    # heladeras con puertas de vidrio en pared izquierda superior
    o.append(wall_quad('L', .04, .9, .52, .86, b, PAL['fridge'], 3.4, hatch=True))
    for t in (.12, .22, .34, .46, .6, .75):
        a = pt_wall('L', t, .52, b); bb = pt_wall('L', t, .86, b)
        o.append(line(*a, *bb, 3))
    # cámara de frío en la pared derecha, con cortina de tiras y cartel
    o.append(wall_quad('R', .46, .92, 0, .8, b, '#c4d3da', 3.6, hatch=True))
    for k in range(9):
        t = lerp(.5, .88, k / 8)
        pa = pt_wall('R', t, .02, b); pb_ = pt_wall('R', t, .72, b)
        o.append(line(*pa, *pb_, 9, '#e6f2f6'))
        o.append(line(*pa, *pb_, 2, INK, .6))
    pc = pt_wall('R', .69, .93, b)
    o.append(rect(pc[0] - 74, pc[1] - 16, 148, 34, '#2f7fc0', 3, 3))
    o.append(text(pc[0], pc[1] + 8, 'CÁMARA FRÍA', 17, '#ffffff'))
    # sector de empleados (primer plano derecho): perchero con delantales + heladera
    o.append(rect(1440, 170, 340, 20, '#8d98a0', 3.2))
    for i, c in enumerate(('#e9e5d8', '#6fa3c8', '#e9e5d8', '#c9564c')):
        x = 1478 + i * 84
        o.append(line(x, 190, x, 206, 3))
        o.append(poly([(x - 28, 206), (x + 28, 206), (x + 36, 346), (x - 36, 346)], c, 3, hatch=True))
        o.append(poly([(x - 14, 206), (x + 14, 206), (x + 10, 231), (x - 10, 231)], shade(c, .85), 2.4))
    o.append(cuboid(1560, 420, 170, 250, .88, '#dfe6e8'))
    o.append(line(1568, 540, 1722, 540, 3))
    o.append(rect(1706, 460, 10, 50, PAL['steelD'], 2.4, 3))
    o.append(rect(1706, 560, 10, 70, PAL['steelD'], 2.4, 3))
    # escarcha
    o.append(glow(520, 340, 160, 120, '#e8f6ff', .2))
    save('fiambreria', '\n'.join(o))

# ------------------------------------------------------------ 4 TALLER
def taller():
    b = (480, 260, 770, 410)
    o = [room(b, '#cfcbc0', '#bdb7a8', '#dcd9cf', '#c8c3b5')]
    # puerta de emergencia al fondo con cartel
    o.append(rect(590, 290, 90, 120, '#a9b3b9', 3.4))
    o.append(rect(600, 300, 70, 110, '#8d98a0', 2.6))
    o.append(rect(655, 352, 10, 6, '#2b2a28', 1.6))
    o.append(exit_sign(588, 266, 92))
    o.append(glow(635, 275, 70, 26, '#7be08e', .25))
    # banco de trabajo (izquierda) con tablero de herramientas
    o.append(wall_quad('L', .05, .72, .0, .38, b, '#8a6a46', hatch=True))
    o.append(wall_quad('L', .05, .72, .38, .42, b, '#b08a58', 3))
    o.append(wall_quad('L', .05, .72, .46, .88, b, '#c9b78f', 3.2, hatch=True))
    for i in range(7):
        t = lerp(.1, .68, i / 6)
        a = pt_wall('L', t, .74, b); bb = pt_wall('L', t, .5, b)
        c = (PAL['red'], PAL['steelD'], PAL['yellow'], PAL['blue'], PAL['steelD'], PAL['green'], PAL['red'])[i]
        o.append(line(*a, *bb, 7, c)); o.append(line(*a, *bb, 2, INK, .8))
        o.append(circle(a[0], a[1], 5, '#f4efe0', 1.6))
    # caja de llaves en la pared derecha con llaves colgando
    kb = [pt_wall('R', .12, .78, b), pt_wall('R', .42, .78, b), pt_wall('R', .42, .42, b), pt_wall('R', .12, .42, b)]
    o.append(poly(kb, '#8c2f2a', 3.6))
    o.append(poly([pt_wall('R', .15, .74, b), pt_wall('R', .39, .74, b), pt_wall('R', .39, .46, b), pt_wall('R', .15, .46, b)], '#a8433b', 2.4))
    for i in range(6):
        t = lerp(.18, .37, i / 5)
        a = pt_wall('R', t, .66, b)
        o.append(line(a[0], a[1], a[0], a[1] + 24, 2.6))
        o.append(circle(a[0], a[1] + 30, 6, '#d9c27a', 2))
    kt = pt_wall('R', .27, .84, b)
    o.append(text(kt[0], kt[1], 'LLAVES', 15, INK))
    # carro con herramientas (centro-izquierda)
    o.append(cuboid(300, 470, 250, 38, .88, '#c9564c'))
    for i in range(3):
        o.append(rect(318, 515 + i * 42, 214, 36, '#b04a3a', 2.8, 3))
        o.append(rect(405, 527 + i * 42, 40, 11, '#59636b', 2.2, 3))
    o.append(line(318, 645, 318, 690, 5)); o.append(line(532, 645, 532, 690, 5))
    o.append(circle(318, 694, 11, '#3a3f44', 3)); o.append(circle(532, 694, 11, '#3a3f44', 3))
    # herramientas sobre el carro: martillo y llave inglesa
    o.append(line(340, 466, 410, 436, 9, '#6b4a2b')); o.append(rect(398, 424, 28, 20, PAL['steelD'], 2.6, 3))
    o.append(line(440, 466, 500, 440, 8, PAL['steelD']))
    o.append(circle(504, 438, 9, 'none', 3.2))
    # palanca de hierro apoyada
    o.append(line(1010, 130, 940, 650, 12, '#59636b'))
    o.append(line(1010, 130, 940, 650, 3, INK))
    o.append(poly([(1010, 130), (1050, 110), (1062, 136), (1030, 146)], '#59636b', 3))
    # marcas de piso
    o.append(poly([(60, 700), (230, 700), (360, 560), (320, 560)], '#f0c23b', 2.6, op=.9))
    o.append(lamp(560, 0, 90))
    save('taller', '\n'.join(o))

# ------------------------------------------------------------ 5 PUERTA TRASERA
def puerta_trasera():
    b = (400, 190, 840, 460)   # fondo grande: la puerta domina
    o = [room(b, '#c9c5ba', '#b4afa2', '#dad7cc', '#c3beb0', tiles=False)]
    # franja de peligro amarilla/negra en el piso, frente a la puerta
    ya, yb = 486, 524
    def xs(y, f):
        k = (y - b[3]) / (H - b[3])
        return lerp(lerp(b[0], 0, k), lerp(b[2], W, k), f)
    N = 22
    for i in range(N):
        f0, f1 = i / N, (i + 1) / N
        col = '#f0c23b' if i % 2 == 0 else '#2b2a28'
        o.append(poly([(xs(ya, f0), ya), (xs(ya, f1), ya), (xs(yb, f1), yb), (xs(yb, f0), yb)], col, 1.6))
    # puerta de emergencia pesada
    dx0, dx1, dy0, dy1 = 540, 700, 215, 462
    o.append(rect(dx0 - 14, dy0 - 12, dx1 - dx0 + 28, dy1 - dy0 + 12, '#59636b', 3.8))
    o.append(rect(dx0, dy0, dx1 - dx0, dy1 - dy0, '#9aa5ac', 3.8, hatch=True))
    o.append(rect(dx0 + 14, dy0 + 16, dx1 - dx0 - 28, 110, '#a9b3b9', 2.8))
    o.append(rect(dx0 + 14, dy0 + 140, dx1 - dx0 - 28, 90, '#a9b3b9', 2.8))
    # barra antipánico
    o.append(rect(dx0 + 10, dy0 + 126, dx1 - dx0 - 20, 14, '#c9564c', 3, 4))
    # placa de la cerradura y ojo de la cerradura
    o.append(rect(dx1 - 56, dy0 + 58, 34, 52, '#6c7882', 3, 4))
    o.append(circle(dx1 - 39, dy0 + 78, 6.5, '#1d1d1b', 1.6))
    o.append(poly([(dx1 - 42, dy0 + 82), (dx1 - 36, dy0 + 82), (dx1 - 38, dy0 + 98), (dx1 - 40, dy0 + 98)], '#1d1d1b', 1.2))
    # arañazos de rotura
    o.append(line(dx1 - 60, dy0 + 118, dx1 - 30, dy0 + 128, 2, INK, .5))
    o.append(line(dx1 - 64, dy0 + 128, dx1 - 36, dy0 + 140, 2, INK, .5))
    # cartel de salida + baliza roja
    o.append(exit_sign(555, dy0 - 66, 110))
    o.append(glow(610, dy0 - 48, 90, 30, '#7be08e', .22))
    o.append(circle(760, 232, 18, '#e2483d', 3.2))
    o.append(rect(742, 250, 36, 10, '#59636b', 2.4))
    o.append(glow(760, 232, 70, 56, '#ff6a5a', .3))
    # reloj ya cerca de las seis: 5:54
    o.append(clock(470, 262, 34, 5, 54))
    # estantes laterales con cajas y un extintor
    o.append(boxes_wall('L', .08, .6, [(.04, .3), (.34, .6)], [.08, .24, .42, .6], b))
    o.append(rect(980, 300, 44, 150, '#c9322b', 3.6, 14))
    o.append(rect(988, 282, 28, 22, PAL['steelD'], 3, 3))
    o.append(line(1016, 290, 1048, 330, 3.6))
    o.append(lamp(700, 0, 55, on=False))
    save('puerta_trasera', '\n'.join(o))

# ------------------------------------------------------------ 6 PATIO DE CARGA
def patio_carga():
    o = []
    # cielo de madrugada con primer resplandor en el horizonte
    o.append(f'<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2748"/><stop offset=".55" stop-color="#5b4a7a"/><stop offset="1" stop-color="#e59a6a"/></linearGradient></defs>')
    o.append(f'<rect width="{W}" height="440" fill="url(#sky)" stroke="none"/>')
    # estrellas
    import random
    random.seed(9)
    for _ in range(40):
        o.append(f'<circle cx="{random.randint(20,W-20)}" cy="{random.randint(10,200)}" r="{random.choice([1.2,1.8,2.4])}" fill="#fff6d8" opacity=".8" stroke="none"/>')
    # edificios lejanos (siluetas planas con contorno)
    for (x, w, h, c) in ((880, 110, 150, '#3a3556'), (990, 90, 210, '#443d63'), (1080, 140, 120, '#3a3556'), (1220, 100, 180, '#4a4268'), (1320, 160, 140, '#3a3556'), (1480, 140, 200, '#443d63'), (1620, 200, 130, '#3a3556')):
        o.append(rect(x, 400 - h, w, h, c, 3))
        for i in range(3):
            for j in range(int(h / 50)):
                if (i + j) % 3 == 0:
                    o.append(rect(x + 14 + i * (w / 3.4), 400 - h + 14 + j * 44, 12, 18, '#f0c23b', 1.4))
    # fachada del supermercado a la izquierda (muelle de carga)
    o.append(poly([(0, 0), (520, 70), (520, 470), (0, 700)], '#cfc9ba', hatch=True))
    o.append(poly([(0, 0), (520, 70), (520, 100), (0, 40)], PAL['red'], 3.2))
        # puerta trasera (la que dejamos atrás), abierta
    o.append(poly([(80, 190), (210, 220), (210, 520), (80, 570)], '#3b3f44', 3.4))
    o.append(poly([(210, 220), (290, 236), (290, 500), (210, 520)], '#9aa5ac', 3.2, hatch=True))
    # verja metálica bajando (centro): persiana con tablillas
    gx0, gx1, gt, gb = 560, 1040, 118, 292
    o.append(rect(gx0 - 20, gt - 24, gx1 - gx0 + 40, 34, '#59636b', 3.6))       # cajón del motor
    o.append(rect(gx0 - 14, gt + 8, 16, 326, '#59636b', 3.4))                    # rieles
    o.append(rect(gx1 - 2, gt + 8, 16, 326, '#59636b', 3.4))
    o.append(poly([(gx0 + 2, 470), (gx1 - 2, 470), (gx1 - 2, 520), (gx0 + 2, 520)], '#00000000', 0))
    o.append(rect(gx0 + 2, gt + 10, gx1 - gx0 - 4, gb - gt - 10, '#8d98a0', 3.4))
    for yy in range(gt + 24, gb, 18):
        o.append(line(gx0 + 2, yy, gx1 - 2, yy, 2.2, INK, .55))
    for xx in range(gx0 + 22, gx1, 40):
        o.append(rect(xx, gt + 10, 6, gb - gt - 10, '#6c7882', 0, 0))
    o.append(rect(gx0 + 2, gb - 10, gx1 - gx0 - 4, 16, '#59636b', 3.4))          # barra inferior
    # luz de la calle por la abertura que queda debajo
    o.append(poly([(gx0 + 2, gb + 6), (gx1 - 2, gb + 6), (gx1 + 60, 470), (gx0 - 60, 470)], '#ffd9a8', 0, op=.28))
    o.append(circle((gx0 + gx1) / 2, gb - 2, 0.1, 'none', 0))
    # suelo de hormigón y calle al fondo
    o.append(poly([(0, 700), (520, 470), (W, 470), (W, 700)], '#b9b5a8', hatch=True))
    o.append(poly([(520, 470), (W, 470), (W, 420), (520, 420)], '#9a968b', 3))
    o.append(poly([(640, 560), (940, 560), (1010, 600), (700, 600)], '#00000000', 0))
    # franjas de peligro frente a la verja
    for i in range(10):
        xa = 560 + i * 48
        o.append(poly([(xa, 470), (xa + 24, 470), (xa + 8, 520), (xa - 16, 520)], '#f0c23b', 2.2))
    # panel de control (pared del muelle, derecha del jugador) con botón rojo
    px, py = 1630, 250
    o.append(rect(px, py, 110, 150, '#59636b', 3.8, 6))
    o.append(rect(px + 14, py + 14, 82, 38, '#1d2227', 2.8))
    o.append(rect(px + 22, py + 22, 66, 8, '#59d17a', 1.6))
    o.append(circle(px + 55, py + 98, 24, '#c9322b', 3.8))
    o.append(circle(px + 55, py + 98, 14, '#e2483d', 2))
    o.append(glow(px + 55, py + 98, 44, 44, '#ff6a5a', .14))
    o.append(rect(px + 48, py + 150, 14, 320 - 150 + 0, '#59636b', 3.2))
    # farola
    o.append(line(1480, 470, 1480, 150, 7))
    o.append(line(1480, 150, 1420, 150, 7))
    o.append(circle(1420, 158, 14, '#fff6c8', 3))
    o.append(glow(1420, 190, 80, 100, '#fff2b8', .1))
    save('patio_carga', '\n'.join(o), grain=True)

# ------------------------------------------------------------ FINAL: AFUERA AL AMANECER
def exterior():
    o = []
    o.append('<defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7fb8"/><stop offset=".5" stop-color="#f0b48a"/><stop offset="1" stop-color="#f7d98a"/></linearGradient></defs>')
    o.append(f'<rect width="{W}" height="420" fill="url(#sky2)" stroke="none"/>')
    o.append(glow(640, 345, 260, 120, '#fff0b0', .35))
    o.append(circle(640, 352, 62, '#fff0b0', 3))
    o.append(f'<rect x="0" y="372" width="{W}" height="330" fill="#cfc8b6" stroke="none"/>')
    for (x, w, h, c) in ((470, 60, 42, '#c9a58f'), (530, 44, 66, '#bf9a86'), (574, 70, 34, '#d3b19a'), (650, 50, 58, '#bf9a86'), (700, 80, 40, '#c9a58f'), (780, 60, 70, '#bf9a86')):
        o.append(rect(x, 372 - h, w, h, c, 2.6))
    # nubes
    for (cx, cy) in ((300, 120), (820, 80), (1500, 150)):
        o.append(f'<path d="M{cx-90} {cy+20} q10 -34 52 -24 q22 -34 64 -6 q44 -8 50 30 z" fill="#f7e9e0" stroke="{INK}" stroke-width="3"/>')
    # edificios a ambos lados, en perspectiva de calle
    for side in ('L', 'R'):
        for i, (t0, t1, hh, c) in enumerate(((0, .22, 460, '#d9c7b4'), (.22, .42, 380, '#c9b9a8'), (.42, .6, 310, '#e2d3bf'), (.6, .74, 250, '#cdbfae'))):
            def x(t): return lerp(0, 560, t) if side == 'L' else lerp(W, 680, t)
            def ytop(t): return lerp(40, 280, t)
            def ybot(t): return lerp(700, 372, t)
            o.append(poly([(x(t0), ytop(t0) + (hh * (1 - t0) - 440) * .0), (x(t1), ytop(t1)), (x(t1), ybot(t1)), (x(t0), ybot(t0))], c, hatch=True))
    # supermercado cerrado (izquierda) con verja baja
    o.append(poly([(60, 150), (300, 200), (300, 560), (60, 650)], '#f0e4d2', hatch=True))
    o.append(poly([(60, 150), (300, 200), (300, 232), (60, 188)], PAL['red'], 3.2))
    o.append(poly([(100, 400), (270, 432), (270, 520), (100, 560)], '#8d98a0', 3.2))
    for k in range(7):
        o.append(line(100 + k * 0, 408 + k * 22, 270, 438 + k * 12, 1.8, INK, .5))
    # calle y vereda
    o.append(poly([(0, 700), (W, 700), (680, 372), (560, 372)], '#7a7f86', hatch=True))
    o.append(poly([(0, 700), (170, 700), (560, 372), (520, 372)], '#d8d2c2', 3.2))
    o.append(poly([(W, 700), (W - 170, 700), (680, 372), (720, 372)], '#d8d2c2', 3.2))
    for (y0, y1) in ((690, 650), (600, 566), (540, 516), (494, 478), (460, 450)):
        o.append(poly([(lerp(620, 600, (y0 - 372) / 330) - 0, y0), (lerp(620, 640, (y0 - 372) / 330), y0), (lerp(620, 636, (y1 - 372) / 330), y1), (lerp(620, 604, (y1 - 372) / 330), y1)], '#f6efd8', 2.4))
    # farola, árbol
    o.append(line(300, 640, 300, 250, 8)); o.append(line(300, 250, 380, 250, 8)); o.append(circle(386, 258, 14, '#fff6c8', 3))
    o.append(rect(1470, 440, 26, 220, '#6b4a2b', 3.4))
    o.append(circle(1483, 410, 80, '#6f9e4a', 3.4)); o.append(circle(1430, 450, 50, '#5a8a3c', 3.2)); o.append(circle(1540, 450, 52, '#5a8a3c', 3.2))
    save('exterior_amanecer', '\n'.join(o))

if __name__ == '__main__':
    for f in (oficina, pasillo_deposito, deposito_central, ventilacion, fiambreria, taller, puerta_trasera, patio_carga, exterior):
        f()
    print('listo')
