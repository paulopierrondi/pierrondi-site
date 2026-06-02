#!/usr/bin/env python3
"""Build the Itaú AI governance architecture reference pack.

The environment for this project does not guarantee python-docx or LibreOffice,
so this script writes a minimal OOXML DOCX with stdlib zipfile and creates a
visual PDF/PNG pack with Pillow.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
import textwrap
from typing import Iterable
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "itau"
RENDER_DIR = ROOT / "test-results" / "itau-reference-pack-rendered"
DOCX_PATH = OUT_DIR / "itau-ai-governance-architecture-reference.docx"
PDF_PATH = OUT_DIR / "itau-ai-governance-architecture-reference.pdf"

ORANGE = "EC7000"
NAVY = "0A0F1C"
BLUE = "003B71"
GREEN = "1F9D55"
INK = "162033"
MUTED = "5B6473"
PAPER = "FFFFFF"


@dataclass(frozen=True)
class CsdmLayer:
    layer: str
    record: str
    decision: str
    owner: str


CSDM_LAYERS = [
    CsdmLayer(
        "Business Service / Offering",
        "serviço de negócio impactado",
        "explica consumo, valor, criticidade e linguagem executiva",
        "Business Owner",
    ),
    CsdmLayer(
        "Business Application / Digital Product",
        "produto ou aplicação consumidora",
        "conecta agente à jornada Itaú e ao benefício esperado",
        "Product Owner",
    ),
    CsdmLayer(
        "Service Instance",
        "cmdb_ci_service_auto",
        "ponto operacional para incident, change, health e suporte",
        "Service Owner",
    ),
    CsdmLayer(
        "AI Digital Asset",
        "alm_ai_system_digital_asset + cmdb_ai_system_product_model",
        "governa finalidade, risco, dados, modelo, prompt e ciclo de vida",
        "AI Governance",
    ),
    CsdmLayer(
        "AI CI",
        "cmdb_ci_function_ai ou cmdb_ci_appl_ai_application",
        "representa runtime somente quando há deployment visível",
        "Technical Owner",
    ),
    CsdmLayer(
        "AI Control Tower",
        "AI inventory · discovery · risk · runtime",
        "descobre, consolida, observa e aciona workflow de governança",
        "Governance + Ops",
    ),
]

PILOT_STEPS = [
    ("1", "Taxonomia", "Fechar critério de classe: SaaS/cloud/terceiro versus Itaú-managed."),
    ("2", "Intake mínimo", "Owner, support_group, risk_tier, dados, provider, autonomy e source_unique_id."),
    ("3", "Sandbox", "Cadastrar 3 a 5 agentes reais sem contaminar produção."),
    ("4", "CSDM", "Relacionar Business Application, Service Instance, AI Digital Asset e AI CI."),
    ("5", "AICT readiness", "Preparar Service Graph Connectors, IRE e chaves externas para discovery."),
    ("6", "Go/no-go", "Medir completude, duplicidade, risco, owner coverage e cobertura por serviço."),
]

SOURCE_NOTES = [
    "CMDB CI Class Models: cmdb_ci_function_ai e cmdb_ci_appl_ai_application dependem do tipo de deployment.",
    "AI Control Tower: AI inventory cobre AI systems, models, prompts, datasets e MCP servers.",
    "Enterprise AI discovery: Service Graph Connectors descobrem AI assets e enviam para CMDB/governança.",
    "Asset-CI Relationship: cmdb_rel_asset_ci conecta AI Digital Asset ao CI quando runtime existe.",
    "IRE: Identification and Reconciliation Engine evita duplicidade e governa fontes autoritativas.",
]


def xml_text(text: str) -> str:
    return escape(text, {"\n": " "})


def run(text: str, bold: bool = False, color: str | None = None, size: int | None = None) -> str:
    props: list[str] = []
    if bold:
        props.append("<w:b/>")
    if color:
        props.append(f'<w:color w:val="{color}"/>')
    if size:
        props.append(f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>')
    rpr = f"<w:rPr>{''.join(props)}</w:rPr>" if props else ""
    return f"<w:r>{rpr}<w:t xml:space=\"preserve\">{xml_text(text)}</w:t></w:r>"


def paragraph(
    text: str,
    style: str = "BodyText",
    *,
    bold: bool = False,
    color: str | None = None,
    size: int | None = None,
    before: int = 80,
    after: int = 120,
) -> str:
    return (
        "<w:p>"
        f"<w:pPr><w:pStyle w:val=\"{style}\"/><w:spacing w:before=\"{before}\" w:after=\"{after}\"/></w:pPr>"
        f"{run(text, bold=bold, color=color, size=size)}"
        "</w:p>"
    )


def page_break() -> str:
    return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'


def cell(content: Iterable[str], shading: str = "FFFFFF", width: int = 2400) -> str:
    return (
        "<w:tc>"
        f"<w:tcPr><w:tcW w:w=\"{width}\" w:type=\"dxa\"/>"
        f"<w:shd w:fill=\"{shading}\"/>"
        '<w:tcMar><w:top w:w="120" w:type="dxa"/><w:left w:w="120" w:type="dxa"/>'
        '<w:bottom w:w="120" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
        "</w:tcPr>"
        f"{''.join(content)}"
        "</w:tc>"
    )


def table(rows: list[list[str]], fills: list[str] | None = None) -> str:
    fills = fills or ["FFFFFF"] * len(rows[0])
    xml = [
        "<w:tbl>",
        '<w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders>'
        '<w:top w:val="single" w:sz="6" w:color="D8DEE8"/>'
        '<w:left w:val="single" w:sz="6" w:color="D8DEE8"/>'
        '<w:bottom w:val="single" w:sz="6" w:color="D8DEE8"/>'
        '<w:right w:val="single" w:sz="6" w:color="D8DEE8"/>'
        '<w:insideH w:val="single" w:sz="4" w:color="D8DEE8"/>'
        '<w:insideV w:val="single" w:sz="4" w:color="D8DEE8"/>'
        "</w:tblBorders></w:tblPr>",
    ]
    for row_index, row in enumerate(rows):
        xml.append("<w:tr>")
        for col_index, value in enumerate(row):
            fill = "F2F5F9" if row_index == 0 else fills[col_index % len(fills)]
            xml.append(
                cell(
                    [
                        paragraph(
                            value,
                            style="BodyText",
                            bold=row_index == 0,
                            color=INK if row_index == 0 else "283342",
                            size=20 if row_index == 0 else 19,
                            before=0,
                            after=0,
                        )
                    ],
                    shading=fill,
                    width=2200,
                )
            )
        xml.append("</w:tr>")
    xml.append("</w:tbl>")
    return "".join(xml)


def build_document_xml() -> str:
    csdm_rows = [["Camada", "Registro", "Decisão", "Owner"]] + [
        [item.layer, item.record, item.decision, item.owner] for item in CSDM_LAYERS
    ]
    pilot_rows = [["#", "Etapa", "Evidência esperada"]] + [
        [number, title, evidence] for number, title, evidence in PILOT_STEPS
    ]

    body: list[str] = []
    body.append(paragraph("Itaú AI Governance", style="Label", bold=True, color=ORANGE, size=22))
    body.append(
        paragraph(
            "ServiceNow CSDM Architecture Blueprint",
            style="Title",
            bold=True,
            color=NAVY,
            size=50,
            after=180,
        )
    )
    body.append(
        paragraph(
            "Reference Pack para alinhar Squad Gaia, Arquitetura, CMDB Owner e Governança: "
            "o problema não é escolher uma tabela, é desenhar onde cada agente vive, quem responde, "
            "qual serviço ele impacta e como AI Control Tower opera descoberta, risco e lifecycle.",
            size=24,
            after=220,
        )
    )
    body.append(
        table(
            [
                ["Tese executiva", "Architecture Blueprint, não cadastro de tabela."],
                ["Decisão", "Architecture Sprint com 3 a 5 agentes reais antes de carga em escala."],
                ["Guardrail", "Não tocar no Control Tower operacional; validar por diff, build, smoke e rota privada."],
            ],
            fills=["FFF1E6", "F1F7FF"],
        )
    )
    body.append(page_break())

    body.append(paragraph("1. Tese Executiva", style="Heading1", bold=True, color=NAVY, size=34))
    body.append(
        paragraph(
            "O Itaú não precisa apenas registrar agentes de IA. Precisa de um blueprint para "
            "governar ativo, runtime, serviço impactado, dados, ownership e mudança. Isso preserva "
            "CSDM, evita CMDB decorativa e prepara discovery enterprise via AI Control Tower.",
            size=22,
        )
    )
    body.append(
        table(
            [
                ["Camada", "Pergunta que responde"],
                ["Business / Product", "Por que o agente existe e qual valor/risco cria?"],
                ["Service Instance", "Onde o impacto operacional aparece?"],
                ["AI Digital Asset", "Quem governa finalidade, risco, dados, modelo e lifecycle?"],
                ["AI CI", "Qual deployment real roda e precisa de incidente/change?"],
                ["AI Control Tower", "Como descobrir, observar, revisar e acionar workflows?"],
            ],
            fills=["FFFFFF", "F8FAFC"],
        )
    )
    body.append(page_break())

    body.append(paragraph("2. ServiceNow CSDM Reference Diagram", style="Heading1", bold=True, color=NAVY, size=34))
    body.append(paragraph("Diagrama lógico para a conversa com o Itaú.", style="Heading2", bold=True, color=ORANGE, size=24))
    body.append(table(csdm_rows, fills=["F6FAFF", "FFF7ED", "F2FBF6", "F8FAFC"]))
    body.append(
        paragraph(
            "Regra central: primeiro governar o ativo de IA; depois criar CI somente quando há "
            "deployment visível; sempre relacionar ao Service Instance e manter source_unique_id para IRE/AICT.",
            bold=True,
            color=ORANGE,
            size=22,
        )
    )
    body.append(page_break())

    body.append(paragraph("3. Modelo de Dados Mínimo", style="Heading1", bold=True, color=NAVY, size=34))
    body.append(
        table(
            [
                ["Grupo", "Campos mínimos"],
                ["Accountability", "business_owner, technical_owner, support_group, data_steward, risk_owner"],
                ["Risco e dado", "risk_tier, data_classification, pii_handling, data_residency, decision_authority"],
                ["Runtime", "hosting_model, provider, environment, external_id, source_unique_id"],
                ["Governança", "review_cadence, kill_switch_owner, lifecycle, approval_state, evidence_url"],
                ["Relações", "cmdb_rel_asset_ci, Service Instance, Business Application, dependencies"],
            ],
            fills=["F6FAFF", "FFF7ED"],
        )
    )
    body.append(page_break())

    body.append(paragraph("4. Architecture Sprint", style="Heading1", bold=True, color=NAVY, size=34))
    body.append(table(pilot_rows, fills=["FFFFFF", "FFF7ED", "F6FAFF"]))
    body.append(
        paragraph(
            "Critério de go/no-go: cobertura de owner, risco, dados, service instance, source IDs, relação Asset-CI, "
            "prontidão para Service Graph Connectors/IRE e evidência de change/review.",
            bold=True,
            color=ORANGE,
            size=22,
        )
    )
    body.append(page_break())

    body.append(paragraph("5. Fontes e Guardrails", style="Heading1", bold=True, color=NAVY, size=34))
    for note in SOURCE_NOTES:
        body.append(paragraph(f"• {note}", size=21, before=40, after=80))
    body.append(
        paragraph(
            "Guardrail de produção: este pacote e a página Itaú não alteram app/control_tower, "
            "app/api/control-tower ou lib/control-tower. Release exige diff limpo, testes de guard, build, "
            "smoke de /control_tower e smoke público pós-deploy.",
            bold=True,
            color=NAVY,
            size=22,
        )
    )

    sect = (
        '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
        '<w:pgMar w:top="900" w:right="820" w:bottom="900" w:left="820" w:header="450" w:footer="450" w:gutter="0"/>'
        "</w:sectPr>"
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f"<w:body>{''.join(body)}{sect}</w:body></w:document>"
    )


def styles_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="BodyText">
    <w:name w:val="Body Text"/><w:qFormat/>
    <w:pPr><w:spacing w:line="300" w:lineRule="auto"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="21"/><w:color w:val="283342"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="50"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/><w:basedOn w:val="BodyText"/><w:next w:val="BodyText"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="34"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/><w:basedOn w:val="BodyText"/><w:next w:val="BodyText"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:sz w:val="24"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Label">
    <w:name w:val="Label"/><w:basedOn w:val="BodyText"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:caps/><w:sz w:val="20"/></w:rPr>
  </w:style>
</w:styles>"""


