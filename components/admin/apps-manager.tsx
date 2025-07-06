'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/ui/file-upload';
import { toast } from 'sonner';
import { App } from '@/lib/database';

export function AppsManager() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    techStack: '',
    screenshots: [] as string[],
    link: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetch('/api/apps');
      const data = await response.json();
      setApps(data);
    } catch (error) {
      toast.error('Failed to fetch apps');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        details: formData.details,
        techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
        screenshots: formData.screenshots,
        link: formData.link
      };

      const url = editingApp ? `/api/apps/${editingApp.id}` : '/api/apps';
      const method = editingApp ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingApp ? 'App updated' : 'App created');
        setDialogOpen(false);
        setEditingApp(null);
        resetForm();
        fetchApps();
      } else {
        throw new Error('Failed to save app');
      }
    } catch (error) {
      toast.error('Failed to save app');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (app: App) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      details: app.details,
      techStack: app.techStack.join(', '),
      screenshots: app.screenshots,
      link: app.link
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this app?')) return;

    try {
      const response = await fetch(`/api/apps/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('App deleted');
        fetchApps();
      } else {
        throw new Error('Failed to delete app');
      }
    } catch (error) {
      toast.error('Failed to delete app');
    }
  };

  const resetForm = () => {
    setEditingApp(null);
    setFormData({
      name: '',
      details: '',
      techStack: '',
      screenshots: [],
      link: ''
    });
  };

  const addScreenshot = (url: string) => {
    setFormData(prev => ({
      ...prev,
      screenshots: [...prev.screenshots, url]
    }));
  };

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Apps</CardTitle>
            <CardDescription>Manage your released applications</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add App
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingApp ? 'Edit' : 'Add'} App</DialogTitle>
                <DialogDescription>
                  {editingApp ? 'Update the' : 'Add a new'} released application
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">App Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">App Details</Label>
                  <Textarea
                    id="details"
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                  <Input
                    id="techStack"
                    value={formData.techStack}
                    onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Screenshots</Label>
                  <div className="space-y-4">
                    {formData.screenshots.map((screenshot, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <img 
                          src={screenshot} 
                          alt={`Screenshot ${index + 1}`} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="text-sm text-muted-foreground flex-1 truncate">
                          {screenshot}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeScreenshot(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <FileUpload
                      label="Add Screenshot"
                      accept="image/*"
                      onUpload={addScreenshot}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">App Link</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{app.name}</h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {app.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {app.techStack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{app.techStack.length - 3}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {app.details.length > 100 ? `${app.details.substring(0, 100)}...` : app.details}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(app)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(app.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {apps.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No apps found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}