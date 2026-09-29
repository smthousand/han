#!/usr/bin/env python3
"""「작품 정리」 문서(doc.md) → works.js, texts.js

사람이 옮겨 적지 않는다. 문서의 항목 번호 구조를 그대로 읽어서 만든다.
문서가 바뀌면: 문서를 다시 받아 doc.md 로 저장하고 이 스크립트를 다시 실행하면 된다.
"""
import re, json, sys, difflib

SRC = sys.argv[1] if len(sys.argv) > 1 else 'doc.md'
OUT = sys.argv[2] if len(sys.argv) > 2 else '.'
c = open(SRC, encoding='utf-8').read()

def unesc(s):
    return re.sub(r'\\([\\`*_{}\[\]()#+\-.!<>|~])', r'\1', s)

def hangul_ratio(s):
    h = len(re.findall(r'[가-힣]', s)); l = len(re.findall(r'[A-Za-z]', s))
    return h / (h + l) if h + l else 0

# ── 섹션 나누기 ─────────────────────────────────────────
heads = [(m.start(), m.group(1).strip().rstrip('*').strip()) for m in re.finditer(r'^# (.*)$', c, re.M)]
def section(name):
    for i, (p, h) in enumerate(heads):
        if h == name:
            return c[p:heads[i + 1][0] if i + 1 < len(heads) else len(c)]
    return ''

# ── 본문 블록 → 문단 → 영문/국문 ─────────────────────────
def paragraphs(block):
    lines = [re.sub(r'^ {1,8}', '', l) for l in block.split('\n')]
    paras, cur = [], []
    for l in lines:
        if not l.strip():
            if cur: paras.append(' '.join(cur).strip()); cur = []
            continue
        cur.append(l.rstrip())
        if re.search(r' {2,}$', l):          # 줄 끝 두 칸 = 문단 끝
            paras.append(' '.join(cur).strip()); cur = []
    if cur: paras.append(' '.join(cur).strip())
    return [unesc(p) for p in paras if p]

def split_lang(paras):
    """영문 뒤에 국문이 이어지는 문서 형식. 마지막 '충분히 긴 영문 문단' 다음부터를 국문으로 본다.
    나눠지지 않아도 내용은 그대로 남는다 (영문 칸 또는 국문 칸 한쪽에 전부 들어간다)."""
    if not paras: return '', ''
    last_en = -1
    for i, p in enumerate(paras):
        if len(p) > 60 and hangul_ratio(p) < 0.1: last_en = i
    if last_en < 0:
        return ('', '\n\n'.join(paras)) if any(hangul_ratio(p) > 0.3 for p in paras) else ('\n\n'.join(paras), '')
    return '\n\n'.join(paras[:last_en + 1]), '\n\n'.join(paras[last_en + 1:])

def clean_md(p):
    p = re.sub(r'\*{4,}', '**', p)
    p = re.sub(r'^\*+$', '', p.strip())
    return p

def split_title(s):
    """'Resonance(泂然): Climate Resonance: 형연泂然: 기후공명' → (원어, 국문)"""
    s = unesc(s).strip()
    k = s.search if False else re.search(r'[가-힣]', s)
    if not k: return s, ''
    cut = s.rfind(':', 0, k.start())
    if cut < 0: return s, ''
    en = s[:cut].strip().rstrip(':').strip()
    return en, s[cut + 1:].strip()

# ── 상세 항목 ─────────────────────────────────────────
def parse_entry(body):
    """번호가 어긋난 항목도 있어서, 앞 4줄(구분1·구분2·작품명·연도)만 번호로 읽고
    나머지는 '작품의 식별 정보' / '이 작품에 대한 코멘트' 제목을 기준으로 나눈다."""
    first = re.findall(r'^\d\.  (.*)$', body, re.M)[:4]
    e = {}
    e['cat'] = first[0].strip()
    e['series'] = first[1].strip().upper()
    e['t'], e['ko'] = split_title(first[2].strip())
    e['y'] = first[3].strip()

    m5 = [m for m in re.finditer(r'^\d\.  ', body, re.M)][4]
    m6 = re.search(r'^\d\.  작품의 식별 정보.*$', body, re.M)
    m7 = re.search(r'^\d\.  이 작품에 대한 코멘트.*$', body, re.M)
    desc = body[m5.end():m6.start()]
    desc = re.sub(r'^\d\.  ', '', desc, flags=re.M)          # 설명 안에 끼어든 목록 번호
    e['en'], e['ko_text'] = ('', '') if desc.strip() in ('없음', '') else \
        split_lang([q for q in (clean_md(x) for x in paragraphs(desc)) if q])

    six = body[m6.end():m7.start()]
    subs = [(m.start(), int(m.group(1))) for m in re.finditer(r'^    (\d)\.  ', six, re.M)]
    f = {}
    for i, (p, n) in enumerate(subs):
        end = subs[i + 1][0] if i + 1 < len(subs) else len(six)
        lines = six[p + 8:end].split('\n')
        f[n] = unesc('\n'.join(l.strip() for l in lines if l.strip()))
    keys = {1: 'made', 2: 'size', 3: 'type', 4: 'place', 5: 'event', 6: 'credit', 7: 'tags'}
    for n, k in keys.items(): e[k] = f.get(n, '')

    seven = body[m7.end():]
    qs = [(m.start(), m.end()) for m in re.finditer(r'^    \d\.  ', seven, re.M)]
    e['quotes'] = []
    for i, (p, pe) in enumerate(qs):
        end = qs[i + 1][0] if i + 1 < len(qs) else len(seven)
        chunk = seven[pe:end]
        by, _, rest = chunk.partition('\n')
        by = unesc(by.replace('*', '').strip())
        if by in ('없음', ''): continue
        en, ko = split_lang([q for q in (clean_md(x) for x in paragraphs(rest)) if q])
        e['quotes'].append({'by': by, 'en': en, 'ko': ko})
    return e

