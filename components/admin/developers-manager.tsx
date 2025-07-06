'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';
import { toast } from 'sonner';
import { Developer } from '@/lib/database';

export function DevelopersManager() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: '',
    picture: '',
    bio: '',
    socialLinks: {
      github: '',
      twitter: '',
      linkedin: '',
      portfolio: '',
      other: ''
    }
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await fetch('/api/developers');
      const data = await response.json();
      setDevelopers(data);
    } catch (error) {
      toast.error('Failed to fetch developers');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingDeveloper ? `/api/developers/${editingDeveloper.id}` : '/api/developers';
      const method = editingDeveloper ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingDeveloper ? 'Developer updated' : 'Developer created');
        setDialogOpen(false);
        setEditingDeveloper(null);
        resetForm();
        fetchDevelopers();
      } else {
        throw new Error('Failed to save developer');
      }
    } catch (error) {
      toast.error('Failed to save developer');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (developer: Developer) => {
    setEditingDeveloper(developer);
    setFormData({
      name: developer.name,
      position: developer.position,
      organization: developer.organization,
      picture: developer.picture,
      bio: developer.bio,
      socialLinks: {
        github: developer.socialLinks.github ?? '',
        twitter: developer.socialLinks.twitter ?? '',
        linkedin: developer.socialLinks.linkedin ?? '',
        portfolio: developer.socialLinks.portfolio ?? '',
        other: developer.socialLinks.other ?? ''
      }
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this developer?')) return;

    try {
      const response = await fetch(`/api/developers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Developer deleted');
        fetchDevelopers();
      } else {
        throw new Error('Failed to delete developer');
      }
    } catch (error) {
      toast.error('Failed to delete developer');
    }
  };

  const resetForm = () => {
    setEditingDeveloper(null);
    setFormData({
      name: '',
      position: '',
      organization: '',
      picture: '',
      bio: '',
      socialLinks: {
        github: '',
        twitter: '',
        linkedin: '',
        portfolio: '',
        other: ''
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Developers</CardTitle>
            <CardDescription>Manage your team members</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Developer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDeveloper ? 'Edit' : 'Add'} Developer</DialogTitle>
                <DialogDescription>
                  {editingDeveloper ? 'Update the' : 'Add a new'} team member
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FileUpload
                    label="Profile Picture"
                    accept="image/*"
                    currentValue={formData.picture}
                    onUpload={(url) => setFormData(prev => ({ ...prev, picture: url }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <Label>Social Links</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        type="url"
                        value={formData.socialLinks.github}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, github: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        type="url"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio</Label>
                      <Input
                        id="portfolio"
                        type="url"
                        value={formData.socialLinks.portfolio}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, portfolio: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
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
          {developers.map((developer) => (
            <div key={developer.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={developer.picture}
                  alt={developer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{developer.name}</h3>
                  <p className="text-sm text-muted-foreground">{developer.position}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(developer)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(developer.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {developers.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No developers found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}