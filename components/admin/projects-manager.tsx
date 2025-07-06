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
import { Project } from '@/lib/database';

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    link: '',
    screenshots: [] as string[],
    techStack: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        details: formData.details.split('\n').filter(detail => detail.trim() !== ''),
        link: formData.link,
        screenshots: formData.screenshots,
        techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
      };

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingProject ? 'Project updated' : 'Project created');
        setDialogOpen(false);
        setEditingProject(null);
        resetForm();
        fetchProjects();
      } else {
        throw new Error('Failed to save project');
      }
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      details: project.details.join('\n'),
      link: project.link || '',
      screenshots: project.screenshots,
      techStack: project.techStack.join(', ')
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Project deleted');
        fetchProjects();
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      details: '',
      link: '',
      screenshots: [],
      techStack: ''
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
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your completed projects</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit' : 'Add'} Project</DialogTitle>
                <DialogDescription>
                  {editingProject ? 'Update the' : 'Add a new'} project
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Project Details (one per line)</Label>
                  <Textarea
                    id="details"
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="Enter each detail on a new line..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Project Link (optional)</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://..."
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
                  <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                  <Input
                    id="techStack"
                    value={formData.techStack}
                    onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                    placeholder="React, Node.js, MongoDB"
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
          {projects.map((project) => (
            <div key={project.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{project.name}</h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.details[0]}
                  {project.details.length > 1 && '...'}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No projects found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}