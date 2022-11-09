import { NextRequest, NextResponse } from "next/server"

const middlware = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/three_md"))
    return NextResponse.rewrite(new URL("/three", request.url))
}

export default middlware
