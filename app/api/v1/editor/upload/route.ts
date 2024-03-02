import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const body = await req.formData()
    const random_id = Math.random().toString(36).substring(2, 15)
    const file = body.get('image') as File
    const bucket = (body?.get('bucket') as string | undefined) || 'public_contents'
    const path = (body?.get('path') as string | undefined) || 'blog'
    console.log({ bucket, path })
    if (!file) {
      return new NextResponse('No file', { status: 400 })
    }
    // log the file and extension
    let filename = file.name.split('.').slice(0, -1).join('.')
    filename.replace(/[^a-zA-Z0-9]/g, '-') // replace all non-alphanumeric characters with a dash
    const extension = file.name.split('.').pop()
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${path}/${filename}-${random_id}.${extension}`, file, {
        upsert: false,
      })
    if (error) {
      console.log(error)
      return NextResponse.json({ success: 0, error: error.message })
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return NextResponse.json({ success: 1, file: { url: publicUrl } })
    // return the url
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: 0, error })
  }
}
