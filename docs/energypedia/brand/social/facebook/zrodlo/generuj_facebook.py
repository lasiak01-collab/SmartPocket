import os, subprocess, shutil  # python3 generuj_facebook.py (wymaga Pillow, ffmpeg, fontów Inter i Space Grotesk w ~/.fonts)
from PIL import Image, ImageDraw, ImageFont
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
os.makedirs(OUT, exist_ok=True)
BR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'logo') + '/'
NAVY = (11, 27, 51); VOLT = (0, 194, 168); WHITE = (255, 255, 255); GREY = (201, 212, 227)
F = os.path.expanduser('~/.fonts/')

# ---------- animacja sygnetu: dokładnie A + C z logo-animacja.css ----------
def bez(x1, y1, x2, y2):
    def f(t):
        lo, hi = 0.0, 1.0
        for _ in range(60):
            m = (lo + hi) / 2
            bx = 3*(1-m)**2*m*x1 + 3*(1-m)*m**2*x2 + m**3
            if bx < t: lo = m
            else: hi = m
        m = (lo + hi) / 2
        return 3*(1-m)**2*m*y1 + 3*(1-m)*m**2*y2 + m**3
    return f
grow_e = bez(.2, .8, .2, 1); inout = bez(.42, 0, .58, 1)
def grow(t, delay):
    x = (t - delay) / 0.5
    return 0.0 if x <= 0 else 1.0 if x >= 1 else grow_e(x)
KF = [(0, 1), (.30, 1.12), (.55, .92), (.80, 1.05), (1, 1)]
def read(t):
    if t < 1.4: return None
    p = ((t - 1.4) % 6) / 6
    for (a, va), (b, vb) in zip(KF, KF[1:]):
        if a <= p <= b:
            return va + (vb - va) * inout((p - a) / (b - a))
    return 1
def scales(t):
    r = read(t)
    return dict(spine=grow(t, 0), top=grow(t, .15), mid=(r if r is not None else grow(t, .3)), bot=grow(t, .45))

def draw_signet(d, ox, oy, u, sc, colors):
    # u = piksele na jednostkę (sygnet 36×36), transform-origin jak w CSS
    def rr(x, y, w, h, c):
        if w <= 0.01 or h <= 0.01: return
        d.rounded_rectangle([ox + x*u, oy + y*u, ox + (x+w)*u, oy + (y+h)*u], radius=min(3*u, w*u/2, h*u/2), fill=c)
    h = 36 * sc['spine']; rr(0, 36 - h, 9, h, colors[0])
    rr(0, 0, 36 * sc['top'], 9, colors[0])
    rr(13, 13.5, 20 * sc['mid'], 9, colors[1])
    rr(0, 27, 30 * sc['bot'], 9, colors[0])

def avatar_frame(t, size=1080, ss=2, bg=NAVY, cols=(WHITE, VOLT)):
    S = size * ss
    im = Image.new('RGB', (S, S), bg); d = ImageDraw.Draw(im)
    side = S * 0.5; u = side / 36
    draw_signet(d, (S - side) / 2, (S - side) / 2, u, scales(t), cols)
    return im.resize((size, size), Image.LANCZOS)

# statyczne awatary
avatar_frame(99).save(f'{OUT}/energypedia-facebook-profil-granat-1080.png')
avatar_frame(99, bg=WHITE, cols=(NAVY, VOLT)).save(f'{OUT}/energypedia-facebook-profil-bialy-1080.png')

# klatki wideo
def render_frames(t0, t1, fps, size, d):
    if os.path.exists(d): shutil.rmtree(d)
    os.makedirs(d)
    n = round((t1 - t0) * fps)
    for i in range(n):
        avatar_frame(t0 + i / fps, size=size).save(f'{d}/f{i:04d}.png')
    return n
FR = OUT + '/frames'
render_frames(0, 7.4, 30, 1080, FR + '_wejscie')
render_frames(1.4, 7.4, 30, 1080, FR + '_petla')
for name, d in [('wejscie-i-odczyt-7s', FR + '_wejscie'), ('petla-odczyt-6s', FR + '_petla')]:
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '30', '-i', f'{d}/f%04d.png', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-movflags', '+faststart', f'{OUT}/energypedia-facebook-profil-animowany-{name}.mp4'], check=True)
# GIF pętli (mniejszy, 540 px, 15 kl./s)
render_frames(1.4, 7.4, 15, 540, FR + '_gif')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '15', '-i', f'{FR}_gif/f%04d.png', '-vf', 'split[a][b];[a]palettegen=max_colors=32[p];[b][p]paletteuse=dither=none', '-loop', '0', f'{OUT}/energypedia-facebook-profil-animowany-petla-540.gif'], check=True)
for d in ['_wejscie', '_petla', '_gif']: shutil.rmtree(FR + d)

