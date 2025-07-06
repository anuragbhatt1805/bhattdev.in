'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, ExternalLink, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Developer } from '@/lib/database';

export default function Team() {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    fetch('/api/developers')
      .then(res => res.json())
      .then(data => setDevelopers(data));
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Our <span className="text-primary">Team</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Meet the talented developers who make our success possible. Each team member brings unique skills and expertise to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {developers.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {developers.map((developer) => (
                <Card key={developer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-muted">
                    <img
                      src={developer.picture}
                      alt={developer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{developer.name}</CardTitle>
                    <CardDescription>
                      {developer.position} at {developer.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {developer.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(developer.socialLinks).map(([platform, url]) => (
                          url && (
                            <Button key={platform} variant="outline" size="sm" asChild>
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                {getSocialIcon(platform)}
                                <span className="ml-2 capitalize">{platform}</span>
                              </a>
                            </Button>
                          )
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-8 pb-8">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">Team Profiles Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're building an amazing team of talented developers and designers. 
                    Meet our team members soon!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}