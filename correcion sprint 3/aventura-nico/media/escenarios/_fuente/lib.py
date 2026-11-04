# Helpers para dibujar fondos en el estilo de pasillo.png:
# contorno de tinta, colores planos, perspectiva de un punto, trazo "a mano".
W, H = 1800, 700
VP = (620, 330)          # punto de fuga a la izquierda (Nico queda a la derecha)
INK = '#2b2a28'
SW = 3.2

PAL = dict(
    red='#e2483d', teal='#3b8a8c', paper='#ece9e1', floor='#efe3d0', floor2='#e2d3bb',
    card='#cf9a5d', card2='#b9854a', cardL='#e0b076', blue='#2f7fc0', yellow='#f0c23b',
    green='#5aa43c', steel='#8e9aa3', steelD='#6c7882', steelL='#c4cdd3', fridge='#bfe0ec',
    wall='#e6e2d6', wallD='#cfc9b8', dark='#3a3f44', night='#1f2a44',
)

def shade(hexc, f):
    hexc = hexc.lstrip('#')
    r, g, b = [int(hexc[i:i+2], 16) for i in (0, 2, 4)]
    if f < 1:
        r, g, b = [int(c * f) for c in (r, g, b)]
    else:
        k = f - 1
        r, g, b = [int(c + (255 - c) * k) for c in (r, g, b)]
    return '#%02x%02x%02x' % (r, g, b)

