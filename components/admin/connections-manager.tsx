'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Connection, Service } from '@/lib/database';

export function ConnectionsManager() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchConnections();
    fetchServices();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/connections');
      const data = await response.json();
      setConnections(data);
    } catch (error) {
      toast.error('Failed to fetch connections');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this connection?')) return;

    try {
      const response = await fetch(`/api/connections/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Connection deleted');
        fetchConnections();
      } else {
        throw new Error('Failed to delete connection');
      }
    } catch (error) {
      toast.error('Failed to delete connection');
    }
  };

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Unknown Service';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connections</CardTitle>
        <CardDescription>Manage contact form submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connections.map((connection) => (
            <div key={connection.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{connection.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {connection.email}
                    </div>
                    {connection.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {connection.phone}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(connection.createdAt)}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleDelete(connection.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{getServiceName(connection.serviceId)}</Badge>
                </div>
                <div>
                  <p className="font-medium text-sm">{connection.subject}</p>
                  <p className="text-sm text-muted-foreground mt-1">{connection.message}</p>
                </div>
              </div>
            </div>
          ))}
          {connections.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No connections found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}