import { NextResponse } from "next/server"

const WIDGET_SCRIPT_URL = "https://linkssupport.vercel.app/supporthub-widget.js"

export function GET() {
  return NextResponse.redirect(WIDGET_SCRIPT_URL, 307)
}