# ---------- zdjęcie w tle 1640×720 ----------
def cover(start=False, ss=2):
    W, H = 1640 * ss, 720 * ss
    im = Image.new('RGB', (W, H), NAVY)
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    s = ss
    # konstrukcja ze słupków: kolumny jak wykres, jedna w zieleni prądu
    cols = [(1340, 470), (1408, 300), (1476, 400), (1544, 240)]
    for i, (x, h) in enumerate(cols):
        c = (0, 194, 168, 255) if i == 0 else (255, 255, 255, 34)
        d.rounded_rectangle([x*s, (640 - h)*s, (x + 50)*s, 640*s], radius=12*s, fill=c)
    d.rounded_rectangle([1326*s, 640*s, 1610*s, 652*s], radius=6*s, fill=(255, 255, 255, 60))
    im.paste(lay, (0, 0), lay)
    d = ImageDraw.Draw(im)
    x0 = 440
    logo = Image.open(BR + 'png/energypedia-logo-poziome-negatyw-1200px.png').convert('RGBA')
    lw = 380 * s; logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    y = 118 if start else 150
    im.paste(logo, (x0*s - round(logo.width * 0.045), y*s), logo)
    y += 118
    if start:
        f = ImageFont.truetype(F + 'Inter-700.ttf', 22*s)
        txt = 'START 16 LISTOPADA 2026'
        tw = d.textlength(txt, font=f)
        d.rounded_rectangle([x0*s, y*s, x0*s + tw + 36*s, (y + 40)*s], radius=20*s, fill=VOLT)
        d.text((x0*s + 18*s, (y + 20)*s), txt, font=f, fill=NAVY, anchor='lm')
        y += 62
    fh = ImageFont.truetype(F + 'SpaceGrotesk-700.ttf', 74*s)
    d.text((x0*s - 4*s, y*s), 'Energia bez tajemnic.', font=fh, fill=WHITE)
    y += 104
    fs = ImageFont.truetype(F + 'Inter-400.ttf', 31*s)
    for line in ['Rachunki, umowy, taryfy, fotowoltaika i magazyny energii.', 'Zapytaj, a odpowiemy ze źródłami.']:
        d.text((x0*s, y*s), line, font=fs, fill=GREY)
        y += 46
    y += 14
    fa = ImageFont.truetype(F + 'Inter-700.ttf', 26*s)
    d.text((x0*s, y*s), 'energypedia.pl', font=fa, fill=VOLT)
    return im.resize((1640, 720), Image.LANCZOS)

def guides(im):
    g = im.copy().convert('RGBA'); o = Image.new('RGBA', g.size, (0, 0, 0, 0)); d = ImageDraw.Draw(o)
    d.rectangle([0, 48, 1639, 671], outline=(255, 210, 0, 255), width=3)        # komputer ~820×312
    d.rectangle([180, 0, 1459, 719], outline=(255, 80, 80, 255), width=3)        # telefon 640×360
    d.ellipse([60, 470, 400, 810], outline=(120, 200, 255, 255), width=3)        # orientacyjnie zdjęcie profilowe
    f = ImageFont.truetype(F + 'Inter-700.ttf', 20)
    d.text((10, 52), 'komputer (ok. 820×312)', font=f, fill=(255, 210, 0, 255))
    d.text((190, 690), 'telefon (640×360)', font=f, fill=(255, 80, 80, 255))
    d.text((70, 440), 'zdjęcie profilowe (orientacyjnie)', font=f, fill=(120, 200, 255, 255))
    return Image.alpha_composite(g, o).convert('RGB')

c = cover(); c.save(f'{OUT}/energypedia-facebook-tlo-1640x720.png', optimize=True)
guides(c).save(f'{OUT}/podglad-stref-tlo.png')
c2 = cover(start=True); c2.save(f'{OUT}/energypedia-facebook-tlo-start-16XI-1640x720.png', optimize=True)
c.save(f'{OUT}/energypedia-facebook-tlo-1640x720.jpg', quality=92)
print(sorted(os.listdir(OUT)))
