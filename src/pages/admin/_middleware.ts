import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '../../lib/auth'


export async function middleware(req: NextRequest) {

  const token = await verifyAuth(req)

  if(token != true){
    return NextResponse.rewrite(`${process.env.BASE_URL}/login`)
  }

  return NextResponse.next()
}






