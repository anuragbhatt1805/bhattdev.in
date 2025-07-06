'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Zap, Shield, Users, Code, Smartphone, Cloud, Settings, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Service } from '@/lib/database';

const serviceIcons = {
  'Full Stack Web Development': Code,
  'Mobile App Development': Smartphone,
  'Cloud Architecture & DevOps': Cloud,
  'Deployment & Infrastructure Management': Settings,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.filter((s: Service) => s.active)));
  }, []);

  const getServiceIcon = (serviceName: string) => {
    const IconComponent = serviceIcons[serviceName as keyof typeof serviceIcons] || Code;
    return <IconComponent className="h-6 w-6 text-primary" />;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive digital solutions tailored to help your business grow and succeed in the modern digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {services.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {getServiceIcon(service.name)}
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-8 pb-8">
                  <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">New Services Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're expanding our service offerings to better serve your needs. 
                    Exciting new solutions are in development!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Bhatt Devs?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're committed to delivering exceptional results for every project
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <Zap className="h-5 w-5 flex-none text-primary" />
                  Fast Delivery
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    We pride ourselves on delivering projects on time without compromising quality. Our agile development process ensures rapid iteration and deployment.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <Shield className="h-5 w-5 flex-none text-primary" />
                  Secure & Scalable
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Security is built into every application we develop. We follow industry best practices and implement robust security measures to protect your data.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <Users className="h-5 w-5 flex-none text-primary" />
                  Ongoing Support
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Our relationship doesn't end at deployment. We provide ongoing support, maintenance, and updates to ensure your application continues to perform optimally.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}