'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Service } from '@/lib/database';

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    active: true
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const detailsArray = formData.details.split('\n').filter(detail => detail.trim() !== '');
      const payload = {
        name: formData.name,
        details: detailsArray,
        active: formData.active
      };

      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingService ? 'Service updated' : 'Service created');
        setDialogOpen(false);
        setEditingService(null);
        resetForm();
        fetchServices();
      } else {
        throw new Error('Failed to save service');
      }
    } catch (error) {
      toast.error('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      details: service.details.join('\n'),
      active: service.active
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Service deleted');
        fetchServices();
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      name: '',
      details: '',
      active: true
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Services</CardTitle>
            <CardDescription>Manage your service offerings</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit' : 'Add'} Service</DialogTitle>
                <DialogDescription>
                  {editingService ? 'Update the' : 'Add a new'} service offering
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Service Details (one per line)</Label>
                  <Textarea
                    id="details"
                    rows={6}
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="Enter each detail on a new line..."
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active">Active</Label>
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
          {services.map((service) => (
            <div key={service.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{service.name}</h3>
                  <Badge variant={service.active ? 'default' : 'secondary'}>
                    {service.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {service.details.slice(0, 3).map((detail, index) => (
                    <li key={index}>• {detail}</li>
                  ))}
                  {service.details.length > 3 && (
                    <li>... and {service.details.length - 3} more</li>
                  )}
                </ul>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No services found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}