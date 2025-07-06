'use client';

import { useState } from 'react';
import { Upload, Link, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface FileUploadProps {
  label: string;
  accept?: string;
  currentValue?: string;
  onUpload: (url: string) => void;
}

export function FileUpload({ label, accept = "image/*", currentValue, onUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUpload(data.url);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlDownload = async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('url', urlInput);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const data = await response.json();
      onUpload(data.url);
      setUrlInput('');
      toast.success('Image downloaded and uploaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download and upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {currentValue && (
        <div className="mb-4">
          <img 
            src={currentValue} 
            alt="Current" 
            className="w-20 h-20 object-cover rounded border"
          />
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Current: {currentValue}
          </p>
        </div>
      )}

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="url">From URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
              disabled={uploading}
              className="flex-1"
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={uploading}
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleUrlDownload}
              disabled={uploading || !urlInput.trim()}
              size="sm"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Link className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}