def head(extra_defs=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">
<defs>
<filter id="sk" x="-2%" y="-2%" width="104%" height="104%">
  <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
  <feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 0.55 -0.18"/>
</filter>
<pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
  <line x1="0" y1="0" x2="0" y2="9" stroke="{INK}" stroke-width="0.9" opacity="0.22"/>
</pattern>
{extra_defs}
</defs>
<g filter="url(#sk)" stroke-linejoin="round" stroke-linecap="round">
'''

def tail(grain=True):
    g = f'<rect width="{W}" height="{H}" filter="url(#grain)" opacity="0.35"/>' if grain else ''
    return f'</g>\n{g}\n</svg>\n'

def poly(pts, fill, sw=SW, hatch=False, op=1):
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    s = f'<polygon points="{p}" fill="{fill}" stroke="{INK}" stroke-width="{sw}" opacity="{op}"/>'
    if hatch:
        s += f'<polygon points="{p}" fill="url(#hatch)" stroke="none"/>'
    return s

def rect(x, y, w, h, fill, sw=SW, rx=0, hatch=False):
    s = f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"/>'
    if hatch:
        s += f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="url(#hatch)"/>'
    return s

def line(x1, y1, x2, y2, sw=SW, col=INK, op=1):
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col}" stroke-width="{sw}" opacity="{op}"/>'

def circle(cx, cy, r, fill, sw=SW):
    return f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"/>'

def text(x, y, s, size=20, fill=INK, anchor='middle', weight='700'):
    return f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" stroke="none">{s}</text>'

def lerp(a, b, t):
    return a + (b - a) * t

def to_vp(pt, s):
    """acerca un punto al punto de fuga (s=1 igual, s=0 en el VP)"""
    return (VP[0] + (pt[0] - VP[0]) * s, VP[1] + (pt[1] - VP[1]) * s)

def room(back, wall, floor, ceil, wallR=None, tiles=True, ceil_hatch=True, floor_line='#2b2a28'):
    """Habitación en perspectiva de un punto. back=(x0,y0,x1,y1) pared de fondo."""
    x0, y0, x1, y1 = back
    wallR = wallR or wall
    o = []
    o.append(poly([(0, 0), (W, 0), (x1, y0), (x0, y0)], ceil, hatch=ceil_hatch))
    o.append(poly([(0, 0), (x0, y0), (x0, y1), (0, H)], wall, hatch=True))
    o.append(poly([(W, 0), (x1, y0), (x1, y1), (W, H)], wallR, hatch=True))
    o.append(poly([(0, H), (W, H), (x1, y1), (x0, y1)], floor))
    o.append(rect(x0, y0, x1 - x0, y1 - y0, shade(wall, 1.06)))
    if tiles:
        # líneas del piso hacia el punto de fuga
        n = 14
        for i in range(1, n):
            bx = lerp(0, W, i / n)
            tx = lerp(x0, x1, i / n)
            o.append(line(bx, H, tx, y1, 1.4, INK, .35))
        # horizontales con espaciado geométrico
        yy = y1
        k = 0.0
        for j in range(1, 9):
            t = (j / 9) ** 1.8
            y = lerp(y1, H, t)
            xl = lerp(x0, 0, (y - y1) / (H - y1))
            xr = lerp(x1, W, (y - y1) / (H - y1))
            o.append(line(xl, y, xr, y, 1.4, INK, .35))
    return '\n'.join(o)

def cuboid(x, y, w, h, s=0.86, fill='#cf9a5d', dark=0.78, light=1.15, sw=SW, hatch=True):
    """Caja de frente (x,y,w,h) con profundidad hacia el punto de fuga."""
    F = [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]
    B = [to_vp(p, s) for p in F]
    o = []
    cx = x + w / 2
    cy = y + h / 2
    if cx < VP[0]:   # cara lateral derecha visible
        o.append(poly([F[1], F[2], B[2], B[1]], shade(fill, dark), sw))
    elif cx > VP[0]:  # cara lateral izquierda visible
        o.append(poly([F[0], F[3], B[3], B[0]], shade(fill, dark), sw))
    if cy > VP[1]:   # por debajo del horizonte: se ve la tapa
        o.append(poly([F[0], F[1], B[1], B[0]], shade(fill, light), sw))
    else:            # por encima: se ve la base
        o.append(poly([F[3], F[2], B[2], B[3]], shade(fill, dark * .95), sw))
    o.append(rect(x, y, w, h, fill, sw, hatch=hatch))
    return '\n'.join(o)

def wall_quad(side, t0, t1, f0, f1, back, fill, sw=SW, hatch=False):
    """Cuadrilátero pegado a la pared lateral. t: 0 (frente) -> 1 (fondo).
    f: 0 (piso) -> 1 (techo)."""
    x0, y0, x1, y1 = back
    def pt(t, f):
        if side == 'L':
            x = lerp(0, x0, t); top = lerp(0, y0, t); bot = lerp(H, y1, t)
        else:
            x = lerp(W, x1, t); top = lerp(0, y0, t); bot = lerp(H, y1, t)
        return (x, bot - f * (bot - top))
    return poly([pt(t0, f0), pt(t1, f0), pt(t1, f1), pt(t0, f1)], fill, sw, hatch)

def pt_wall(side, t, f, back):
    x0, y0, x1, y1 = back
    if side == 'L':
        x = lerp(0, x0, t); top = lerp(0, y0, t); bot = lerp(H, y1, t)
    else:
        x = lerp(W, x1, t); top = lerp(0, y0, t); bot = lerp(H, y1, t)
    return (x, bot - f * (bot - top))

def lamp(x, y_top, y_bot, on=True):
    o = [line(x, y_top, x, y_bot, 2.6)]
    o.append(rect(x - 20, y_bot, 40, 15, '#f4efe0' if on else '#9a9a94', 2.6))
    if on:
        o.append(poly([(x - 20, y_bot + 15), (x + 20, y_bot + 15), (x + 60, y_bot + 95), (x - 60, y_bot + 95)], '#fff6c8', 0, op=.18))
    return '\n'.join(o)

def clock(cx, cy, r, hh, mm):
    import math
    o = [circle(cx, cy, r, '#fbf8ee', 3.2)]
    for i in range(12):
        a = math.radians(i * 30)
        o.append(line(cx + math.sin(a) * r * .82, cy - math.cos(a) * r * .82, cx + math.sin(a) * r * .94, cy - math.cos(a) * r * .94, 2, INK))
    ah = math.radians((hh % 12) * 30 + mm * .5)
    am = math.radians(mm * 6)
    o.append(line(cx, cy, cx + math.sin(ah) * r * .5, cy - math.cos(ah) * r * .5, 4, INK))
    o.append(line(cx, cy, cx + math.sin(am) * r * .78, cy - math.cos(am) * r * .78, 2.8, INK))
    o.append(circle(cx, cy, 3.5, INK, 1))
    return '\n'.join(o)

def exit_sign(x, y, w=110):
    return rect(x, y, w, 38, '#3aa05a', 3, 3) + text(x + w / 2, y + 26, 'SALIDA', 20, '#ffffff')

def glow(x, y, rx, ry, color, op=.35):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{color}" opacity="{op}" stroke="none"/>'
