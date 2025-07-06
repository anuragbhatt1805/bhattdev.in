'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { App } from '@/lib/database';

export default function Products() {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    fetch('/api/apps')
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Our <span className="text-primary">Products</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover our innovative software products designed to solve real business challenges and drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {apps.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {apps.map((app) => (
                <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] bg-muted">
                    <img
                      src={app.screenshots[0]}
                      alt={app.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                    <CardDescription>
                      {app.details}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {app.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>

                      <Button asChild>
                        <a href={app.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Try It Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-8 pb-8">
                  <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">New Products Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're developing innovative software products that will revolutionize how businesses operate. 
                    Stay tuned for exciting launches!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Have an idea for a product?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's collaborate to bring your vision to market
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="/contact">
                  Discuss Your Idea
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}