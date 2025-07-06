"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, Github, Linkedin, Twitter } from "lucide-react";
import { SocialLink } from "@/lib/database";

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetch("/api/social-links")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSocialLinks(data);
        } else if (Array.isArray(data.data)) {
          // In case your API response is wrapped like { data: [...] }
          setSocialLinks(data.data);
        } else {
          console.error("Invalid data format:", data);
          setSocialLinks([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch social links:", err);
        setSocialLinks([]);
      });
  }, []);

  const getSocialIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("github")) return <Github className="h-4 w-4" />;
    if (lowerTitle.includes("linkedin"))
      return <Linkedin className="h-4 w-4" />;
    if (lowerTitle.includes("twitter")) return <Twitter className="h-4 w-4" />;
    return null;
  };

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {Array.isArray(socialLinks) &&
            socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">{link.title}</span>
                {getSocialIcon(link.title)}
              </a>
            ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-sm leading-5 text-muted-foreground">
              © {new Date().getFullYear()} Bhatt Devs. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
