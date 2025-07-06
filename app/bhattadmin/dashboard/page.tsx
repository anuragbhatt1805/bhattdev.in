'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Briefcase, 
  Code, 
  MessageSquare, 
  Settings, 
  LogOut,
  Link as LinkIcon,
  Smartphone,
  Menu,
  X,
  UserCog
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { SocialLinksManager } from '@/components/admin/social-links-manager';
import { DevelopersManager } from '@/components/admin/developers-manager';
import { ServicesManager } from '@/components/admin/services-manager';
import { ProjectsManager } from '@/components/admin/projects-manager';
import { AppsManager } from '@/components/admin/apps-manager';
import { ConnectionsManager } from '@/components/admin/connections-manager';
import { UsersManager } from '@/components/admin/users-manager';

const tabItems = [
  { value: 'users', label: 'Users', icon: UserCog },
  { value: 'social-links', label: 'Social Links', icon: LinkIcon },
  { value: 'developers', label: 'Developers', icon: Users },
  { value: 'services', label: 'Services', icon: Settings },
  { value: 'projects', label: 'Projects', icon: Briefcase },
  { value: 'apps', label: 'Apps', icon: Smartphone },
  { value: 'connections', label: 'Connections', icon: MessageSquare },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/bhattadmin');
    } catch (error) {
      toast.error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  const currentTab = tabItems.find(tab => tab.value === activeTab);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Bhatt Devs Admin</h1>
            
            {/* Mobile Tab Selector */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    {currentTab && <currentTab.icon className="mr-2 h-4 w-4" />}
                    {currentTab?.label}
                    <Menu className="ml-2 h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Admin Sections</SheetTitle>
                    <SheetDescription>
                      Select a section to manage
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {tabItems.map((tab) => (
                      <Button
                        key={tab.value}
                        variant={activeTab === tab.value ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleTabChange(tab.value)}
                      >
                        <tab.icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          {/* Desktop Tabs */}
          <TabsList className="hidden lg:grid w-full grid-cols-7">
            {tabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden xl:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mobile Tabs - Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {tabItems.map((tab) => (
                <Button
                  key={tab.value}
                  variant={activeTab === tab.value ? "default" : "outline"}
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => setActiveTab(tab.value)}
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="users">
            <UsersManager />
          </TabsContent>

          <TabsContent value="social-links">
            <SocialLinksManager />
          </TabsContent>

          <TabsContent value="developers">
            <DevelopersManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="apps">
            <AppsManager />
          </TabsContent>

          <TabsContent value="connections">
            <ConnectionsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}