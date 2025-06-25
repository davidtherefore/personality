import { type NextRequest, NextResponse } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { assessmentQuestions, sectionDescriptions, type AssessmentResult } from "@/lib/assessment-data"

export async function POST(req: NextRequest) {
  try {
    const result: AssessmentResult = await req.json()

    /* ----------  CREATE A NEW PDF  ---------- */
    const pdf = await PDFDocument.create()
    const page = pdf.addPage([595.28, 841.89]) // A4 portrait
    const { width } = page.getSize()

    /* ----------  FONTS  ---------- */
    const fontTitle = await pdf.embedFont(StandardFonts.HelveticaBold)
    const fontBody = await pdf.embedFont(StandardFonts.Helvetica)

    /* ----------  HEADER  ---------- */
    const title = "Professional Style Assessment Report"
    const titleSize = 20
    page.drawText(title, {
      x: (width - fontTitle.widthOfTextAtSize(title, titleSize)) / 2,
      y: 800,
      size: titleSize,
      font: fontTitle,
      color: rgb(0.12, 0.12, 0.12),
    })

    let cursorY = 770
    const lineGap = 18

    const writeLine = (text: string, opts?: { bold?: boolean }) => {
      const font = opts?.bold ? fontTitle : fontBody
      const size = opts?.bold ? 12 : 11
      page.drawText(text, { x: 60, y: cursorY, size, font })
      cursorY -= lineGap
    }

    /* ----------  BASIC INFO  ---------- */
    if (result.userName) writeLine(`Prepared for: ${result.userName}`)
    writeLine(`Completion date: ${new Date(result.completionDate).toLocaleDateString()}`)
    cursorY -= lineGap

    /* ----------  DOMINANT STYLE  ---------- */
    const dominantInfo = sectionDescriptions[result.dominantStyle as keyof typeof sectionDescriptions]
    writeLine("Dominant Style:", { bold: true })
    writeLine(`${dominantInfo.title} – ${dominantInfo.description}`)
    cursorY -= lineGap

    /* ----------  SECTION SCORES  ---------- */
    writeLine("Section Scores:", { bold: true })
    result.sectionScores.forEach((sec) => {
      const info = sectionDescriptions[sec.section as keyof typeof sectionDescriptions]
      writeLine(`• ${info.title}: ${sec.score}/75 (${sec.percentage}%)`)
    })
    cursorY -= lineGap

    /* ----------  RESPONSES (NEW PAGE)  ---------- */
    let respPage = pdf.addPage([595.28, 841.89])
    let y = 800
    const bodyFontSize = 9
    assessmentQuestions.forEach((q, idx) => {
      const response = result.responses.find((r) => r.questionId === q.id)?.score ?? "-"
      respPage.drawText(`${idx + 1}. ${q.text}`, {
        x: 40,
        y,
        size: bodyFontSize,
        font: fontBody,
      })
      respPage.drawText(`Response: ${response}`, {
        x: 500,
        y,
        size: bodyFontSize,
        font: fontBody,
      })
      y -= 14
      if (y < 40) {
        y = 800
        respPage.drawText("(continued)", { x: 260, y: 20, size: 8, font: fontBody })
        respPage = pdf.addPage([595.28, 841.89])
      }
    })

    /* ----------  FINALIZE  ---------- */
    const pdfBytes = await pdf.save()

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="assessment-report.pdf"`,
      },
    })
  } catch (e) {
    console.error("PDF generation failed:", e)
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 })
  }
}
