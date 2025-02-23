import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, SquareStackIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const socialLinks = [
  {
    category: "Social Media",
    links: [
      { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/anurag-bhatt-846a241b8/" },
      { name: "Twitter", icon: Twitter, url: "https://twitter.com/anuragbhatt1805" },
      { name: "Instagram", icon: Instagram, url: "https://instagram.com/anuragbhatt1805" },
    ],
  },
  {
    category: "Developer",
    links: [
      { name: "GitHub", icon: Github, url: "https://github.com/anuragbhatt1805" },
      { name: "Stack Overflow", icon: SquareStackIcon, url: "https://stackoverflow.com/users/anuragbhatt1805" },
    ],
  },
  {
    category: "Contact",
    links: [
      { name: "Email", icon: Mail, url: "mailto:anuragbhatt1805@gmail.com" },
      { name: "Phone", icon: Phone, url: "tel:+918005231181" },
    ],
  },
]

export default function ConnectLinks() {
  return (
    <div className="space-y-6">
      {socialLinks.map((category) => (
        <Card key={category.category} className="w-full">
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-0 grid md:grid-cols-2 gap-x-8 gap-y-2">
              {category.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors space-y-1"
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

