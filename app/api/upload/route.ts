import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const url = formData.get('url') as string;

    if (!file && !url) {
      return NextResponse.json({ error: 'Either file or URL is required' }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    let fileName: string;
    let buffer: Buffer;

    if (file) {
      // Handle file upload
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      fileName = `${timestamp}_${originalName}`;
    } else if (url) {
      // Handle URL download
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
        
        // Extract file extension from URL or content-type
        const contentType = response.headers.get('content-type');
        let extension = '';
        
        if (contentType?.includes('jpeg') || contentType?.includes('jpg')) {
          extension = '.jpg';
        } else if (contentType?.includes('png')) {
          extension = '.png';
        } else if (contentType?.includes('gif')) {
          extension = '.gif';
        } else if (contentType?.includes('webp')) {
          extension = '.webp';
        } else {
          // Try to get extension from URL
          const urlPath = new URL(url).pathname;
          const urlExtension = path.extname(urlPath);
          extension = urlExtension || '.jpg';
        }
        
        const timestamp = Date.now();
        fileName = `downloaded_${timestamp}${extension}`;
      } catch (error) {
        return NextResponse.json({ error: 'Failed to download image from URL' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Save file
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, new Uint8Array(buffer));

    // Return the public URL
    const publicUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: fileName 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}