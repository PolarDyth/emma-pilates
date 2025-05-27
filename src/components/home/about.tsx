import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function AboutHome() {
  return (
    <section id="about" className="py-16 md:py-24 mx-10 md:mx-0">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/emma/emma-black-white.jpeg"
                alt="Emma - Pilates Instructor"
                className="object-cover transform -translate-y-12"
                width={2131}
                height={2619}
              />
            </div>
          </div>
          <div>
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary tf">
                About Emma
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
                Certified Pilates Instructor with 10+ Years Experience
              </h2>
              <p className="text-lg text-muted-foreground">
                Hi, I&apos;m Emma! I&apos;ve been passionate about Pilates for
                over a decade, helping clients of all ages and abilities
                transform their bodies and minds through mindful movement.
              </p>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      Comprehensive Pilates certification from the renowned Body
                      Arts and Science International
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      Specialized training in rehabilitation and pre/post-natal
                      Pilates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      Dedicated to creating personalized programs that address
                      individual needs and goals
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-muted-foreground">
                My teaching style combines traditional Pilates principles with
                modern exercise science to deliver effective, enjoyable sessions
                that leave you feeling energized and balanced.
              </p>
            </div>

            <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <blockquote className="text-lg italic text-primary font-medium">
                &quot;Contrology (Pilates) is the complete coordination of body,
                mind, and spirit&quot;
              </blockquote>
              <cite className="text-sm text-muted-foreground mt-2 block">
                — Joseph Pilates
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
