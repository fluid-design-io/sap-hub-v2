import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url, path, ...others } = await req.json()
    console.log({ url, path, others })
    if (url) {
      // if the url is coming from the same domain, we can use the url directly
      const currentDomain = process.env.NEXT_PUBLIC_SITE_URL
      const urlDomain = new URL(url).hostname
      const uploadPath = path || 'blog'
      if (urlDomain === currentDomain) {
        return NextResponse.json({ success: 1, file: { url } })
      }
      const response = await fetch(url)
      if (!response.ok) {
        console.log(`An error has occured: ${response.status}`)
        return NextResponse.json({ success: 0, error: response.statusText })
      }
      const cookieStore = cookies()
      const supabase = createClient(cookieStore)
      const random_id = Math.random().toString(36).substring(2, 15)
      const buffer = await response.arrayBuffer()
      const contentType = response.headers.get('content-type')
      const extension = contentType ? contentType.split('/').pop() : 'jpg'
      const filename = `${random_id}.${extension}`

      // Directly use the buffer to upload the file
      const { data, error } = await supabase.storage.from(uploadPath).upload(filename, buffer, {
        contentType: contentType || 'image/jpeg',
        upsert: false,
      })
      if (error) {
        console.log(error)
        return NextResponse.json({ success: 0, error: error })
      }
      const {
        data: { publicUrl },
      } = await supabase.storage.from(uploadPath).getPublicUrl(data.path)
      console.log(publicUrl)
      return NextResponse.json({ success: 1, file: { url: publicUrl } })
      // return the url
    } else {
      return NextResponse.json({ success: 0, error: 'No image url' })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: 0, error })
  }
}
