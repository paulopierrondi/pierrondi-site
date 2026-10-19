# Pierrondi — existing design system

AGE-4006: document existing app/globals.css tokens; no global token change. UI scope approved by Paulo on 2026-10-16: /apps static directory and three contextual links. Existing dark palette stays identical under light and dark OS preferences; no alternate theme introduced.

Colors: canvas --color-canvas #070605; surface --color-surface #100d0a; text --color-ink #f7f1e8; body --color-body #b8ada1; muted --color-muted #81766d (do not use for essential directory body); primary/focus --color-primary #f0a66b; on-primary #160b05; border --color-hairline rgba(245,207,159,.12); success#16c456; warning#f2c82e; error#ff4756.

Typography: --font-display Space Grotesk; --font-body Inter; --font-mono JetBrains Mono. Existing type scale72/56/44/32/24/18/17/14/12/11px. Directory body17px; categories17px; title32px mobile,44px from768px. Lineheight1.6body,1.1display.

Spacing: --space-xxs4;xs8;sm12;md16;lg24;xl32;xxl48;section96px. Radii xs4/sm6/2xl8/pill9999px. Existing shadow-product and shadow-glow-blue; directory uses neither.

Motion: fast180/normal320/slow560ms; existing semantic easings; directory has no animation and requires no motion override. Focus uses primary outline with --space-xxs offset. Rows minimum44px from existing display-md token. Breakpoint768px only for title/spacing.

Canonical components: public site navigation/footer layouts, PortfolioExperience (App Store links unchanged), EngageSection publicAnswerLinks, DesignVault heroActions. New static directory uses ordinary anchors, one h1, nav and list; no inputs/forms/async states/client boundary. Existing app profiles untouched.

Audit/approval evidence: outputs/pierrondi-seo-links-auditoria.md in task me-x20; user's explicit approval in chat. Capture before/after375/1280 both preferences, keyboard and320px/200% checks before release. Pricing/legal/brand claims/auth/analytics unchanged.
