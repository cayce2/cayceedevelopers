import { NextResponse } from "next/server"

const WIDGET_SCRIPT_URL = "https://linksdesk.net/supporthub-widget.js"

export function GET() {
  return NextResponse.redirect(WIDGET_SCRIPT_URL, 307)
}
