'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { SocialLink } from '@/lib/database';

export function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({ title: '', link: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('/api/social-links');
      const data = await response.json();
      setSocialLinks(data);
    } catch (error) {
      toast.error('Failed to fetch social links');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingLink ? `/api/social-links/${editingLink.id}` : '/api/social-links';
      const method = editingLink ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingLink ? 'Social link updated' : 'Social link created');
        setDialogOpen(false);
        setEditingLink(null);
        setFormData({ title: '', link: '' });
        fetchSocialLinks();
      } else {
        throw new Error('Failed to save social link');
      }
    } catch (error) {
      toast.error('Failed to save social link');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({ title: link.title, link: link.link });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;

    try {
      const response = await fetch(`/api/social-links/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Social link deleted');
        fetchSocialLinks();
      } else {
        throw new Error('Failed to delete social link');
      }
    } catch (error) {
      toast.error('Failed to delete social link');
    }
  };

  const resetForm = () => {
    setEditingLink(null);
    setFormData({ title: '', link: '' });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Manage your social media links</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLink ? 'Edit' : 'Add'} Social Link</DialogTitle>
                <DialogDescription>
                  {editingLink ? 'Update the' : 'Add a new'} social media link
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., LinkedIn"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
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
          {socialLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.link}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(link)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(link.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {socialLinks.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No social links found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}