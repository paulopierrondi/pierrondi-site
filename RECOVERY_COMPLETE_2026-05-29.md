# pierrondi-site recovery COMPLETE (2026-05-29)

The original /Users/paulopierrondi/Projects/pierrondi-site repo was corrupted (concurrent coder
gc'd the shared object store). This CLEAN CLONE is the good copy.

## What this clone (branch `site-evolution`) contains
origin/main (4beeeab — incl. origin's recent "public whypaulo hire pitch" rework) + 4 commits:
- 358f8ec  P0 security/privacy + conversion/SEO (itau leak-mitigation reconciled onto origin's
           current itau; whypaulo fail-closed DROPPED — origin deliberately removed auth/made it public)
- ec0cb08  perf + content (lazy three.js, image priority, og cache/color, dead-file cleanup, feitos accents)
- ea9ea6e  kill dev-agency identity + revive blog
- 18685f0  whypaulo repositioned to lead with FSI/Brazil (+ WHYPAULO_PROOF_TODO.md for your numbers/PT-BR call)

`next build` = ✓ (159 pages). Patch: ~/pierrondi-site-full-evolution-2026-05-29.patch (4 commits, also /tmp).

## To make this your repo (pick one)
A) Push this branch to origin (cleanest; needs your OK): `git push origin site-evolution` → open PR / merge.
B) Heal the old repo: stop the concurrent coder, then in the OLD repo `git fetch origin` (or re-clone),
   `git am ~/pierrondi-site-full-evolution-2026-05-29.patch`.
C) Just adopt this clone dir as the working repo.

## Still needs you (in WHYPAULO_PROOF_TODO.md)
- 1 real anonymized proof number on /whypaulo (biggest credibility lift).
- PT-BR-primary full translation decision (kept English this pass for coherence).
- apex DNS for cantustudio.app (GoDaddy 301 → www) — App Review of CantuStudio 2.0.5.
