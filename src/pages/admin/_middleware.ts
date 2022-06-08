import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '../../lib/auth'
const BASE_URL = process.env.BASE_URL

export async function middleware(req: NextRequest) {

  const token = await verifyAuth(req)

  if(token != true){
    return NextResponse.rewrite(`${BASE_URL}/login`)
  }

  return NextResponse.next()
}