def write_docx() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>"""
    package_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>"""
    document_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""
    core = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:dcmitype="http://purl.org/dc/dcmitype/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Itaú AI Governance Architecture Reference</dc:title>
  <dc:creator>Paulo Pierrondi / ServiceNow architecture reference</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified>
</cp:coreProperties>"""
    app = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
  xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex OOXML Reference Builder</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
</Properties>"""

    with ZipFile(DOCX_PATH, "w", ZIP_DEFLATED) as docx:
        docx.writestr("[Content_Types].xml", content_types)
        docx.writestr("_rels/.rels", package_rels)
        docx.writestr("word/document.xml", build_document_xml())
        docx.writestr("word/_rels/document.xml.rels", document_rels)
        docx.writestr("word/styles.xml", styles_xml())
        docx.writestr("docProps/core.xml", core)
        docx.writestr("docProps/app.xml", app)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    width: int,
    line_gap: int = 10,
) -> int:
    x, y = xy
    avg_char = max(8, int(font.getlength("abcdefghijklmnopqrstuvwxyz") / 26))
    max_chars = max(24, width // avg_char)
    for paragraph_text in text.split("\n"):
        for line in textwrap.wrap(paragraph_text, width=max_chars):
            draw.text((x, y), line, font=font, fill=fill)
            y += font.size + line_gap if hasattr(font, "size") else 26
        y += line_gap
    return y


def draw_card(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    title: str,
    text: str,
    accent: tuple[int, int, int],
) -> None:
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=18, fill=(248, 250, 252), outline=(218, 226, 235), width=2)
    draw.rectangle((x1, y1, x1 + 9, y2), fill=accent)
    draw.text((x1 + 28, y1 + 22), title, font=load_font(32, bold=True), fill=(10, 15, 28))
    draw_wrapped(draw, text, (x1 + 28, y1 + 68), load_font(24), (45, 55, 72), x2 - x1 - 58, 7)


