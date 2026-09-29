import re, json, subprocess
c = open('doc.md', encoding='utf-8').read()
data = subprocess.run(['node','-e',"""
eval(require('fs').readFileSync('out/works.js','utf8')+require('fs').readFileSync('out/texts.js','utf8'));
process.stdout.write(JSON.stringify({W:WORKS,T:TEXTS}))"""],capture_output=True,text=True).stdout
d = json.loads(data)
def n(s):
    s = re.sub(r'\\([\\`*_{}\[\]()#+\-.!<>|~])', r'\1', s)
    s = s.replace('*', '')
    return re.sub(r'\s+', '', s)
heads=[(m.start(),m.group(1).strip()) for m in re.finditer(r'^# (.*)$',c,re.M)]
total_miss = 0
for i,(p,h) in enumerate(heads):
    m = re.match(r'(BLACK Silhouette|Sound Tree): ([a-z])$', h)
    if not m: continue
    pid = ('bs-' if m.group(1).startswith('BLACK') else 'st-') + m.group(2)
    w = [x for x in d['W'] if x.get('id')==pid][0]
    t = d['T'].get(pid, {})
    out = n(json.dumps(w, ensure_ascii=False) + t.get('en','') + t.get('ko','') +
            ''.join(q['by']+q['en']+q['ko'] for q in t.get('quotes',[])))
    body = c[p:heads[i+1][0] if i+1<len(heads) else len(c)]
    miss = []
    for line in body.split('\n'):
        L = re.sub(r'^\s*\d\.\s+', '', line).strip()
        if not L or L.startswith('# ') or L in ('없음','작품의 식별 정보','이 작품에 대한 코멘트 또는 인용구'): continue
        if n(L).lower() == n(w['series']).lower(): continue          # 시리즈 이름(대문자로 저장)
        if n(L).replace(':','') == n(w['t']+w.get('ko','')).replace(':',''): continue   # 작품명 = 원어 + 국문
        if n(L) and n(L) not in out: miss.append(L[:80])
    total_miss += len(miss)
    print(f'{pid}: 누락 {len(miss)}' + (''.join('\n     - '+x for x in miss[:8])))
print('총 누락 줄:', total_miss)