details = {}
for p, h in heads:
    m = re.match(r'(BLACK Silhouette|Sound Tree): ([a-z])$', h)
    if m:
        pid = ('bs-' if m.group(1).startswith('BLACK') else 'st-') + m.group(2)
        details[pid] = parse_entry(section(h))

# ── 목록 ──────────────────────────────────────────────
def list_items(block):
    out = []
    for m in re.finditer(r'^    \d+\.\s+(.*)$', block, re.M):
        s = unesc(m.group(1)).replace('**', '').replace('🔈', '').strip()
        mm = re.match(r'(.*),\s*(\d{4})$', s)
        if mm: out.append((mm.group(1).strip(), mm.group(2)))
    return out

def norm(s): return re.sub(r'[^a-z0-9]', '', s.lower())

def build_series(list_block, prefix, series_name):
    pool = [(k, v) for k, v in details.items() if k.startswith(prefix)]
    used, out = set(), []
    for t, y in list_items(list_block):
        hit = None
        for k, v in pool:
            if k in used or v['y'] != y: continue
            a, b = norm(v['t']), norm(t)
            if a == b or a[:8] == b[:8] or difflib.SequenceMatcher(None, a, b).ratio() > 0.8:
                hit = k; break
        if hit:
            used.add(hit); out.append(dict(id=hit, **details[hit]))
        else:
            out.append({'cat': 'Installation', 'series': series_name, 't': t, 'y': y})
    for k, v in pool:                               # 목록에 없는 상세 항목도 빠뜨리지 않는다
        if k not in used:
            out.append(dict(id=k, **v)); print('목록에 없던 상세 항목 추가:', k, v['t'])
    return out

WORKS = []
WORKS += build_series(section('BLACK Silhouette'), 'bs-', 'BLACK SILHOUETTE')
WORKS += build_series(section('Sound Tree'), 'st-', 'SOUND TREE')

# 상세가 없는 시리즈 — 문서 맨 앞 목록
top = section('Installation')                        # 첫 번째 'Installation' 섹션
blocks = re.split(r'^1\.  \[', top, flags=re.M)
for b in blocks[1:]:
    name = b.split(']')[0].strip()
    rest = b.split(')', 1)[1] if ')' in b else b
    if name.startswith('BLACK') or name.startswith('SOUND'): continue
    if name.startswith('THE FLOWER'):
        m = re.search(r'^    1\.\s+(.*)$', rest, re.M)
        WORKS.append({'cat': 'Installation', 'series': 'THE FLOWER OF EVIL', 't': 'The Flower of Evil',
                      'y': '2003', 'note': unesc(m.group(1).strip())})
        continue
    series = {'RECONILED': 'RECONCILED'}.get(name, name)
    for t, y in list_items(rest):
        WORKS.append({'cat': 'Installation', 'series': series, 't': t, 'y': y})

arch = section('architectural')
for m in re.finditer(r'^\d+\.\s+(.*),\s*(\d{4})\s*$', arch, re.M):
    WORKS.append({'cat': 'Architectural', 'series': '', 't': unesc(m.group(1).strip()), 'y': m.group(2)})

# ── 출력 ──────────────────────────────────────────────
FIELDS = ['id', 'cat', 'series', 't', 'ko', 'y', 'made', 'size', 'type', 'place', 'event', 'credit', 'tags', 'note']
works_out, texts_out = [], {}
for w in WORKS:
    o = {k: w[k] for k in FIELDS if w.get(k)}
    if w.get('id'):
        o['img'] = []
        tx = {}
        if w.get('en'): tx['en'] = w['en']
        if w.get('ko_text'): tx['ko'] = w['ko_text']
        if w.get('quotes'): tx['quotes'] = w['quotes']
        if tx: texts_out[w['id']] = tx
    works_out.append(o)

hdr = '/* 「작품 정리」 문서에서 build_data.py 로 자동 생성. 직접 고치지 말고 문서를 고친 뒤 다시 생성할 것. */\n'
open(f'{OUT}/works.js', 'w', encoding='utf-8').write(
    hdr + 'var WORKS = ' + json.dumps(works_out, ensure_ascii=False, indent=1) + ';\n')
open(f'{OUT}/texts.js', 'w', encoding='utf-8').write(
    hdr + 'var TEXTS = ' + json.dumps(texts_out, ensure_ascii=False, indent=1) + ';\n')
print('작품', len(works_out), '/ 상세', sum(1 for w in works_out if w.get('id')), '/ 글이 있는 상세', len(texts_out))
