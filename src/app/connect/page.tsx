import { Meteors } from "@/components/ui/meteors";
import ConnectLinks from "./connect-links";
import ContactForm from "./contact-form";

export default function Connect() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" w-full relative h-full">
      <div className="relative w-full shadow-xl h-full overflow-hidden grid md:grid-cols-2 gap-8">
        <ConnectLinks />
        <ContactForm />
        <Meteors number={20}/>
        </div>
        </div>
      </div>
  )
}
