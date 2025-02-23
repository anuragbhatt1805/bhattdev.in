import HeroSection from "@/components/custom/HeroSection";
import { Tabs } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";
// import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

function ExperienceCard({
  title,
  company,
  description,
  location,
  techstack,
}: {
  title: string;
  company: string;
  description: string[];
  location: string;
  techstack: string[];
}) {
  return (
    <>
      <div className="w-full dark:bg-neutral-800 bg-neutral-300 p-6 rounded-lg shadow-xl hover:transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-blue-600">{title}</h3>
          <p className="text-black dark:text-white  font-mono ">{location}</p>
        </div>
        <h4 className="text-lg dark:text-gray-300 text-gray-800 mb-3  font-sans italic">
          {company}
        </h4>
        <ul className="space-y-2 text-gray-300  font-mono">
          {description.map((desc, index) => (
            <li className="flex items-start gap-2" key={index}>
              <svg
                className="w-5 h-5 text-black dark:text-white mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-black dark:text-white">{desc}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {techstack.map((tech, index) => (
            <span
              key={index}
              className=" flex justify-center items-center bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function EducationCard({
  degree,
  school,
  description,
  location,
  skills,
}: {
  degree: string;
  school: string;
  description: string[];
  location: string;
  skills: string[];
}) {
  return (
    <>
      <div className="w-full dark:bg-neutral-800 bg-neutral-300 p-6 rounded-lg shadow-xl hover:transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-orange-600">{degree}</h3>
          <p className="text-black dark:text-white  font-mono ">{location}</p>
        </div>
        <h4 className="text-lg dark:text-gray-300 text-gray-800 mb-3  font-sans italic">
          {school}
        </h4>
        <ul className="space-y-2 text-gray-300  font-mono">
          {description.map((desc, index) => (
            <li className="flex items-start gap-2" key={index}>
              <svg
                className="w-5 h-5 text-black dark:text-white mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-black dark:text-white">{desc}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className=" flex justify-center items-center bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function SkillCard({
  name,
  icon,
  proficiency,
}: {
  name: string;
  icon?: string;
  proficiency?: number;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 dark:bg-gray-800/40 dark:hover:bg-gray-700/30">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 p-2 dark:bg-gray-600/30">
            <Image
              src={icon}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{name}</h3>
          {proficiency !== undefined && (
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden dark:bg-gray-700/40">
              <div
                className="h-full bg-white rounded-full dark:bg-gray-400"
                style={{ width: `${proficiency}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function SkillTab({
  title,
  skills,
}: {
  title: string;
  skills: {
    name: string;
    icon?: string;
    proficiency?: number;
  }[];
}) {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 dark:from-purple-800 dark:to-violet-900">
        <div className="flex flex-col h-auto absolute top-5 inset-x-0 w-[90%] rounded-xl mx-auto overflow-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white dark:text-gray-200">{title}</h2>
        
          <div className="text-4xl text-white">Hwllo World</div>
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              icon={skill.icon}
              proficiency={skill.proficiency}
            />
          ))}
        </div>
        </div>
    // </div>
  );
}


export default function Page() {
  const WhatIDo: { title: string; description: string }[] = [
    {
      title: "Full-Stack Development",
      description: "End-to-end web application development using MERN stack",
    },
    {
      title: "API Development",
      description: "RESTful API design and implementation",
    },
    {
      title: "Cloud Computing",
      description: "Cloud infrastructure setup and management",
    },
    {
      title: "DevOps",
      description: "Automated testing, deployment, and monitoring",
    },
    {
      title: "Database Design",
      description:
        "Efficient database architecture and optimization and data modeling",
    },
  ];

  const ExperienceData = [
    {
      title: "Software Developer",
      company: "Cumulation Technologies Pvt. Ltd.",
      startDate: "October 2024",
      endDate: "Present",
      description: [
        "Developed multiple web applications using MERN stack",
        "Implemented RESTful APIs for client-server communication",
        "Managed cloud infrastructure on AWS",
      ],
      location: "Bangalore, India",
      techstack: ["MongoDB", "React", "Express"],
    },
    {
      title: "Freelance Software Engineer",
      company: "Whiteboard Technologies Pvt. Ltd.",
      startDate: "April 2024",
      endDate: "September 2024",
      description: [
        "Built web applications using React and Node.js",
        "Developed RESTful APIs for client-server communication",
        "Managed cloud infrastructure on AWS",
      ],
      location: "Bangalore, India",
      techstack: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "ELab Web Administration",
      company: "ELab Technologies Pvt. Ltd.",
      startDate: "Feburary 2022",
      endDate: "December 2022",
      description: [
        "Managed web applications using React and Node.js",
        "Developed RESTful APIs for client-server communication",
        "Managed cloud infrastructure on AWS",
      ],
      location: "Bangalore, India",
      techstack: ["React", "Node.js", "Express", "MongoDB"],
    },
  ];

  const EducationData = [
    {
      degree: "Bachelor of Computer Science",
      school: "Visvesvaraya Technological University",
      startDate: "October 2020",
      endDate: "June 2024",
      description: [
        "Focused on developing cutting-edge software solutions",
        "Experienced in web development using HTML, CSS, and JavaScript",
        "Familiar with various programming languages like Python, Java, and C++",
      ],
      location: "Bengaluru, India",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    },
    {
      degree: "Higher Secondary School Certificate",
      school: "Tomar Children School",
      startDate: "April 2019",
      endDate: "May 2020",
      description: [
        "Acquired knowledge of various programming languages such as Python, Java, and C++",
        "Experienced in web development using HTML, CSS, and JavaScript",
        "Familiar with various technologies like React, Node.js, and MongoDB",
      ],
      location: "Varanasi, India",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    },
  ];

  const SkillData = [
    {
      title: "Frameworks",
      value: "Frameworks",
      skills: [
        { name: "React", icon: "/assets/react.svg", proficiency: 90 },
        { name: "Node.js", icon: "/assets/nodejs.svg", proficiency: 85 },
        // { name: "Express", icon: "/assets/express.svg", proficiency: 80 },
        { name: "MongoDB", icon: "/assets/mongodb.svg", proficiency: 80 },
      ],
    },
    {
      title: "Languages",
      value: "Languages",
      skills: [
        // { name: "HTML", icon: "/assets/html.svg", proficiency: 95 },
        // { name: "CSS", icon: "/assets/css.svg", proficiency: 90 },
        { name: "JavaScript", icon: "/assets/javascript.svg", proficiency: 90 },
        { name: "Python", icon: "/assets/python.svg", proficiency: 85 },
        { name: "Java", icon: "/assets/java.svg", proficiency: 75 },
        { name: "C++", icon: "/assets/c++.svg", proficiency: 70 },
      ],
    },
  ];
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-10 py-2 z-0 md:mb-4 mb-2">
        <div className="text-center mb-12 animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-bold mb-4 text-green-600">About Me</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate__animated animate__fadeInLeft">
            <div className="bg-white dark:bg-accent p-8 rounded-lg shadow-lg dark:shadow-zinc-600">
              <h3 className="text-2xl font-bold mb-4 text-green-600 ">
                Who I Am
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6  font-mono">
                I'm a passionate Full-Stack Developer with expertise in the MERN
                stack. With a keen eye for detail and a love for clean code, I
                specialize in building robust and scalable web applications that
                deliver exceptional user experiences.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-mono">
                My journey in web development started with a curiosity to create
                and has evolved into a professional career where I continuously
                learn and adapt to new technologies and best practices.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-accent p-6 rounded-lg shadow-lg dark:shadow-zinc-600">
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-6 h-6 text-green-600 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <h4 className="font-bold text-green-600  ">
                    Experience
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-mono">
                  1+ years of professional development experience
                </p>
              </div>

              <div className="bg-white dark:bg-accent p-6 rounded-lg shadow-lg dark:shadow-zinc-600">
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                  <h4 className="font-bold text-green-600 ">
                    Projects
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300  font-mono">
                  20+ projects completed successfully
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate__animated animate__fadeInRight">
            <div className="bg-white dark:bg-accent p-8 rounded-lg shadow-lg dark:shadow-zinc-600">
              <h3 className="text-2xl font-bold mb-4 text-green-600 ">
                What I Do
              </h3>
              <ul className="space-y-4">
                {WhatIDo.map(({ title, description }, index) => (
                  <li className="flex items-start gap-3" key={index}>
                    <svg
                      className="w-6 h-6 text-black dark:text-white mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <div>
                      <h4 className="font-bold mb-1  ">{title}</h4>
                      <p className="text-gray-600  font-mono">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-10 py-24 z-0 md:mb-4 mb-2 h-fit">
        <div className="text-center mb-12 animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-bold mb-4 text-blue-600">Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <Timeline
          data={ExperienceData.map((data) => {
            return {
              title: `${data.startDate} - ${data.endDate}`,
              content: (
                <ExperienceCard
                  title={data.title}
                  company={data.company}
                  description={data.description}
                  location={data.location}
                  techstack={data.techstack}
                />
              ),
            };
          })}
        />
      </div>
      <div className="container mx-auto px-10 pb-10 pt-0 z-0 md:mb-4 mb-2">
        <div className="text-center mb-12 animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-bold mb-4 text-orange-600">Education</h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
        </div>
        <Timeline
          data={EducationData.map((data) => {
            return {
              title: `${data.startDate} - ${data.endDate}`,
              content: (
                <EducationCard
                  degree={data.degree}
                  school={data.school}
                  description={data.description}
                  location={data.location}
                  skills={data.skills}
                />
              ),
            };
          })}
        />
      </div>
      <div className="container mx-auto px-10 pb-10 pt-0 z-0 md:mb-4 mb-2">
        <div className="text-center mb-12 animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-bold mb-4 text-purple-700">Skills</h2>
          <div className="w-20 h-1 bg-purple-700 mx-auto"></div>
        </div>
        <Tabs
          tabs={SkillData.map((data) => {
            return {
              title: data.title,
              value: data.value,
              content: (
                <SkillTab
                  title={data.title}
                  skills={data.skills}
                />
              ),
            };
          })}
        />
      </div>
    </div>
  );
}