def new_page(title: str, kicker: str) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (1240, 1754), (255, 255, 255))
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 1240, 16), fill=(236, 112, 0))
    draw.text((72, 70), kicker.upper(), font=load_font(24, bold=True), fill=(236, 112, 0))
    draw_wrapped(draw, title, (72, 112), load_font(54, bold=True), (10, 15, 28), 1040, 12)
    return image, draw


def build_pdf_pages() -> list[Image.Image]:
    pages: list[Image.Image] = []

    page, draw = new_page("ServiceNow CSDM Architecture Blueprint", "Itaú AI Governance")
    draw_wrapped(
        draw,
        "Reference Pack para alinhar Squad Gaia, Arquitetura, CMDB Owner e Governança. "
        "O objetivo é sair da pergunta 'qual tabela?' para uma arquitetura auditável de agente, serviço, ativo, runtime e AI Control Tower.",
        (72, 285),
        load_font(31),
        (45, 55, 72),
        1040,
        10,
    )
    draw_card(
        draw,
        (72, 510, 1168, 720),
        "Tese",
        "Architecture Blueprint, não cadastro de tabela. Governar agente de IA exige valor, owner, risco, dados, service instance e runtime correlacionado.",
        (236, 112, 0),
    )
    draw_card(
        draw,
        (72, 760, 1168, 970),
        "Decisão",
        "Aprovar Architecture Sprint com 3 a 5 agentes reais: SaaS/cloud, Itaú-managed e um caso sem runtime visível.",
        (31, 157, 85),
    )
    draw_card(
        draw,
        (72, 1010, 1168, 1220),
        "Guardrail",
        "Página e artefatos não alteram Control Tower; release exige diff limpo, testes de guard, build e smoke público.",
        (0, 59, 113),
    )
    pages.append(page)

    page, draw = new_page("ServiceNow CSDM Reference Diagram", "Diagrama CSDM")
    y = 270
    colors = [(230, 242, 252), (255, 241, 230), (235, 248, 240), (246, 248, 252), (255, 248, 222), (242, 236, 255)]
    for index, layer in enumerate(CSDM_LAYERS):
        x1, x2 = 92, 1148
        draw.rounded_rectangle((x1, y, x2, y + 176), radius=16, fill=colors[index], outline=(204, 213, 224), width=2)
        draw.text((x1 + 28, y + 24), layer.layer, font=load_font(30, bold=True), fill=(10, 15, 28))
        draw.text((x1 + 28, y + 68), layer.record, font=load_font(23, bold=True), fill=(236, 112, 0))
        draw_wrapped(draw, layer.decision, (x1 + 28, y + 104), load_font(22), (45, 55, 72), 760, 6)
        draw.text((x2 - 220, y + 70), layer.owner, font=load_font(22, bold=True), fill=(0, 59, 113))
        if index < len(CSDM_LAYERS) - 1:
            draw.line((620, y + 176, 620, y + 205), fill=(236, 112, 0), width=5)
        y += 205
    pages.append(page)

    page, draw = new_page("Architecture Sprint", "Piloto governado")
    y = 300
    for number, title, evidence in PILOT_STEPS:
        draw.ellipse((80, y + 10, 144, y + 74), fill=(236, 112, 0))
        draw.text((101, y + 26), number, font=load_font(28, bold=True), fill=(255, 255, 255))
        draw.text((174, y), title, font=load_font(31, bold=True), fill=(10, 15, 28))
        draw_wrapped(draw, evidence, (174, y + 44), load_font(24), (45, 55, 72), 880, 8)
        y += 190
    pages.append(page)

    page, draw = new_page("Fontes ServiceNow e guardrails", "Validação")
    y = 285
    for note in SOURCE_NOTES:
        y = draw_wrapped(draw, f"• {note}", (90, y), load_font(25), (45, 55, 72), 980, 8) + 18
    draw_card(
        draw,
        (72, 1220, 1168, 1485),
        "Control Tower release guard",
        "Não alterar app/control_tower, app/api/control-tower ou lib/control-tower. Validar testes de guard, build, rota privada /control_tower e smoke de produção depois do deploy.",
        (236, 112, 0),
    )
    pages.append(page)

    return pages


def write_pdf_and_pngs() -> None:
    RENDER_DIR.mkdir(parents=True, exist_ok=True)
    pages = build_pdf_pages()
    pages[0].save(PDF_PATH, save_all=True, append_images=pages[1:], resolution=150)
    for index, page in enumerate(pages, start=1):
        page.save(RENDER_DIR / f"page-{index:02d}.png")


def main() -> None:
    write_docx()
    write_pdf_and_pngs()
    print(DOCX_PATH)
    print(PDF_PATH)
    print(RENDER_DIR)


if __name__ == "__main__":
    main()
