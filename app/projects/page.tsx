'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Github, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/database';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Our <span className="text-primary">Projects</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explore our portfolio of successful projects that showcase our expertise and commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] bg-muted">
                    <img
                      src={project.screenshots[0]}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {project.details.map((detail, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {detail}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {project.link && (
                          <Button size="sm" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-3 w-3" />
                              View Live
                            </a>
                          </Button>
                        )}
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
                  <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">New Projects Are Still Under Process</h3>
                  <p className="text-muted-foreground">
                    We're currently working on some amazing projects that will showcase our capabilities. 
                    Check back soon to see our latest work!
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
              Ready to start your project?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's discuss how we can help bring your vision to life
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="/contact">
                  Get Started
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